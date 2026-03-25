# Style Bible

AI 기반 퍼스널 컬러 & 체형 분석 + 시즌별 룩북 생성 웹앱.

## Tech Stack

- **Frontend:** React 19 + Vite
- **Auth:** Supabase (Google OAuth)
- **DB:** Supabase PostgreSQL
- **AI 분석:** Claude API (Anthropic) - 퍼스널 컬러, 체형, 스타일 추천
- **AI 이미지:** Gemini API (Google) - 시즌별 룩북 생성
- **배포:** Vercel (Serverless Functions)
- **폰트:** Pretendard Variable

## 주요 기능

1. Google 로그인
2. 사진 업로드 (얼굴 2~3장, 전신 2~3장, 코디 2~3장)
3. Claude AI 분석 → 퍼스널 컬러 / 체형 / 스타일 추천
4. Gemini AI → 시즌별 룩북 이미지 4장 자동 생성 (봄/여름/가을/겨울)
5. 결과 저장 (재로그인 시 이전 결과 자동 로드)

## Setup

### 환경변수

`style-bible/.env.local`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
CLAUDE_API_KEY=your_claude_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Supabase 설정

- Authentication > Providers > **Google** 활성화 (OAuth Client ID/Secret 필요)
- `analysis_results` 테이블:
  - `id` (uuid, PK)
  - `user_id` (uuid, unique)
  - `result` (jsonb)
  - `looks` (jsonb, nullable)
  - `updated_at` (timestamptz)

### 로컬 개발

```bash
cd style-bible
npm install
node server.js        # API 서버 (localhost:3001)
npm run dev           # Vite 프론트엔드 (localhost:5176)
```

### 배포

```bash
npm run build         # Vite 빌드
vercel                # Vercel 배포
```

Vercel 환경변수에 `CLAUDE_API_KEY`, `GEMINI_API_KEY` 추가 필요.

## 프로젝트 구조

```
style-bible/
├── api/
│   ├── analyze.js          # Claude 분석 (Vercel Serverless)
│   └── generate-looks.js   # Gemini 룩북 생성 (Vercel Serverless)
├── src/
│   ├── App.jsx             # 메인 라우팅, 세션 관리
│   ├── Auth.jsx            # Google 로그인
│   ├── PhotoUpload.jsx     # 3단계 사진 업로드
│   ├── ResultView.jsx      # 분석 결과 + 룩북 표시
│   ├── supabaseClient.js   # Supabase 초기화
│   └── i18n.js             # 한국어/영어 지원
├── prompt.js               # Claude 시스템 프롬프트
├── server.js               # 로컬 개발용 Express 서버
└── vercel.json             # Vercel 함수 설정
```

## 비용 (1회 분석당)

| API | 용도 | 예상 비용 |
|-----|------|----------|
| Claude Sonnet | 분석 | ~$0.03-0.05 |
| Gemini Flash | 룩북 4장 | ~$0.08-0.12 |
| **합계** | | **~$0.11-0.17** |

## Dev 참고

- `/#/seol`, `/#/robe` — 개발용 스타일 바이블 샘플 (로그인 불필요)
