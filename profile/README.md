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

**GETDDO는 출석·미션·게임으로 모은 응모권을 이벤트 참여와 당첨 결과로 연결하는 플랫폼입니다.**
사용자는 일상적인 활동으로 응모권을 얻고, 관리자는 이벤트·경품·추첨·알림을 운영합니다.

| 구분 | 내용 |
| --- | --- |
| 대상 | LG유플러스 멤버십 이벤트를 이용하는 사용자와 운영 관리자 |
| 핵심 흐름 | 응모권 획득 → 이벤트 응모 → 자동 추첨 → 관리자 발표 → 결과 확인 |
| 개발 범위 | 사용자·관리자 화면, API, 응모권·추첨 데이터 처리, 배포·관측 |
| 개발 팀 | 3조 얻어가유 · 프론트엔드 3명 · 백엔드 5명 |

> 배포 서비스는 별도 회원가입 없이 사전 등록한 시연용 가상 사용자를 선택합니다. 실제 API와 연결하지만 계정·데이터는 시연용이며, 사용자 선택은 운영용 로그인 인증을 뜻하지 않습니다.

### 해결하려는 문제

- **같은 요청의 중복 반영** — 연타·재전송에도 보상·접수·차감이 한 번만 반영되도록 처리합니다.
- **기록의 불일치** — 응모·응모권 차감·이력을 함께 확정하고 취소 시 원래 응모권을 반환합니다.
- **추첨 근거와 공개 결과** — 후보·가중치·경품 조건·결과를 보존하고 관리자가 확인한 명단을 공개합니다.
- **실패 후 복구** — 비동기 작업의 진행 위치·재시도 근거를 남기고 서버·DB 상태를 관측합니다.

---

## 주요 기능과 서비스 흐름

### 사용자

| 기능 | 이용 흐름 |
| --- | --- |
| 출석·미션·게임 | 일일·연속 출석, 퀴즈·설문과 네 가지 게임으로 응모권 획득 |
| 응모권 지갑 | 브론즈·실버·골드·플래티넘 보유량과 지급·사용·반환·만료 내역 확인 |
| 이벤트 참여 | 기본 이벤트(`NO_TICKET`)·겟또타임(`TICKET`) 조회와 응모 |
| 결과·알림 | 관리자 발표 후 공개 명단·본인 당첨 결과 확인, 알림 조회·읽음 처리 |

### 관리자

| 기능 | 운영 흐름 |
| --- | --- |
| 이벤트·경품 | 썸네일·상세 안내·경품 이미지 업로드, 이벤트 등록·조회·수정·삭제·취소 |
| 추첨·발표 | 마감 1분 후부터 자동 추첨, 결과 검증·수동 발표, 개별 당첨 취소·빈자리 재추첨 |
| 참여·정책 | 사용자·응모·응모권 이력과 일별 집계, 출석 예약 정책·미션·설문 관리 |
| 운영·복구 | 배너·노출 순서 관리, 응모 자동 차단 이력 조회, 최종 실패 알림 확인·재처리 |

모집 기간의 시작·마감 상태는 워커가 전환합니다. 추첨 결과가 만들어져도 자동 발표하지 않으며, 관리자의 발표 후 사용자에게 결과를 제공합니다. 사용자 멤버십과 응모권 등급은 별개의 기준입니다.

---

## 아키텍처와 핵심 설계

