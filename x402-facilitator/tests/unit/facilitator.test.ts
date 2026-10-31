import { describe, it, expect, vi } from 'vitest';

vi.mock('../../src/config/env.js', () => ({
  env: {
    FACILITATOR_PRIVATE_KEY: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    BASE_RPC_URL: 'https://base.example.com',
    BASE_SEPOLIA_RPC_URL: 'https://base-sepolia.example.com',
    ARBITRUM_RPC_URL: 'https://arb.example.com',
    ARBITRUM_SEPOLIA_RPC_URL: 'https://arb-sepolia.example.com',
    ETHEREUM_RPC_URL: 'https://eth.example.com',
    PORT: 3402,
    HOST: '0.0.0.0',
    RATE_LIMIT_MAX: 100,
    RATE_LIMIT_WINDOW_MS: 60_000,
    CORS_ORIGINS: '*',
    LOG_LEVEL: 'error',
  },
}));

vi.mock('../../src/utils/logger.js', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('../../src/utils/metrics.js', () => ({
  metrics: {
    verifyRequests: { inc: vi.fn() },
    verifyLatency: { observe: vi.fn() },
    verifyErrors: { inc: vi.fn() },
    settleSuccess: { inc: vi.fn() },
    settleFailed: { inc: vi.fn() },
    settleRejected: { inc: vi.fn() },
    settleLatency: { observe: vi.fn() },
  },
}));

const mockVerifyPayment = vi.fn();
vi.mock('../../src/core/verifier.js', () => ({
  verifyPayment: (...args: unknown[]) => mockVerifyPayment(...args),
}));

const PAYEE = '0x2222222222222222222222222222222222222222';
const TOKEN = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

const payment = {
  chainId: 8453,
  token: TOKEN,
  authorization: {
    from: '0x1111111111111111111111111111111111111111',
    to: PAYEE,
    value: 1000n,
    validAfter: 0n,
    validBefore: 9999999999n,
    nonce: '0x' + '00'.repeat(32),
  },
  signature: '0x' + '11'.repeat(65),
} as never;

const requirements = { chainId: 8453, asset: TOKEN, payTo: PAYEE, maxAmountRequired: 1000n } as never;

async function makeFacilitator() {
  const { Facilitator } = await import('../../src/core/facilitator.js');
  return new Facilitator({
    privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    chains: [{ chainId: 8453, rpcUrl: 'https://base.example.com' }],
  } as never);
}

describe('Facilitator requirement binding', () => {
  it('accepts a payment that matches the requirements', async () => {
    mockVerifyPayment.mockResolvedValue({ valid: true, signer: payment.authorization.from });
    const f = await makeFacilitator();
    expect((await f.verify(payment, requirements)).isValid).toBe(true);
  });

  it.each([
    ['recipient', { payTo: '0x3333333333333333333333333333333333333333' }],
    ['asset', { asset: '0x4444444444444444444444444444444444444444' }],
    ['chain', { chainId: 1 }],
    ['amount', { maxAmountRequired: 1001n }],
    ['requirement expiry', { expiry: 1 }],
  ])('rejects a payment whose %s does not match the requirements', async (_n, override) => {
    mockVerifyPayment.mockResolvedValue({ valid: true, signer: payment.authorization.from });
    const f = await makeFacilitator();
    const res = await f.verify(payment, { ...(requirements as object), ...override } as never);
    expect(res.isValid).toBe(false);
  });

  it('does not settle on-chain when the requirements do not match', async () => {
    mockVerifyPayment.mockResolvedValue({ valid: true, signer: payment.authorization.from });
    const f = await makeFacilitator();
    const res = await f.settle(payment, { ...(requirements as object), payTo: '0x3333333333333333333333333333333333333333' } as never);
    expect(res.success).toBe(false);
    expect(res.errorReason).toContain('Recipient mismatch');
  });
});

describe('Facilitator', () => {
  it('should export Facilitator class', async () => {
    const mod = await import('../../src/core/facilitator.js');
    expect(mod.Facilitator).toBeDefined();
    expect(typeof mod.Facilitator).toBe('function');
  });
});
