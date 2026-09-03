# DEVIGN — 개발 + 디자인 정보 공유 커뮤니티

React + Vite + MUI 프론트엔드가 **백엔드 서버 없이 Supabase 를 직접 호출**하는 구조의 커뮤니티입니다.

## 주요 기능

- 로그인 / 회원가입 (아이디 중복확인, 비밀번호 규칙 체크리스트)
- 테스트 계정으로 둘러보기 (로그인 없이 체험)
- 게시물 목록 · 작성 · 상세 보기 · 삭제
- 이미지 업로드 (Supabase Storage)
- 해시태그 (최대 5개) 및 키워드 검색
- 좋아요 토글 (한 번 더 누르면 취소), 조회수, 댓글

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| 프론트엔드 | React 19, Vite, MUI |
| 라우팅 | react-router-dom (HashRouter) |
| 데이터베이스 / 스토리지 | Supabase |
| 배포 | GitHub Pages + GitHub Actions |

## 로컬 실행

```bash
npm install
cp .env.example .env   # Supabase URL / anon key 입력
npm run dev
```

## 환경변수

| 키 | 설명 |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable(anon) 키 |

`.env` 는 git 에 커밋되지 않습니다. 배포 시에는 GitHub 저장소의
`Settings → Secrets and variables → Actions` 에 동일한 이름으로 등록합니다.

## 데이터베이스 구조

| 테이블 | 설명 |
| --- | --- |
| `users` | 사용자 번호, 아이디, 닉네임, 비밀번호 해시, 가입일 |
| `posts` | 게시물 번호, 제목, 내용, 이미지, 태그, 조회수, 작성자, 작성일, 수정일 |
| `comments` | 댓글 번호, 내용, 작성자, 게시물, 작성일 |
| `post_likes` | 좋아요 번호, 게시물, 사용자 (게시물당 1인 1회) |

## 디렉토리 구조

```
src/
├── components/
│   ├── common/   # AuthProvider, AppHeader, BrandLogo, RequireAuth
│   ├── ui/       # PageShell, EmptyState, HashtagList, PasswordRuleList
│   └── post/     # PostCard, PostFormDialog, LikeButton, CommentForm, CommentList
├── pages/        # 로그인 / 회원가입 / 게시물 목록 / 게시물 상세
├── hooks/        # auth-context
├── lib/          # supabase 클라이언트, auth-api, community-api
└── utils/        # 날짜 포맷, 비밀번호 해시, 유효성 검사, 해시태그 파싱
```

## 테스트 계정

로그인 화면의 **테스트 계정으로 둘러보기** 버튼을 누르면 `guest` 계정으로 바로 입장합니다.

## 보안 참고

학습용 프로젝트로 자체 `users` 테이블 + SHA-256 해시 방식을 사용하며,
RLS 정책은 anon 역할에 공개되어 있습니다. 실서비스에서는 Supabase Auth 와
`auth.uid()` 기반 RLS 정책으로 전환하는 것을 권장합니다.
