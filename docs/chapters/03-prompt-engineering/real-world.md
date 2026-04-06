# 3.3 실전 프롬프트 설계

> **학습 목표**: 실제 업무에서 프롬프트를 설계하는 방법론을 익히고, 반복 가능한 프롬프트 템플릿을 만들 수 있다.

## 프롬프트 설계 프로세스

```
1. 목표 정의 → 2. 입출력 설계 → 3. 초안 작성 → 4. 테스트 → 5. 반복 개선
```

### 1단계: 목표 정의

무엇을 달성하고 싶은지 명확히 합니다:

```
✗ "코드를 분석해줘"
✓ "PR 코드 리뷰: 보안 취약점과 성능 이슈를 찾아 심각도별로 분류"
```

### 2단계: 입출력 설계

```
입력: 무엇을 제공할 것인가?
- 코드 diff
- 프로젝트 컨텍스트
- 기존 코딩 컨벤션

출력: 무엇을 받고 싶은가?
- 이슈 목록 (심각도, 줄 번호, 설명)
- 수정 제안 코드
- JSON 형식
```

## 실전 템플릿 모음

### 코드 리뷰 프롬프트

```xml
<role>
시니어 소프트웨어 엔지니어로서 코드 리뷰를 수행합니다.
</role>

<context>
프로젝트: {{프로젝트 설명}}
기술 스택: {{기술 스택}}
</context>

<task>
다음 코드 변경사항을 리뷰해주세요.
집중 영역: 보안, 성능, 가독성, 에러 처리
</task>

<code>
{{코드 diff}}
</code>

<output_format>
각 이슈를 다음 형식으로:
- [심각도: 높음/보통/낮음] 줄 N: 설명
  제안: 수정 방법
</output_format>
```

### 버그 분석 프롬프트

```xml
<task>
다음 에러 로그와 관련 코드를 분석하여 버그의 근본 원인을 찾아주세요.
</task>

<error_log>
{{에러 로그}}
</error_log>

<related_code>
{{관련 코드}}
</related_code>

<output_format>
1. 근본 원인 (한 줄)
2. 상세 분석
3. 수정 방법 (코드 포함)
4. 재발 방지 대책
</output_format>
```

### 문서 작성 프롬프트

```xml
<task>
다음 API 엔드포인트의 기술 문서를 작성해주세요.
</task>

<api_code>
{{API 코드}}
</api_code>

<requirements>
- 엔드포인트 URL, 메서드, 파라미터
- 요청/응답 예시 (JSON)
- 에러 코드와 설명
- 사용 시 주의사항
</requirements>
```

---

## 도메인별 실전 템플릿

### 글쓰기 도메인: 기술 문서 자동화

팀의 규칙을 시스템 프롬프트에 담아두면 일관된 문서를 생성할 수 있습니다.

```python
import anthropic

client = anthropic.Anthropic()

TECH_WRITING_SYSTEM = """당신은 개발자를 위한 기술 문서 작성 전문가입니다.

문서 작성 규칙:
1. 제목: 동사로 시작 (예: "사용자 인증하기", "데이터 내보내기")
2. 첫 문단: 이 문서가 무엇을 다루는지 한 문장으로
3. 전제 조건: 독자가 미리 알아야 할 것을 bullet로
4. 단계별 설명: 번호 목록, 각 단계는 동작 중심
5. 코드 예시: 반드시 실제 동작하는 예시 포함
6. 마지막: 다음 단계 링크 (플레이스홀더 가능)

톤: 친근하지만 정확함. 수동태 사용 금지."""

def generate_api_doc(endpoint_code: str, context: str = "") -> str:
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=2048,
        system=TECH_WRITING_SYSTEM,
        messages=[{
            "role": "user",
            "content": f"""다음 API 엔드포인트의 개발자 문서를 작성해주세요.

컨텍스트: {context}

코드:
```python
{endpoint_code}
```"""
        }]
    )
    return response.content[0].text
```

### 데이터 분석 도메인: 인사이트 추출

```xml
<role>
데이터 분석가로서 비즈니스 의사결정을 위한 인사이트를 도출합니다.
</role>

<data>
{{CSV 또는 JSON 데이터}}
</data>

<business_context>
- 업종: {{업종}}
- 분석 목적: {{목적 — 예: 이탈 원인 파악, 매출 예측}}
- 주요 KPI: {{KPI 목록}}
</business_context>

<task>
단계별로 분석하세요:
1. 데이터 품질 검토 (결측값, 이상치)
2. 핵심 지표 계산
3. 패턴 및 트렌드 발견
4. 비즈니스 인사이트 도출
5. 권고 사항 (구체적 행동 3가지)
</task>

<output_format>
각 섹션을 마크다운으로, 수치는 반드시 포함,
추측이 아닌 데이터 기반으로만 결론 도출
</output_format>
```

---

## CLAUDE.md — 프로젝트 레벨 프롬프트

