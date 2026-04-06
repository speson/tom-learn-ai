# 커리큘럼

AI의 기초 개념부터 코드 기반 AI 에이전트 개발까지, 단계별로 학습하는 커리큘럼입니다.

> **학습 방식**: 매일 1~2개의 챕터를 읽고, 포함된 예제와 그림을 통해 개념을 익힙니다.

## 학습 로드맵

```
AI 기초 → LLM 이해 → 프롬프트 → 에이전트 → Tool Use/MCP → API 개발 → 실전
```

---

## Part 1. AI 기초

AI가 무엇인지, 기계가 어떻게 "학습"하는지 핵심 원리를 이해합니다.

| 챕터 | 주제 | 핵심 질문 |
|------|------|-----------|
| [1.1](/chapters/01-ai-basics/) | AI, ML, DL이란? | AI와 머신러닝, 딥러닝은 어떤 관계인가? |
| [1.2](/chapters/01-ai-basics/neural-networks) | 신경망의 기초 | 인공 신경망은 어떻게 생겼고, 왜 작동하는가? |
| [1.3](/chapters/01-ai-basics/how-learning-works) | 학습의 원리 | 기계가 데이터로부터 어떻게 패턴을 배우는가? |

**참고 자료**:
- [Anthropic - AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/)
- [3Blue1Brown - Neural Networks](https://www.3blue1brown.com/topics/neural-networks)

---

## Part 2. LLM 딥다이브

ChatGPT, Claude 같은 대규모 언어 모델이 어떻게 작동하는지 그 내부를 들여다봅니다.

| 챕터 | 주제 | 핵심 질문 |
|------|------|-----------|
| [2.1](/chapters/02-llm-deep-dive/) | 트랜스포머 아키텍처 | 현대 AI의 근간인 트랜스포머는 어떤 구조인가? |
| [2.2](/chapters/02-llm-deep-dive/tokenization) | 토큰화와 임베딩 | AI는 텍스트를 어떻게 숫자로 변환하는가? |
| [2.3](/chapters/02-llm-deep-dive/attention) | 어텐션 메커니즘 | "Attention is All You Need"가 의미하는 것은? |
| [2.4](/chapters/02-llm-deep-dive/training-inference) | LLM의 학습과 추론 | 수십억 파라미터는 어떻게 학습되고, 답변을 생성하는가? |

**참고 자료**:
- [Attention Is All You Need (2017)](https://arxiv.org/abs/1706.03762) — 트랜스포머 원본 논문
- [Anthropic Research](https://www.anthropic.com/research) — Claude 관련 기술 연구

---

## Part 3. 프롬프트 엔지니어링

AI와 효과적으로 소통하는 기술을 배웁니다. Anthropic 공식 프롬프트 엔지니어링 가이드 기반.

| 챕터 | 주제 | 핵심 질문 |
|------|------|-----------|
| [3.1](/chapters/03-prompt-engineering/) | 프롬프트 기초 | 좋은 프롬프트와 나쁜 프롬프트의 차이는? |
| [3.2](/chapters/03-prompt-engineering/advanced-techniques) | 고급 프롬프트 기법 | Chain-of-Thought, Few-shot 등 고급 기법은? |
| [3.3](/chapters/03-prompt-engineering/real-world) | 실전 프롬프트 설계 | 실제 업무에서 프롬프트를 어떻게 설계하는가? |

**참고 자료**:
- [Anthropic - Prompt Engineering Interactive Tutorial](https://github.com/anthropics/courses)
- [Anthropic Docs - Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

---

## Part 4. AI 에이전트

스스로 사고하고 행동하는 AI 에이전트의 세계로 들어갑니다.

| 챕터 | 주제 | 핵심 질문 |
|------|------|-----------|
| [4.1](/chapters/04-ai-agents/) | 에이전트란 무엇인가 | 챗봇과 에이전트의 차이는 무엇인가? |
| [4.2](/chapters/04-ai-agents/architecture) | 에이전트 아키텍처 | 에이전트는 어떤 구조로 설계되는가? |
| [4.3](/chapters/04-ai-agents/multi-agent) | 멀티 에이전트 시스템 | 여러 에이전트가 협력하는 시스템은 어떻게 동작하는가? |

**참고 자료**:
- [Anthropic - Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic Academy - Introduction to Agent Skills](https://anthropic.skilljar.com/)

---

## Part 5. Tool Use & MCP

AI가 외부 세계와 상호작용하는 방법 — Tool Use와 Model Context Protocol을 학습합니다.

| 챕터 | 주제 | 핵심 질문 |
|------|------|-----------|
| [5.1](/chapters/05-tool-use-mcp/) | Tool Use 개념 | AI가 도구를 사용한다는 것은 무엇을 의미하는가? |
| [5.2](/chapters/05-tool-use-mcp/mcp-basics) | MCP 기초 | Model Context Protocol은 무엇이고 왜 필요한가? |
| [5.3](/chapters/05-tool-use-mcp/building-mcp-server) | MCP 서버 만들기 | 직접 MCP 서버를 구축하는 방법은? |

**참고 자료**:
- [Anthropic - Tool Use Guide](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Anthropic Academy - Introduction to MCP](https://anthropic.skilljar.com/)

---

## Part 6. API 개발

Anthropic API를 활용하여 실제 AI 애플리케이션을 만들어 봅니다.

| 챕터 | 주제 | 핵심 질문 |
|------|------|-----------|
| [6.1](/chapters/06-api-development/) | Anthropic API 시작하기 | API 키 발급부터 첫 번째 호출까지 |
| [6.2](/chapters/06-api-development/chat-app) | 대화형 앱 만들기 | 멀티턴 대화 앱은 어떻게 구현하는가? |
| [6.3](/chapters/06-api-development/streaming) | 스트리밍과 고급 기능 | 실시간 응답, 비전, 캐싱 등 고급 기능 활용 |

**참고 자료**:
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Anthropic Courses - API Fundamentals](https://github.com/anthropics/courses)

---

## Part 7. 실전 프로젝트

배운 모든 것을 종합하여 실제 프로젝트를 설계하고 구축합니다.

| 챕터 | 주제 | 핵심 질문 |
|------|------|-----------|
| [7.1](/chapters/07-advanced-projects/) | 프로젝트 설계 | AI 프로젝트는 어떻게 기획하고 설계하는가? |
| [7.2](/chapters/07-advanced-projects/building-ai-app) | AI 기반 앱 구축 | 에이전트 + Tool Use + API를 결합한 앱 만들기 |
