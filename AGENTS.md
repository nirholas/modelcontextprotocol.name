# AGENTS.md

Operating notes for AI coding agents (Claude Code, Codex, Cursor, Copilot and others) working in this repository. Everything here is derived from the files actually in the tree, so trust it over guesses, and update it when the facts change.

## What this repository is

Give AI agents access to money 💰1,100+ MCP tools - swap, bridge, stake, lend, trade, and deploy across most blockchains. The open MCP gateway where AI meets DeFi. Trade crypto, swap across DEXs, bridge chains, stake tokens, lend, track whales, read market news, analyze smart contracts, pay other agents autonomously via x402.

- Homepage: https://modelcontextprotocol.name
- Source: https://github.com/nirholas/modelcontextprotocol.name
- Primary language: TypeScript
- License: Other (see the LICENSE file)

## Repository layout

- `docs/`
- `sperax-facilitator/`
- `x402-facilitator/`
- `README.md`
- `LICENSE`

## Setup

No package manifest is checked in. Follow the installation steps in `README.md`.

## Commands

No build, test or lint scripts are declared in the tree. Verify changes by running the project as `README.md` describes.

## Conventions

- Commit messages follow Conventional Commits (`type(scope): summary`), matching the existing history.
- Read the surrounding code before adding to it, and match its naming, file organisation and error-handling style.
- Keep `README.md` accurate: if a change alters behaviour, commands or configuration, update the docs in the same commit.
- Do not leave TODO comments, stub functions, placeholder data or commented-out code behind. Finish what you start or leave it out.
- Small, focused commits with a subject line that describes the change, not the act of committing.

## Where to raise things

- Bugs and feature requests: https://github.com/nirholas/modelcontextprotocol.name/issues
- Questions and ideas: https://github.com/nirholas/modelcontextprotocol.name/discussions
- Security issues: report privately at https://github.com/nirholas/modelcontextprotocol.name/security/advisories/new, never in a public issue.
