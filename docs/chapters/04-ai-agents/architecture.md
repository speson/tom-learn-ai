# 4.2 에이전트 아키텍처

> **학습 목표**: 다양한 에이전트 아키텍처 패턴을 이해하고, 상황에 맞는 패턴을 선택할 수 있다.
>
> **참고**: [Anthropic - Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)

## 워크플로우 vs 에이전트

Anthropic은 에이전틱 시스템을 두 가지로 구분합니다:

```
워크플로우 (Workflows):              에이전트 (Agents):
사전 정의된 코드 경로               모델이 자율적으로 경로 결정

if 조건A:                          while not done:
    LLM.do(작업1)                      action = LLM.decide()
elif 조건B:                            result = execute(action)
    LLM.do(작업2)                      done = LLM.evaluate(result)

예측 가능, 일관성 높음               유연하지만 예측 어려움
```

## 워크플로우 패턴들

### 1. 프롬프트 체이닝 (Prompt Chaining)

```mermaid
flowchart LR
    IN["입력"] --> L1["LLM 1: 분석"] --> G{"검증 게이트"}
    G -- "통과" --> L2["LLM 2: 생성"] --> OUT["출력"]
    G -- "실패" --> L1
```

**사용 사례**: 코드 생성 후 리뷰, 문서 작성 후 검수

```
예시: 블로그 포스트 작성

[1단계: 개요 작성]
  → "AI 에이전트 소개 글의 개요를 작성해주세요"
  → 개요 생성

[게이트: 개요 품질 확인]
  → 통과

[2단계: 본문 작성]
  → "이 개요를 바탕으로 본문을 작성해주세요"
  → 본문 생성
```

### 2. 라우팅 (Routing)

```mermaid
flowchart LR
    IN["입력"] --> R["분류기"]
    R --> EA["전문가 A: 코딩 질문"]
    R --> EB["전문가 B: 일반 질문"]
    R --> EC["전문가 C: 수학 질문"]
```

**사용 사례**: 고객 문의 분류, 멀티 도메인 처리

### 3. 병렬화 (Parallelization)

```mermaid
flowchart LR
    subgraph sectioning["분할 (Sectioning)"]
        SI["입력"] --> SS1["LLM: 보안 검토"]
        SI --> SS2["LLM: 성능 검토"]
        SI --> SS3["LLM: 가독성 검토"]
        SS1 --> SM["합산"]
        SS2 --> SM
        SS3 --> SM
    end

    subgraph voting["투표 (Voting)"]
        VI["입력"] --> VL1["LLM 1: 평가"]
        VI --> VL2["LLM 2: 평가"]
        VI --> VL3["LLM 3: 평가"]
        VL1 --> VM["다수결"]
        VL2 --> VM
        VL3 --> VM
    end
```

**사용 사례**: 코드 리뷰(여러 관점), 콘텐츠 검수

### 4. 오케스트레이터-워커 (Orchestrator-Workers)

```mermaid
flowchart TD
    O["오케스트레이터 LLM<br/>작업을 분할하고 위임"]
    W1["워커 1<br/>파일A 수정"]
    W2["워커 2<br/>파일B 수정"]
    W3["워커 3<br/>테스트 추가"]
    R["결과 합산 및 검증"]

    O --> W1
    O --> W2
    O --> W3
    W1 --> R
    W2 --> R
    W3 --> R
```

**사용 사례**: 대규모 리팩토링, 멀티파일 작업

### 5. 평가자-최적화 루프 (Evaluator-Optimizer)

```mermaid
flowchart LR
    G["생성기 LLM"] --> OUT["출력"]
    OUT --> E["평가기 LLM"]
    E -- "피드백 / 개선 요청<br/>(품질 기준 충족까지 반복)" --> G
```

**사용 사례**: 코드 품질 향상, 번역 정교화

## 자율 에이전트 패턴

워크플로우보다 자유도가 높은 패턴:

```mermaid
flowchart TD
    START(["목표 입력"])
    OB["1. 환경 관찰"]
    TH["2. 사고\n어떤 도구? 어떤 순서? 다음 단계?"]
    EX["3. 도구 선택 및 실행"]
    IN["4. 결과 해석"]
    RP["5. 계획 수정 (필요시)"]
    CHK{"목표 달성?"}
    END(["완료"])

    START --> OB --> TH --> EX --> IN --> RP --> CHK
    CHK -- "아니오" --> OB
    CHK -- "예" --> END
```

## 어떤 패턴을 선택할 것인가?

Anthropic의 권고:

> **가장 단순한 솔루션부터 시작하고, 필요할 때만 복잡성을 추가하라.**

```
복잡도 낮음 ──────────────────────────────── 복잡도 높음

단일 LLM  →  프롬프트   →  라우팅/  →  오케스트레이터  →  자율
  호출       체이닝      병렬화      -워커           에이전트

"대부분의 문제는 왼쪽 패턴으로 충분하다"
```

| 상황 | 권장 패턴 |
|------|----------|
| 작업이 명확하고 단순 | 단일 LLM 호출 |
| 단계별 처리 필요 | 프롬프트 체이닝 |
| 여러 전문 영역 | 라우팅 |
| 독립적 하위 작업 | 병렬화 |
| 복잡한 동적 작업 | 오케스트레이터-워커 |
| 열린 문제 해결 | 자율 에이전트 |

## 핵심 정리

- **워크플로우**: 사전 정의된 경로, 예측 가능하고 일관적
- **자율 에이전트**: 모델이 경로를 결정, 유연하지만 예측 어려움
- **단순함 우선**: 가장 간단한 패턴부터 시작
- **체이닝, 라우팅, 병렬화**: 가장 흔하게 사용되는 기본 패턴
- **오케스트레이터-워커**: 대규모 작업에 적합

## 더 알아보기

- [Anthropic - Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic Academy - Introduction to Subagents](https://anthropic.skilljar.com/)

---

← [4.1 에이전트란 무엇인가](/chapters/04-ai-agents/) | **다음 챕터**: [4.3 멀티 에이전트 시스템](/chapters/04-ai-agents/multi-agent) →
