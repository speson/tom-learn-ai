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

## 핵심 정리

- 프롬프트 설계는 **반복적 과정** — 한 번에 완벽할 필요 없음
- **템플릿화**하면 재사용 가능하고 품질이 안정됨
- **CLAUDE.md**는 프로젝트 레벨의 상시 프롬프트
- **평가**를 통해 프롬프트 품질을 객관적으로 측정

## 더 알아보기

- [Anthropic Courses - Real World Prompting](https://github.com/anthropics/courses)
- [Anthropic Courses - Prompt Evaluations](https://github.com/anthropics/courses)
- [Anthropic Docs - CLAUDE.md](https://docs.anthropic.com/en/docs/claude-code/memory)

---

← [3.2 고급 프롬프트 기법](/chapters/03-prompt-engineering/advanced-techniques) | **다음 챕터**: [4.1 에이전트란 무엇인가](/chapters/04-ai-agents/) →