Claude Code에서는 **CLAUDE.md** 파일이 프로젝트 전체에 적용되는 시스템 프롬프트 역할을 합니다:

```markdown
# CLAUDE.md

## 프로젝트 개요
이 프로젝트는 React + TypeScript 기반의 대시보드 앱입니다.

## 코딩 컨벤션
- 함수형 컴포넌트만 사용
- CSS-in-JS 대신 Tailwind CSS 사용
- 상태 관리는 Zustand 사용

## 테스트
- 단위 테스트: Vitest
- E2E 테스트: Playwright
- 테스트 실행: npm test

## 중요 규칙
- API 키를 코드에 포함하지 않을 것
- 모든 API 호출에 에러 처리 포함
```

이 파일이 있으면 Claude Code가 프로젝트의 맥락을 자동으로 이해합니다.

### 효과적인 CLAUDE.md 작성법

```markdown
# CLAUDE.md 모범 예시

## 이 프로젝트는
B2B SaaS 청구 시스템입니다. 결제 처리 오류는 즉각적인 비즈니스 영향을 미치므로
코드 변경 시 방어적 코딩과 철저한 에러 처리가 필수입니다.

## 절대 하지 말 것
- `force push` — 공유 브랜치를 망가뜨림
- 결제 관련 코드 수정 후 테스트 없이 커밋
- 환경변수 파일(.env)을 git에 포함

## 반드시 할 것
- 새 기능은 feature/xxx 브랜치에서 작업
- PR 전에 `npm run test:all` 실행
- 금액 계산은 항상 `Decimal` 타입 사용 (float 금지)

## 아키텍처 규칙
- 비즈니스 로직은 services/ 디렉토리에만
- DB 쿼리는 repositories/ 에만
- API 라우터에는 유효성 검사와 에러 처리만

## 자주 쓰는 명령어
- 개발 서버: npm run dev
- 테스트: npm run test:watch
- DB 마이그레이션: npm run db:migrate
```

::: tip CLAUDE.md 작성 팁
"하지 말 것"을 긍정형으로 바꾸기보다, **이유와 함께 금지 사항을 명시**하는 것이 Claude Code에게 더 효과적입니다. 왜 안 되는지 알면 유사한 상황에도 올바른 판단을 합니다.
:::

---

## 프롬프트 평가 (Evaluation)

프롬프트의 품질을 체계적으로 측정하는 방법:

```
1. 테스트 케이스 준비 (10~50개)
   - 다양한 입력 유형
   - 에지 케이스 포함
   - 기대 출력 정의

2. 프롬프트 실행 및 결과 수집

3. 평가 기준:
   - 정확도: 기대 출력과 일치하는가?
   - 일관성: 같은 입력에 비슷한 출력인가?
   - 형식 준수: 지정한 형식을 따르는가?
   - 엣지 케이스: 특이한 입력도 처리하는가?

4. 점수화 및 개선 반복
```

### 평가 자동화 예시

```python
import anthropic
import json

client = anthropic.Anthropic()

# 테스트 케이스 정의
test_cases = [
    {
        "input": "주문 ID 1234가 배송 중이에요, 언제 도착하나요?",
        "expected_category": "배송 문의",
        "expected_confidence": ["높음"]
    },
    {
        "input": "환불 받고 싶어요",
        "expected_category": "결제 문제",
        "expected_confidence": ["높음", "보통"]
    },
    {
        "input": "비밀번호를 잊었어요",
        "expected_category": "계정 관련",
        "expected_confidence": ["높음"]
    }
]

CLASSIFY_PROMPT = """고객 문의 이메일을 다음 중 하나로 분류하세요:
- 배송 문의
- 결제 문제
- 계정 관련
- 기술 지원
- 일반 문의

JSON 형식으로만 응답:
{"category": "카테고리명", "confidence": "높음/보통/낮음"}"""

def evaluate_prompt(test_cases: list) -> dict:
    correct = 0
    results = []
    
    for case in test_cases:
        response = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=256,
            system=CLASSIFY_PROMPT,
            messages=[{"role": "user", "content": case["input"]}]
        )
        
        try:
            result = json.loads(response.content[0].text)
            is_correct = (
                result["category"] == case["expected_category"] and
                result["confidence"] in case["expected_confidence"]
            )
            if is_correct:
                correct += 1
            results.append({
                "input": case["input"],
                "expected": case["expected_category"],
                "got": result["category"],
                "correct": is_correct
            })
        except json.JSONDecodeError:
            results.append({"input": case["input"], "correct": False, "error": "JSON 파싱 실패"})
    
    return {
        "accuracy": correct / len(test_cases),
        "details": results
    }

eval_result = evaluate_prompt(test_cases)
print(f"정확도: {eval_result['accuracy']:.1%}")
```

---

## 프롬프트 버전 관리

팀에서 프롬프트를 관리하는 방법:

