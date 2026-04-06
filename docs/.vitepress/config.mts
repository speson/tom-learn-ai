import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'AI Study',
    description: 'AI 기초부터 에이전트 개발까지 — 코드 기반 AI 학습 블로그',
    lang: 'ko-KR',
    lastUpdated: true,

    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ],

    themeConfig: {
      nav: [
        { text: '홈', link: '/' },
        { text: '커리큘럼', link: '/curriculum' },
        {
          text: '챕터',
          items: [
            { text: '1. AI 기초', link: '/chapters/01-ai-basics/' },
            { text: '2. LLM 딥다이브', link: '/chapters/02-llm-deep-dive/' },
            { text: '3. 프롬프트 엔지니어링', link: '/chapters/03-prompt-engineering/' },
            { text: '4. AI 에이전트', link: '/chapters/04-ai-agents/' },
            { text: '5. Tool Use & MCP', link: '/chapters/05-tool-use-mcp/' },
            { text: '6. API 개발', link: '/chapters/06-api-development/' },
            { text: '7. 실전 프로젝트', link: '/chapters/07-advanced-projects/' },
          ],
        },
      ],

      sidebar: [
        {
          text: '시작하기',
          items: [
            { text: '소개', link: '/curriculum' },
          ],
        },
        {
          text: '1. AI 기초',
          collapsed: false,
          items: [
            { text: '1.1 AI, ML, DL이란?', link: '/chapters/01-ai-basics/' },
            { text: '1.2 신경망의 기초', link: '/chapters/01-ai-basics/neural-networks' },
            { text: '1.3 학습의 원리', link: '/chapters/01-ai-basics/how-learning-works' },
          ],
        },
        {
          text: '2. LLM 딥다이브',
          collapsed: true,
          items: [
            { text: '2.1 트랜스포머 아키텍처', link: '/chapters/02-llm-deep-dive/' },
            { text: '2.2 토큰화와 임베딩', link: '/chapters/02-llm-deep-dive/tokenization' },
            { text: '2.3 어텐션 메커니즘', link: '/chapters/02-llm-deep-dive/attention' },
            { text: '2.4 LLM의 학습과 추론', link: '/chapters/02-llm-deep-dive/training-inference' },
          ],
        },
        {
          text: '3. 프롬프트 엔지니어링',
          collapsed: true,
          items: [
            { text: '3.1 프롬프트 기초', link: '/chapters/03-prompt-engineering/' },
            { text: '3.2 고급 프롬프트 기법', link: '/chapters/03-prompt-engineering/advanced-techniques' },
            { text: '3.3 실전 프롬프트 설계', link: '/chapters/03-prompt-engineering/real-world' },
          ],
        },
        {
          text: '4. AI 에이전트',
          collapsed: true,
          items: [
            { text: '4.1 에이전트란 무엇인가', link: '/chapters/04-ai-agents/' },
            { text: '4.2 에이전트 아키텍처', link: '/chapters/04-ai-agents/architecture' },
            { text: '4.3 멀티 에이전트 시스템', link: '/chapters/04-ai-agents/multi-agent' },
          ],
        },
        {
          text: '5. Tool Use & MCP',
          collapsed: true,
          items: [
            { text: '5.1 Tool Use 개념', link: '/chapters/05-tool-use-mcp/' },
            { text: '5.2 MCP 기초', link: '/chapters/05-tool-use-mcp/mcp-basics' },
            { text: '5.3 MCP 서버 만들기', link: '/chapters/05-tool-use-mcp/building-mcp-server' },
          ],
        },
        {
          text: '6. API 개발',
          collapsed: true,
          items: [
            { text: '6.1 Anthropic API 시작하기', link: '/chapters/06-api-development/' },
            { text: '6.2 대화형 앱 만들기', link: '/chapters/06-api-development/chat-app' },
            { text: '6.3 스트리밍과 고급 기능', link: '/chapters/06-api-development/streaming' },
          ],
        },
        {
          text: '7. 실전 프로젝트',
          collapsed: true,
          items: [
            { text: '7.1 프로젝트 설계', link: '/chapters/07-advanced-projects/' },
            { text: '7.2 AI 기반 앱 구축', link: '/chapters/07-advanced-projects/building-ai-app' },
          ],
        },
      ],

      socialLinks: [
        { icon: 'github', link: 'https://github.com/speson/tom-learn-ai' },
      ],

      outline: {
        label: '목차',
      },

      lastUpdated: {
        text: '마지막 수정',
      },

      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '검색', buttonAriaLabel: '검색' },
            modal: {
              noResultsText: '결과를 찾을 수 없습니다',
              resetButtonTitle: '초기화',
              footer: { selectText: '선택', navigateText: '이동' },
            },
          },
        },
      },

      docFooter: {
        prev: '이전',
        next: '다음',
      },
    },

    mermaid: {
      // Mermaid 옵션
    },
  })
)
