import type { PaymentRequirements, X402Payment } from '../types/index.js';

/**
 * Check that a payment is bound to the merchant's payment requirements:
 * same chain, same asset, paid to the merchant, and at least the required amount.
 * Returns a rejection reason, or null when the payment satisfies the requirements.
 */
export function checkRequirements(
  payment: X402Payment,
  requirements: PaymentRequirements,
  nowSec: number = Math.floor(Date.now() / 1000),
): string | null {
  if (payment.chainId !== requirements.chainId) return 'Chain ID mismatch';
  if (payment.token.toLowerCase() !== requirements.asset.toLowerCase()) return 'Asset mismatch';
  if (payment.authorization.to.toLowerCase() !== requirements.payTo.toLowerCase()) {
    return 'Recipient mismatch';
  }
  if (payment.authorization.value < requirements.maxAmountRequired) {
    return 'Insufficient payment amount';
  }
  if (requirements.expiry != null && requirements.expiry <= nowSec) {
    return 'Payment requirement expired';
  }
  return null;
}