[![GETDDO 시스템 아키텍처](https://raw.githubusercontent.com/Uplus-GETDDO/.github/main/assets/system-architecture.png)](https://github.com/Uplus-GETDDO/.github/blob/main/assets/system-architecture.png)

| 책임 | 적용한 방식 | 상세 |
| --- | --- | --- |
| 화면·API 연결 | FSD 구조, 서버 응답 검증, 요청·오류·재시도 상태의 화면 표현 | [Frontend README](https://github.com/Uplus-GETDDO/getddo-fe) |
| 업무·저장소 분리 | `api`·`core`·`storage:db`·`storage:s3`·`storage:redis` 다섯 모듈 | [Backend 구조](https://github.com/Uplus-GETDDO/getddo-be#아키텍처) |
| 중복·동시성 | 요청 ID, 행 잠금·유일 제약, 접수·차감·이력의 동일 트랜잭션 | [정합성 검증](https://github.com/Uplus-GETDDO/getddo-be/wiki/Consistency-Verification) |
| 추첨·공개 | 후보·조건 스냅샷, 중복 당첨 방지, 확정 결과와 공개 명단 버전 분리 | [추첨 흐름](https://github.com/Uplus-GETDDO/getddo-be/wiki/Mentoring-Drawing-Sequences) |
| 알림·차단 기록 | 작업·저널·진행 위치를 보존하고 재시도·묶음 저장 | [Backend 기능별 설명](https://github.com/Uplus-GETDDO/getddo-be#프로젝트-수행-경과) |
| 이미지·배포 | S3 이미지·CloudFront 공개 URL, ECR 이미지의 순차 배포·복구 | [운영 문서](https://github.com/Uplus-GETDDO/getddo-be/tree/dev/docs/06-runbook) |

개별 도메인의 **ERD·처리 흐름·사용 이유·테스트 근거**는 기존 [Backend Wiki](https://github.com/Uplus-GETDDO/getddo-be/wiki)에서 이어서 확인할 수 있습니다.

---

## 기술 스택

| 영역 | 기술과 역할 |
| --- | --- |
| Frontend | TypeScript · React · Vite · React Router |
| 서버 상태·요청 검증 | TanStack Query · Axios · Zod |
| UI 상태·폼·스타일 | Zustand · React Context · React Hook Form · Tailwind CSS · shadcn/ui |
| Backend | Java 21 · Spring Boot · Spring MVC · Spring Data JPA · JDBC |
| 데이터·변환 | MySQL 8.4 · Flyway · MapStruct |
| 요청 제한·차단 | Redis · Lua |
| 이미지 | AWS S3 · CloudFront |
| 테스트·관측 | JUnit · Testcontainers · S3Mock · CloudWatch · Prometheus · Grafana |
| 실행·배포 | Docker · Compose · GitHub Actions · ECR · EC2 · ALB · RDS · SSM |

상세 버전·설정·로컬 실행 방법은 각 코드 저장소의 README를 따릅니다.

---

## 검증과 확인 범위

로컬 단위·실제 저장소 통합 테스트와 별도로, API 서버 2대 스테이징에서 마감 직전 응모·중복 요청·취소 반환·자정 출석·추첨 명단을 대조했습니다. 시험 조건·기대값·실제 결과와 실패·한계는 [정합성 검증 기록](https://github.com/Uplus-GETDDO/getddo-be/wiki/Consistency-Verification)에 구분합니다.

코드 구현·PR 병합·운영 배포·FE 통합 인수는 서로 다른 단계입니다. 최신 화면별 연결·미관측 항목은 [백엔드 연동 현황](https://github.com/Uplus-GETDDO/getddo-fe/blob/dev/docs/backend-integration-status.md), 서버 측 실행 기록과 후속 수정은 [Backend README](https://github.com/Uplus-GETDDO/getddo-be)에서 확인합니다.

---

## 팀과 저장소

| 구분 | 담당 |
| --- | --- |
| Frontend · 3명 | 사용자·관리자 화면, API 연동, 화면 품질·성능 검증 |
| Backend · 5명 | 이경주(인프라·공통·사용자), 석종수(차단 기록·추첨), 전민규(백오피스·알림·게임), 윤태형(응모권·미션·출석·응모), 박지훈(이벤트·경품·취소) |

| 저장소                                                     | 역할                                               |
| ---------------------------------------------------------- | -------------------------------------------------- |
| [getddo-fe](https://github.com/Uplus-GETDDO/getddo-fe)     | 사용자·관리자 화면과 API 연동                      |
| [getddo-be](https://github.com/Uplus-GETDDO/getddo-be)     | API, 도메인 로직과 데이터 처리                     |
| [getddo-spec](https://github.com/Uplus-GETDDO/getddo-spec) | 공개 공용 명세 원본: 요구사항·도메인 규칙·API 계약 |
| [.github](https://github.com/Uplus-GETDDO/.github)         | 조직 소개와 멘토링 발표자료                        |

`getddo-spec`에서 공용 명세를 확인하고, 실제 구현·검증 범위는 각 저장소의 문서를 함께 참고하세요.
