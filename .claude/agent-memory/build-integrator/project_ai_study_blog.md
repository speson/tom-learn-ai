---
name: AI Study Blog — Project Context
description: VitePress-based Korean AI study blog with chapters on prompt engineering, AI agents, Tool Use, and MCP. Content enrichment pattern established.
type: project
---

VitePress Korean AI study blog located at `/Users/sonhyowon/Workspace/ai-study/docs/chapters/`.

**Why:** Educational resource for Korean developers learning AI/LLM development with Claude.

**How to apply:** When editing chapters, preserve all Mermaid diagrams and existing content, add new sections using VitePress admonition blocks (`::: tip`, `::: info`, `::: warning`, `::: details`), include `🧪 실습` sections with hands-on exercises, and end each chapter with a `::: info 핵심 용어 정리` glossary block. Navigation links at the bottom of each file must be preserved.

Chapter structure:
- `02-llm-deep-dive/` — index.md (트랜스포머), tokenization.md, attention.md, training-inference.md
- `03-prompt-engineering/` — index.md, advanced-techniques.md, real-world.md
- `04-ai-agents/` — index.md, architecture.md, multi-agent.md
- `05-tool-use-mcp/` — index.md, mcp-basics.md, building-mcp-server.md

Chapter 02 enrichment completed 2026-04-06:
- attention.md: full numerical worked example of attention calculation added (2D toy example with Q/K/V matrices, softmax, weighted sum)
- tokenization.md: language comparison section added (Korean/English/code token efficiency), unexpected tokenization examples, BPE step-by-step walkthrough
- training-inference.md: RLHF deep-dive added (reward hacking, PPO), Constitutional AI two-stage process (SL-CAI and RL-CAI) with comparison table, Temperature math explained
