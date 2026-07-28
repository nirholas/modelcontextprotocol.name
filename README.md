# modelcontextprotocol.name

Content for the `modelcontextprotocol.name` domain — MCP-related payment facilitator listings and source.

## Contents

- [`sperax-facilitator/`](sperax-facilitator/) — registry metadata and documentation for the Sperax x402 payment facilitator (`https://x402.sperax.io`), which lets MCP servers accept gasless USDC/USDs micropayments via the x402 protocol.
- [`x402-facilitator/`](x402-facilitator/) — TypeScript source for the x402 facilitator service (verify/settle EIP-3009 and EIP-2612 payments on Base, Arbitrum, and Ethereum). See its [README](x402-facilitator/README.md) for setup and usage; it is MIT-licensed (see its own LICENSE).

## License

Root repository content: all rights reserved — see [LICENSE](LICENSE). The `x402-facilitator/` subdirectory carries its own MIT license.
