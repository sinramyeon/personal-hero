# ✦ Personal Style Bible (MVP)

AI 기반 퍼스널 컬러 & 체형 분석 웹앱

사용자가 자신의 사진을 업로드하면
AI가 얼굴, 피부톤, 체형, 분위기를 분석하여
퍼스널 컬러 타입과 스타일 DNA를 도출하는 서비스입니다.

---

## 🎯 What This App Does

1. 회원가입 / 로그인 (이메일 매직링크)
2. 최소 2~5장의 사진 업로드
3. AI(Claude Vision) 기반 분석
4. 개인 스타일 분석 결과 JSON 생성
5. 결과를 기반으로 향후 시즌별 스타일 생성 확장 예정

---

## 🧠 AI Analysis Scope (Claude)

업로드된 이미지를 기반으로 다음을 분석합니다:

* Height estimate
* Shoulder width impression
* Body build (slim / athletic / soft / stocky)
* Face shape
* Skin undertone (warm / cool / neutral)
* Contrast level
* Hair description
* 2 dominant style moods
* Seasonal personal color suggestion

결과는 **strict JSON 형식**으로 반환됩니다.

---

## 🧱 Tech Stack

Frontend:

* Next.js
* React
* Deployed on Vercel

Auth:

* Supabase (Email Magic Link)

AI:

* Claude Vision API (Anthropic)

Storage:

* 현재는 이미지 저장 없이 분석 후 폐기 (MVP 단계)

---
