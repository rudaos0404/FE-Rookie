# FE Portfolio Blog

취업 준비 과정에서의 **학습/에러 정리, 면접 경험**을 기록하는 포트폴리오용 블로그입니다.  
기록을 쌓으면 그대로 포트폴리오가 되는 것을 목표로 구현했습니다.

> React + TypeScript + Zustand + React Router + Tailwind 기반의 SPA

---

## ✨ 주요 기능

### 1. 글 관리 (CRUD)

- 글 작성 / 수정 / 삭제
- 카테고리
  - `학습 / 에러 (study)`
  - `취준 / 면접 (job)`
- 태그 추가/삭제
- 대표 이미지 업로드 및 미리보기

### 2. 인터랙션

- 게시글 **좋아요 / 조회수** 카운트
  - 같은 브라우저에서 **한 글당 1회만 카운트** (중복 방지)
  - 좋아요 중복 시 “이미 좋아요를 누른 게시글입니다.” 안내
- **북마크(즐겨찾기)** 기능
  - 상세에서 북마크 토글
  - 북마크 전용 페이지에서 모아보기
- 상세 페이지에서 **작성자에게만 수정/삭제 버튼 노출**

### 3. 검색 · 필터 · 정렬

- 검색
  - 제목 / 내용 / 태그 기준 통합 검색
- 필터
  - 전체 / 학습 / 취준
- 정렬
  - 최신순
  - 조회수순
  - 좋아요순

### 4. UI/UX

- 라이트 / 다크 **테마 토글**
  - 테마 상태 `localStorage`에 저장 → 새로고침 후에도 유지
- “오늘의 한 줄” 카드
  - 길이가 길어져도 레이아웃이 깨지지 않도록 line-clamp / overflow 처리
- 카드 hover 시 살짝 떠오르는 애니메이션
- 버튼 클릭 시 scale/translate로 마이크로 인터랙션
- 반응형 레이아웃 (모바일 ~ 데스크톱)

### 5. 상태 관리 & 영속화

- **Zustand**로 전역 상태 관리
  - `postStore`: 게시글, 조회수, 좋아요, 북마크, 중복 방지 상태
  - `userStore`: 로그인 닉네임
  - `themeStore`: 라이트/다크 테마
- `zustand/middleware/persist` 사용
  - 게시글 / 조회수 / 좋아요 / 북마크
  - 로그인 닉네임
  - 테마 상태  
  → 모두 `localStorage`에 저장하여 새로고침해도 유지

---

## 🛠 기술 스택

- **Framework**: React 18, TypeScript
- **State Management**: Zustand (+ persist)
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deploy**: Vercel (예정/완료에 따라 수정)

---

## 📁 폴더 구조 (일부)

```bash
src
├── pages
│   ├── HomePage.tsx
│   ├── PostListPage.tsx
│   ├── PostDetailPage.tsx
│   ├── PostWritePage.tsx
│   ├── PostEditPage.tsx
│   └── BookmarkPage.tsx
├── store
│   ├── postStore.ts
│   ├── userStore.ts
│   └── themeStore.ts
├── App.tsx
└── main.tsx