```python
# prompts/v1/email_classifier.py
PROMPT_VERSION = "1.2.0"
PROMPT_DESCRIPTION = "이메일 분류기 — 5개 카테고리, JSON 출력"
PROMPT_CHANGED = "2026-03-15"

SYSTEM_PROMPT = """..."""

# 변경 이력
CHANGELOG = """
v1.2.0 (2026-03-15): 신뢰도 필드 추가
v1.1.0 (2026-02-20): '일반 문의' 카테고리 추가
v1.0.0 (2026-01-10): 초기 버전
"""
```

::: warning 프롬프트는 코드다
프롬프트도 소스 코드처럼 버전 관리가 필요합니다. 특히 팀이 공유하는 프롬프트는:
- Git으로 관리 (변경 이력 추적)
- 변경 시 평가(evaluation) 재실행
- 프로덕션 프롬프트는 별도 승인 프로세스
:::

---

## 실전 패턴: 반복 개선 루프

처음부터 완벽한 프롬프트는 없습니다. 반복 개선이 핵심입니다.

```
초안 작성
    ↓
5개 테스트 케이스 실행
    ↓
실패 케이스 분석
    ↓
┌─ 모호한 지시? → 구체적 예시 추가
├─ 형식이 안 맞음? → 출력 형식 예시 강화  
├─ 에지 케이스 실패? → Few-shot으로 해당 케이스 추가
└─ 일관성 없음? → 더 엄격한 규칙 명시
    ↓
30개 테스트 케이스로 재평가
    ↓
목표 정확도 달성 → 프로덕션 배포
```

---

## 🧪 실습

**실습 1: 코드 리뷰 템플릿 커스터마이징**

위의 코드 리뷰 템플릿을 다음 조건에 맞게 수정해보세요:
- 팀의 기술 스택: Node.js + TypeScript
- 추가 검토 항목: 타입 안전성, async/await 오류 처리
- 출력 형식: 마크다운 체크리스트 형태

**실습 2: CLAUDE.md 작성**

자신이 현재 작업 중인 프로젝트(또는 가상의 프로젝트)를 위한 CLAUDE.md를 작성해보세요. 다음 섹션을 포함하세요:
- 프로젝트 개요 (2~3문장)
- 절대 하지 말 것 (이유 포함)
- 코딩 컨벤션 핵심 3가지
- 자주 쓰는 명령어

**실습 3: 프롬프트 평가 설계**

다음 태스크를 위한 프롬프트와 평가 테스트 케이스 5개를 설계해보세요:

태스크: "한국어 코드 주석을 영어로 번역하되, 기술 용어는 유지"

::: details 힌트
테스트 케이스에 포함할 유형:
- 일반 주석 (`# 사용자 목록 반환`)
- 기술 용어 포함 (`# API 토큰으로 인증`)
- 복잡한 설명 (여러 줄)
- 모호한 주석 (`# 처리`)
- 코드가 섞인 주석
:::

---

## 핵심 정리

- 프롬프트 설계는 **반복적 과정** — 한 번에 완벽할 필요 없음
- **템플릿화**하면 재사용 가능하고 품질이 안정됨
- **CLAUDE.md**는 프로젝트 레벨의 상시 프롬프트
- **평가**를 통해 프롬프트 품질을 객관적으로 측정
- **버전 관리**: 프롬프트도 코드처럼 변경 이력을 관리

---

::: info 핵심 용어 정리

**프롬프트 템플릿**: 변수(플레이스홀더)를 포함한 재사용 가능한 프롬프트 구조. `{{변수명}}` 형식으로 런타임에 실제 값으로 교체된다.

**CLAUDE.md**: Claude Code가 프로젝트 시작 시 자동으로 읽는 설정 파일. 프로젝트 레벨의 시스템 프롬프트 역할. `.claude/` 디렉토리나 프로젝트 루트에 위치.

**프롬프트 평가 (Evaluation)**: 정의된 테스트 케이스로 프롬프트의 정확도, 일관성, 형식 준수를 측정하는 과정. "evals"라고도 불림.

**골든 데이터셋 (Golden Dataset)**: 프롬프트 평가에 사용하는 정답이 정의된 테스트 케이스 모음. 프롬프트 변경 시 회귀 테스트에 활용.

**프롬프트 버전 관리**: 프롬프트의 변경 이력을 코드처럼 추적하는 방법. 어떤 버전이 어떤 성능을 냈는지 비교 가능.

**지시 따르기 (Instruction Following)**: AI가 프롬프트의 모든 요구사항을 얼마나 정확히 따르는지를 나타내는 지표.
:::

## 더 알아보기

- [Anthropic Courses - Real World Prompting](https://github.com/anthropics/courses)
- [Anthropic Courses - Prompt Evaluations](https://github.com/anthropics/courses)
- [Anthropic Docs - CLAUDE.md](https://docs.anthropic.com/en/docs/claude-code/memory)

---

← [3.2 고급 프롬프트 기법](/chapters/03-prompt-engineering/advanced-techniques) | **다음 챕터**: [4.1 에이전트란 무엇인가](/chapters/04-ai-agents/) →
