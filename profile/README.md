<p align="center">
  <img src="https://raw.githubusercontent.com/Uplus-GETDDO/.github/main/site/assets/mascot.svg" width="140" alt="GETDDO 타코야끼 마스코트">
</p>

<h1 align="center">U+ GETDDO</h1>

<p align="center">
  <strong>출석하고, 도전하고, 응모하세요.</strong><br>
  출석·미션·게임으로 모은 응모권을 이벤트 참여로 연결하는 플랫폼
</p>

<p align="center">
  <a href="https://uplus-getddo.github.io/.github/">멘토링 발표자료</a> ·
  <a href="https://github.com/Uplus-GETDDO/getddo-fe">Frontend</a> ·
  <a href="https://github.com/Uplus-GETDDO/getddo-be">Backend</a>
</p>

---

## 프로젝트 소개

GETDDO는 LG유플러스 멤버십 사용자를 위한 이벤트 응모 플랫폼을 만드는 프로젝트입니다.
일상적인 참여로 응모권을 모으고, 원하는 이벤트에 응모한 뒤 결과를 확인하는 경험을 연결합니다.
사용자 화면과 함께 이벤트 운영·추첨·결과 발표를 위한 관리자 화면도 개발합니다.

> 현재 개발 중이며, 가상 사용자와 더미 데이터를 기반으로 시연을 준비하고 있습니다.

## 주요 기능

| 기능 | 내용 |
| --- | --- |
| 출석 · 미션 · 게임 | 일상적인 참여와 미션 달성으로 응모권 획득 |
| 응모권 관리 | 보유량과 지급·사용 이력 확인 |
| 이벤트 응모 | 응모권 미사용 이벤트와 응모권 사용 이벤트 참여 |
| 결과 · 알림 | 관리자 발표 후 당첨 결과와 알림 확인 |
| 관리자 운영 | 이벤트·경품 관리, 어뷰징 검토, 추첨 및 결과 발표 |

응모 기록과 응모권 잔액의 일치, 추첨 결과를 다시 확인할 수 있는 기록, 운영자의 판단 이력을 중요한 설계 기준으로 삼고 있습니다.

## 기술 구성

| 영역 | 주요 기술 |
| --- | --- |
| Frontend | TypeScript · React · Vite · React Router |
| 상태 · UI | TanStack Query · Zustand · Redux Toolkit · Tailwind CSS · shadcn/ui |
| Backend | Java 21 · Spring Boot · Spring Data JPA |
| 데이터 · 개발 환경 | MySQL · Flyway · Docker Compose · GitHub Actions |

상세 기술 구성과 실행 방법은 각 저장소의 README에서 확인할 수 있습니다.

## 저장소

| 저장소 | 역할 |
| --- | --- |
| [getddo-fe](https://github.com/Uplus-GETDDO/getddo-fe) | 사용자·관리자 화면과 API 연동 |
| [getddo-be](https://github.com/Uplus-GETDDO/getddo-be) | API, 도메인 로직과 데이터 처리 |
| [getddo-spec](https://github.com/Uplus-GETDDO/getddo-spec) | 공통 요구사항·도메인 규칙·API 계약 · **팀 전용** |
| [.github](https://github.com/Uplus-GETDDO/.github) | 조직 소개와 멘토링 발표자료 |

`getddo-spec`은 비공개 저장소로, 접근 권한이 있는 팀원만 열람할 수 있습니다.
