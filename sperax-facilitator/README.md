# Sperax x402 Facilitator

x402 payment facilitator by [SperaxOS](https://sperax.io) — enables MCP servers to accept gasless micropayments via the x402 protocol.

## Facilitator Endpoint

```
https://x402.sperax.io
```

## How It Works with MCP

MCP servers can gate tool access behind x402 payments. When an agent calls a paid tool:

1. Server returns `402 Payment Required` with payment requirements
2. Agent signs an EIP-712 authorization (EIP-3009 for USDC, EIP-2612 for USDs)
3. Agent sends payment to the Sperax facilitator for verification and settlement
4. Server grants access after confirmed settlement

## Supported Networks

- **Base** (chain ID: 8453)
- **Base Sepolia** (chain ID: 84532)
- **Arbitrum One** (chain ID: 42161)
- **Ethereum** (chain ID: 1)

## Supported Assets

| Token | Chain | Settlement Scheme |
|-------|-------|-------------------|
| **USDC** | Base, Base Sepolia, Arbitrum, Ethereum | EIP-3009 `transferWithAuthorization` |
| **USDs** | Arbitrum | EIP-2612 `permit` + `transferFrom` |

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/verify` | Verify a payment payload |
| POST | `/settle` | Verify and settle on-chain |
| GET | `/supported` | List supported payment kinds |
| GET | `/health` | Health check |
| GET | `/info` | Facilitator info |
| GET | `/balances` | Wallet ETH + USDC balances per chain |
| GET | `/metrics` | Counters and latency stats |
| GET | `/fees` | Gas prices and estimated settlement costs |
| GET | `/status/:txHash` | Look up settlement tx |
| GET | `/.well-known/x402` | Protocol discovery |

## Source Code

Full implementation: [github.com/Sperax/x402-facilitator](https://github.com/Sperax/x402-facilitator)

## About SperaxOS

SperaxOS is an AI Agent Workspace where agents can autonomously pay for premium APIs and trade with other agents using x402 micropayments.

- Website: [sperax.io](https://sperax.io)
- App: [chat.sperax.io](https://chat.sperax.io)
