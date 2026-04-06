# 5.1 Tool Use 개념

> **학습 목표**: AI의 Tool Use(도구 사용)가 무엇인지 이해하고, 작동 원리를 설명할 수 있다.
>
> **참고**: [Anthropic - Tool Use Guide](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview)

## Tool Use란?

LLM 자체는 텍스트를 생성할 수만 있습니다. 파일을 읽거나, 계산을 하거나, API를 호출하는 것은 불가능합니다. **Tool Use**는 LLM에게 외부 도구를 사용할 수 있는 능력을 부여합니다.

```
Tool Use 없이:                    Tool Use와 함께:
"오늘 날씨 알려줘"               "오늘 날씨 알려줘"
   ↓                               ↓
"제가 실시간 정보에              [날씨 API 도구 호출]
 접근할 수 없어서                   ↓
 알려드리기 어렵습니다"           "서울 현재 기온 18°C,
                                  맑음입니다"
```

## Tool Use 작동 방식

```
┌────────────────────────────────────────────┐
│                Tool Use 흐름                │
│                                            │
│  1. 사용자: "서울 날씨 알려줘"               │
│                    ↓                       │
│  2. LLM: 사용 가능한 도구 목록 확인           │
│     - get_weather(city)                    │
│     - search_web(query)                    │
│     - calculate(expression)                │
│                    ↓                       │
│  3. LLM: "get_weather 도구를 사용해야겠다"    │
│     → {"tool": "get_weather",              │
│        "input": {"city": "서울"}}           │
│                    ↓                       │
│  4. 시스템: 도구 실행                        │
│     → {"temperature": 18, "condition": "맑음"}│
│                    ↓                       │
│  5. LLM: 결과를 자연어로 변환                │
│     → "서울의 현재 기온은 18°C이며 맑습니다"   │
└────────────────────────────────────────────┘
```

### 핵심 포인트

LLM은 도구를 **직접 실행하지 않습니다**. LLM은:
1. 어떤 도구를 사용할지 **결정**
2. 도구에 전달할 **파라미터를 생성**
3. 시스템이 실행한 **결과를 해석**

실제 도구 실행은 호스트 시스템(클라이언트)이 담당합니다.

## 도구 정의하기

도구는 JSON Schema로 정의됩니다:

```json
{
  "name": "get_weather",
  "description": "지정된 도시의 현재 날씨를 조회합니다",
  "input_schema": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "날씨를 조회할 도시 이름"
      },
      "unit": {
        "type": "string",
        "enum": ["celsius", "fahrenheit"],
        "description": "온도 단위"
      }
    },
    "required": ["city"]
  }
}
```

좋은 도구 정의의 요소:
- **명확한 이름**: 도구의 기능을 나타내는 이름
- **상세한 설명**: LLM이 언제 이 도구를 사용해야 하는지 판단할 근거
- **스키마**: 입력 파라미터의 타입과 제약 조건

## Tool Use의 실전 예시

### 계산기 도구

```
사용자: "2의 32승은?"

LLM 사고: "계산이 필요하므로 calculator 도구를 사용하자"
도구 호출: calculator(expression="2**32")
도구 결과: 4294967296
LLM 응답: "2의 32승은 4,294,967,296입니다."
```

### 데이터베이스 조회 도구

```
사용자: "지난달 매출 상위 5개 제품은?"

LLM 사고: "DB 조회가 필요하다"
도구 호출: query_db(sql="SELECT product, SUM(amount) 
           FROM sales WHERE month='2026-03' 
           GROUP BY product ORDER BY SUM(amount) DESC LIMIT 5")
도구 결과: [{product: "A", total: 5000}, ...]
LLM 응답: "지난달 매출 상위 5개 제품은: 1. 제품A..."
```

### 도구 연쇄 사용

하나의 질문에 여러 도구를 순차적으로 사용하기도 합니다:

```
사용자: "서울 날씨에 맞는 옷차림 추천해줘"

1단계: get_weather(city="서울")
       → 기온 8°C, 바람 강함

2단계: search_fashion(temperature=8, wind="strong")
       → 패딩, 목도리 추천

LLM: "서울은 현재 8°C에 바람이 강합니다. 
      따뜻한 패딩과 목도리를 추천드립니다."
```

## Claude Code에서의 Tool Use

Claude Code는 다양한 내장 도구를 갖춘 에이전트입니다:

| 도구 | 기능 | 예시 |
|------|------|------|
| Read | 파일 읽기 | 소스 코드 분석 |
| Write | 파일 생성 | 새 파일 작성 |
| Edit | 파일 수정 | 코드 수정 |
| Bash | 명령 실행 | npm test, git status |
| Grep | 텍스트 검색 | 코드 내 패턴 검색 |
| Glob | 파일 검색 | 파일명 패턴 매칭 |
| WebSearch | 웹 검색 | 문서, 라이브러리 검색 |

## 핵심 정리

- **Tool Use**: LLM에게 외부 도구를 사용하는 능력 부여
- **LLM의 역할**: 도구 선택과 파라미터 생성 (실행은 시스템이 담당)
- **JSON Schema**: 도구의 이름, 설명, 입력 스키마를 정의
- **도구 연쇄**: 여러 도구를 순차/병렬로 조합하여 복잡한 작업 수행
- **Claude Code**: 다양한 내장 도구를 활용하는 코딩 에이전트

## 더 알아보기

- [Anthropic - Tool Use Guide](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview)
- [Anthropic Courses - Tool Use](https://github.com/anthropics/courses)

---

**다음 챕터**: [5.2 MCP 기초](/chapters/05-tool-use-mcp/mcp-basics) →
