<p align="center">
  <img src="https://raw.githubusercontent.com/Uplus-GETDDO/.github/main/site/assets/mascot.svg" width="140" alt="GETDDO 타코야끼 마스코트">
</p>

<h1 align="center">U+ GETDDO</h1>

<p align="center">
  <strong>출석하고, 도전하고, 응모하세요.</strong><br>
  출석·미션·게임으로 모은 응모권을 이벤트 참여로 연결하는 플랫폼
</p>

<p align="center">
  <a href="https://getddo-fe.vercel.app">서비스 체험</a> ·
  <a href="https://uplus-getddo.github.io/.github/">멘토링 발표자료</a> ·
  <a href="https://github.com/Uplus-GETDDO/getddo-fe">Frontend</a> ·
  <a href="https://github.com/Uplus-GETDDO/getddo-be">Backend</a>
</p>

---

## 프로젝트 소개

GETDDO는 LG유플러스 멤버십 사용자를 위한 이벤트 응모 플랫폼을 만드는 프로젝트입니다.
일상적인 참여로 응모권을 모으고, 원하는 이벤트에 응모한 뒤 결과를 확인하는 경험을 연결합니다.
사용자 화면과 함께 이벤트 운영·추첨·결과 발표를 위한 관리자 화면도 개발합니다.

> 배포 서비스는 별도 회원가입 없이 시연용 가상 사용자를 선택해 체험합니다. 실제 API에 연결하며, 계정과 데이터는 시연용입니다. 가상 사용자 선택은 시연용 문맥 전환으로, 실제 사용자 인증을 제공하지 않습니다.

주요 기능의 API 호출 구현과 배포 검증 기록이 있으며, 전체 흐름의 통합 검증은 일부 남아 있습니다.
2026-10-21 인수 기록에는 이벤트 취소 시 응모권 반환과 당첨 취소 후 재추첨·재발표의 기본 흐름 확인이 있습니다.
추첨 실패·재개와 C1~C6 격리 시나리오, 발표→알림 생성의 전체 흐름, 배너 실서버 CRUD·업로드 계약 등은 추가 확인이 필요합니다.
현재 확인 범위와 제한 사항은 [백엔드 연동 현황](https://github.com/Uplus-GETDDO/getddo-fe/blob/dev/docs/backend-integration-status.md)에서 관리합니다.

## 주요 기능

| 기능               | 내용                                             |
| ------------------ | ------------------------------------------------ |
| 출석 · 미션 · 게임 | 일상적인 참여와 미션 달성으로 응모권 획득        |
| 응모권 관리        | 보유량과 지급·사용 이력 확인                     |
| 이벤트 응모        | 응모권 미사용 이벤트와 응모권 사용 이벤트 참여   |
| 결과 · 알림        | 관리자 발표 후 당첨 결과와 알림 확인             |
| 관리자 운영        | 이벤트·경품 관리, 어뷰징 검토, 추첨 및 결과 발표 |

응모 기록과 응모권 잔액의 일치, 추첨 결과를 다시 확인할 수 있는 기록, 운영자의 판단 이력을 중요한 설계 기준으로 삼고 있습니다.

## 기술 구성

| 영역               | 주요 기술                                        |
| ------------------ | ------------------------------------------------ |
| Frontend           | TypeScript · React · Vite · React Router         |
| 서버 상태 · HTTP   | TanStack Query · Axios · Zod                     |
| UI 상태 · 폼       | Zustand · React Context · React Hook Form        |
| 스타일 · UI        | Tailwind CSS · shadcn/ui                         |
| Backend            | Java 21 · Spring Boot · Spring Data JPA          |
| 데이터 · 개발 환경 | MySQL · Flyway · Docker Compose · GitHub Actions |

상세 기술 구성과 실행 방법은 각 저장소의 README에서 확인할 수 있습니다.

## 저장소

| 저장소                                                     | 역할                                               |
| ---------------------------------------------------------- | -------------------------------------------------- |
| [getddo-fe](https://github.com/Uplus-GETDDO/getddo-fe)     | 사용자·관리자 화면과 API 연동                      |
| [getddo-be](https://github.com/Uplus-GETDDO/getddo-be)     | API, 도메인 로직과 데이터 처리                     |
| [getddo-spec](https://github.com/Uplus-GETDDO/getddo-spec) | 공개 공용 명세 원본: 요구사항·도메인 규칙·API 계약 |
| [.github](https://github.com/Uplus-GETDDO/.github)         | 조직 소개와 멘토링 발표자료                        |

`getddo-spec`에서 공용 명세를 확인하고, 실제 구현·검증 범위는 각 저장소의 문서를 함께 참고하세요.
