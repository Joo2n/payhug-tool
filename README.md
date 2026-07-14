# payhug-tool — 페이허그 문서 도구

계약서·견적서 작업용 브라우저 도구 모음. GitHub Pages로 공개 배포되며, 모든 파일 처리는
사용자 브라우저 안에서만 이루어진다 (서버 전송 없음).

## 배포 URL

| 페이지 | URL |
|---|---|
| 랜딩 | https://joo2n.github.io/payhug-tool/ |
| 여러 파일 배경 제거 (서명·도장 누끼) | https://joo2n.github.io/payhug-tool/v3/ |
| 단일 파일 배경 제거 (슬라이더 조절) | https://joo2n.github.io/payhug-tool/v2/ |
| PDF 변환 (PDF→PNG/JPG) | https://joo2n.github.io/payhug-tool/pdf/ |
| 웹 가이드 | /guide/v3.html, /guide/v2.html, /guide/pdf.html (+PDF 다운로드) |

## 구조

```
index.html        랜딩 (카드 3개 + 사용법 링크)
v3/index.html     여러 파일 배경 제거 — 다중 파일·PDF 페이지 체크박스·확대축소·영역선택
v2/index.html     단일 파일 배경 제거 — 한 장씩·슬라이더 조절
pdf/index.html    PDF 변환 — 페이지 썸네일 선택, PNG/JPG·해상도 옵션
guide/            웹 가이드 3종 + 다운로드용 PDF 3종
assets/           가이드 스크린샷 (긴 변 1600px)
.check-links.js   상대 링크/이미지 경로 검증 스크립트 (node .check-links.js)
```

## 도구 핵심 사양

- **배경 제거 파이프라인 (v2·v3 동일, 픽셀 단위 일치 검증됨)**: 채널별 배경 추정(팽창+블러) →
  슬라이더 기반 임계값(기본 100/100) → smoothstep+감마 알파 → 지지대 잡티 제거 →
  잉크색 복원(색 오염 제거) + 저알파 밝은 잡점 가드 → 스트레이트 알파 자체 PNG 인코더
- 저장 파일명: `원본명(누끼).png`, PDF 페이지는 `원본명 p3(누끼).png`
- 줌: 휠/핀치 = 연속 부드러운 줌(이벤트당 ±18% 클램프), [+][−] = 25% 단위
- PDF 렌더링만 pdf.js CDN 사용 (인터넷 필요), 이미지 처리는 오프라인 동작

## 유지보수

- 이 레포의 main에 push하면 GitHub Pages(legacy build)가 자동 재배포된다 (약 1분).
- 로컬 작업 사본: `~/cursor/payhug-tool/` (수정 → 커밋 → push).
- 개인용 폴더 일괄 처리 프로그램(.command)과 상세 개발 이력은 비공개 레포
  `Joo2n/payhug-tool-workspace` (로컬 `~/cursor/누끼/`)의 README 참고.
- 도구 HTML을 수정할 땐 로컬 원본(`누끼/서명누끼/서명누끼.html`, `~/Downloads/서명누끼.html`,
  `누끼/PDF변환/PDF변환.html`)과 이 레포 사본을 함께 갱신할 것.

## 이력 (2026-07)

- 07-14 서명 누끼 v1 제작 → v2 품질 개선(잉크색 복원·적응형 임계값) → v3 다중 파일·PDF
  직행·페이지 체크박스 → v3 파이프라인을 v2와 완전 통일(같은 슬라이더 = 같은 결과, SHA-256 검증)
- 07-14 PDF 변환 도구 제작 (다중 PDF·페이지 선택·해상도 옵션)
- 07-14 payhug-tool 레포 생성·Pages 공개 배포, 가이드 웹/PDF 통합
- 07-15 명칭 정리: "여러 파일/단일 파일 배경 제거", 홈 버튼 내비게이션, 가이드 명칭 통일
