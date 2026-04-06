# 6.1 Anthropic API 시작하기

> **학습 목표**: Anthropic API의 기본 사용법을 익히고, 첫 번째 API 호출을 성공적으로 수행한다.
>
> **참고**: [Anthropic API Documentation](https://docs.anthropic.com/)

::: tip 준비물
- Anthropic Console 계정 ([console.anthropic.com](https://console.anthropic.com))
- API 키
- Python 3.8+ 또는 Node.js 18+
:::

## API 키 발급

```
1. console.anthropic.com 접속
2. API Keys 메뉴
3. "Create Key" 클릭
4. 키 이름 설정 후 생성
5. 키를 안전한 곳에 저장 (다시 볼 수 없음!)
```

```bash
# 환경변수로 설정 (권장)
export ANTHROPIC_API_KEY="sk-ant-..."
```

## 첫 번째 API 호출

### Python

```bash
pip install anthropic
```

```python
import anthropic

client = anthropic.Anthropic()  # ANTHROPIC_API_KEY 환경변수 자동 사용

message = client.messages.create(
    model="claude-sonnet-4-6-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "안녕하세요! 자기소개 해주세요."}
    ]
)

print(message.content[0].text)
```

### TypeScript/JavaScript

```bash
npm install @anthropic-ai/sdk
```

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic(); // ANTHROPIC_API_KEY 환경변수 자동 사용

const message = await client.messages.create({
  model: 'claude-sonnet-4-6-20250514',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: '안녕하세요! 자기소개 해주세요.' }
  ],
});

console.log(message.content[0].text);
```

## Messages API 구조

```
요청:
{
  "model": "claude-sonnet-4-6-20250514",     ← 사용할 모델
  "max_tokens": 1024,                        ← 최대 응답 토큰 수
  "system": "당신은 친절한 AI입니다.",          ← 시스템 프롬프트 (선택)
  "messages": [                              ← 대화 내역
    {"role": "user", "content": "안녕!"},
    {"role": "assistant", "content": "안녕하세요!"},
    {"role": "user", "content": "오늘 뭐 할까?"}
  ]
}

응답:
{
  "id": "msg_...",
  "type": "message",
  "role": "assistant",
  "content": [
    {"type": "text", "text": "오늘은 이런 것들을 해보면..."}
  ],
  "model": "claude-sonnet-4-6-20250514",
  "usage": {
    "input_tokens": 42,                      ← 입력 토큰 수
    "output_tokens": 128                     ← 출력 토큰 수
  },
  "stop_reason": "end_turn"                  ← 종료 이유
}
```

## 주요 파라미터

| 파라미터 | 설명 | 기본값 |
|---------|------|-------|
| `model` | 사용할 모델 ID | (필수) |
| `max_tokens` | 최대 응답 토큰 수 | (필수) |
| `messages` | 대화 메시지 배열 | (필수) |
| `system` | 시스템 프롬프트 | (선택) |
| `temperature` | 창의성 조절 (0~1) | 1.0 |
| `top_p` | 토큰 샘플링 범위 | - |
| `stop_sequences` | 생성 중단 문자열 | - |

## 사용 가능한 모델

| 모델 | 특징 | 용도 |
|------|------|------|
| `claude-opus-4-6` | 최고 성능, 복잡한 추론 | 어려운 분석, 코딩 |
| `claude-sonnet-4-6` | 성능-속도 균형 | 범용, 가장 인기 |
| `claude-haiku-4-5` | 빠르고 저렴 | 간단한 작업, 분류 |

## 요금 체계

```
요금 = 입력 토큰 비용 + 출력 토큰 비용

예시 (Claude Sonnet):
  입력: $3 / 1M 토큰
  출력: $15 / 1M 토큰

1000번 호출 (각 500 입력 + 200 출력 토큰):
  입력: 500K 토큰 × $3/1M = $1.50
  출력: 200K 토큰 × $15/1M = $3.00
  총: $4.50
```

::: tip 비용 절감 팁
- 프롬프트 캐싱으로 반복 입력 비용 절감
- 간단한 작업에는 Haiku 사용
- `max_tokens`을 적절히 설정
:::

## 핵심 정리

- **API 키**: Console에서 발급, 환경변수로 관리
- **Messages API**: 모든 Claude 상호작용의 기본 인터페이스
- **모델 선택**: 작업 복잡도에 맞는 모델 사용
- **토큰 기반 과금**: 입력/출력 토큰 수에 따라 요금 결정

## 더 알아보기

- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Anthropic Courses - API Fundamentals](https://github.com/anthropics/courses)
- [Anthropic Console](https://console.anthropic.com/)

---

**다음 챕터**: [6.2 대화형 앱 만들기](/chapters/06-api-development/chat-app) →
