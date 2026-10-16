// 1차의 문제 정의·해결 방향·응모권·진행 상태와 2차의 전체 발표를 가져온 독립 스냅샷.
// 확정 정책: getddo-spec main 00f16aa (2026-10-16). 로컬 미커밋의 정책·설계·운영 기록도 대조.
// Redis 생성·PONG은 로컬 redis.md의 기록. Parameter Store 설정 전달 코드는 미배포.
// 목표 아키텍처: 로컬 getddo-aws-two-api-services.png. 목표 구성을 실제 운영 완료로 표시하지 않음.
export const thirdRoundSlides = [
  {
    "type": "cover",
    "title": "GETDDO\n3차 멘토링",
    "label": "MENTORING 03",
    "description": "멤버십 이벤트 플랫폼 · 서비스 소개와 최신 설계",
    "tags": [
      "프로젝트 소개",
      "주요 기능",
      "설계·구현 현황"
    ]
  },
  {
    "type": "agenda",
    "title": "목차",
    "label": "CONTENTS",
    "description": "프로젝트의 목적과 기능을 소개하고, 최신 설계와 구현 현황을 공유합니다.",
    "items": [
      {
        "title": "프로젝트 소개",
        "description": "서비스 · 대상 고객 · 문제와 해결 방향",
        "target": 2
      },
      {
        "title": "주요 기능",
        "description": "사용자 · 관리자 · 응모권 정책",
        "target": 5
      },
      {
        "title": "유사 서비스·차별점",
        "description": "서비스별 비교 · GETDDO의 특징",
        "target": 8
      },
      {
        "title": "기술·데이터 설계",
        "description": "기술 스택 · 시스템 아키텍처 · ERD",
        "target": 10
      },
      {
        "title": "사용자 흐름",
        "description": "응모권 획득부터 당첨 결과 확인까지",
        "target": 13
      },
      {
        "title": "진행 현황·멘토링",
        "description": "구축 · 로컬 준비 · 남은 검증",
        "target": 14
      }
    ]
  },
  {
    "type": "cards",
    "title": "GETDDO 서비스 소개",
    "label": "01 / SERVICE",
    "description": "출석·미션·게임으로 응모권을 모아 경품 이벤트에 참여하는 멤버십 플랫폼을 만들고자 합니다.",
    "cards": [
      {
        "label": "GOAL",
        "title": "매일 이용하는 멤버십",
        "text": "기간 한정 이벤트와 상시 참여 콘텐츠를 함께 제공해 고객이 꾸준히 멤버십을 이용할 기회를 만듭니다.",
        "tag": "출석 · 미션 · 게임 · 경품 이벤트",
        "tone": "mint"
      },
      {
        "label": "TARGET",
        "title": "LG유플러스 멤버십 고객",
        "text": "멤버십 전 등급 고객을 대상으로 합니다. 개별 이벤트에서 참여 가능한 등급과 조건을 설정합니다.",
        "tag": "이벤트별 참여 조건 설정",
        "tone": "yellow"
      },
      {
        "label": "FLOW",
        "title": "응모권 획득부터 당첨 확인까지",
        "text": "응모권을 모으고, 원하는 경품 이벤트에 응모한 뒤, 발표된 당첨 결과를 한 서비스에서 확인합니다.",
        "tag": "획득 → 응모 → 결과 확인",
        "tone": "pink"
      }
    ]
  },
  {
    "type": "split",
    "title": "문제 정의",
    "label": "01 / PROBLEM",
    "description": "추첨 근거와 응모권 변동을 확인할 수 있는 기록",
    "columns": [
      {
        "label": "DRAW",
        "title": "선정 근거 확인",
        "paragraphs": [
          "어떤 대상·조건으로 당첨자가 정해졌는지 확인하기 어려움.",
          "추첨 당시 후보·조건·확정 결과가 남아 있어야, 운영자가 선정 과정의 정합성을 확인할 수 있습니다."
        ]
      },
      {
        "label": "TICKET",
        "title": "보유량과 이력 일치",
        "paragraphs": [
          "응모권 지급·차감 기록과 보유량이 어긋나면 사용 가능 수량을 설명하기 어려움.",
          "운영자도 문의·취소·반환 처리의 근거가 필요."
        ]
      }
    ]
  },
  {
    "type": "cards",
    "title": "해결 방향",
    "label": "01 / APPROACH",
    "description": "추첨 스냅샷 · 장별 응모권 이력 · 관리자 확인 후 결과 공개",
    "cards": [
      {
        "label": "01",
        "title": "추첨 근거 보존",
        "text": "후보·응모권 수·가중치·조건 스냅샷과 확정 결과를 보관하고, 동일 실행의 정합성을 검증합니다.",
        "tag": "확정 결과를 다시 뽑지 않고 검증",
        "tone": "mint"
      },
      {
        "label": "02",
        "title": "응모권 이력",
        "text": "응모권 한 장의 등급·상태와 지급·차감·반환·만료 이력을 함께 관리합니다. 이력은 누적 보관합니다.",
        "tag": "현재 보유량과 변경 근거 연결",
        "tone": "yellow"
      },
      {
        "label": "03",
        "title": "결과 공개",
        "text": "마감 5분 후 최초 자동 추첨. 관리자 명단 확인과 수동 공개 후 마스킹한 당첨자·경품을 안내합니다.",
        "tag": "추첨 확정 · 명단 확인 · 공개 구분",
        "tone": "pink"
      },
      {
        "label": "04",
        "title": "당첨 취소·빈 자리 재추첨",
        "text": "관리자가 사유를 남겨 개별 당첨을 취소하고 빈 자리만 재추첨합니다. 기존 당첨자와 실행 이력을 유지합니다.",
        "tag": "유지 결과와 새 결과를 연결",
        "tone": "mint"
      }
    ]
  },
  {
    "type": "cards",
    "title": "사용자 기능",
    "label": "02 / USER FEATURES",
    "description": "고객은 일상 콘텐츠로 응모권을 얻고, 원하는 경품 이벤트에 참여합니다.",
    "cards": [
      {
        "label": "REWARD",
        "title": "출석·미션·게임",
        "text": "출석은 브론즈 응모권, 일회성 퀴즈·설문과 게임은 무작위 등급 응모권을 지급합니다.",
        "tag": "게임 보상: 사용자별·게임별 하루 1회",
        "tone": "mint"
      },
      {
        "label": "EVENT",
        "title": "이벤트 조회·응모",
        "text": "경품과 참여 조건을 확인하고, 응모권 사용 또는 미사용 이벤트에 응모합니다.",
        "tag": "이벤트별 응모 방식·가중치",
        "tone": "yellow"
      },
      {
        "label": "TICKET",
        "title": "응모권 조회",
        "text": "보유 응모권 수와 지급·사용·만료·반환 내역을 확인합니다.",
        "tag": "보유량 · 변동 내역",
        "tone": "pink"
      },
      {
        "label": "RESULT",
        "title": "당첨 결과·알림",
        "text": "발표된 당첨자와 경품을 확인하고, 알림함에서 안내를 조회·읽음 처리합니다.",
        "tag": "결과 조회 · 알림함",
        "tone": "mint"
      }
    ]
  },
  {
    "type": "cards",
    "title": "관리자 기능",
    "label": "02 / ADMIN FEATURES",
    "description": "관리자는 이벤트와 보상을 운영하고, 추첨 결과를 확인해 공개합니다.",
    "cards": [
      {
        "label": "EVENT",
        "title": "이벤트·경품 관리",
        "text": "경품·멤버십 조건·응모 기간을 설정하고, 이벤트 상태에 맞춰 수정·취소합니다.",
        "tag": "등급 조건 · 가중치 설정",
        "tone": "mint"
      },
      {
        "label": "CONTENT",
        "title": "보상·배너 관리",
        "text": "출석·미션·게임의 보상을 관리하고, 서비스 배너를 등록·수정·삭제합니다.",
        "tag": "참여 콘텐츠 · 노출 관리",
        "tone": "yellow"
      },
      {
        "label": "DRAW",
        "title": "추첨·결과 발표",
        "text": "마감 5분 후 자동 추첨한 명단을 확인합니다. 사유를 남겨 개별 당첨 취소·빈 자리 재추첨 후 수동 공개합니다.",
        "tag": "자동 추첨 · 명단 확인 · 수동 공개",
        "tone": "pink"
      },
      {
        "label": "REVIEW",
        "title": "지급 전 차단 기록",
        "text": "서버 검증으로 보상 지급 전 차단한 요청의 사유·시각·근거를 조회합니다. 정상 응모의 추첨 제외·응모권 회수는 제공하지 않습니다.",
        "tag": "차단 근거 · 처리 기록",
        "tone": "mint"
      }
    ]
  },
  {
    "type": "cards",
    "title": "응모권",
    "label": "02 / TICKETS",
    "description": "브론즈·실버·골드 응모권 · 실제 장수와 추첨 가중치 구분",
    "cards": [
      {
        "label": "01",
        "title": "획득",
        "text": "기본·연속 출석은 브론즈로 지급합니다. 미션·게임 보상은 등급을 무작위 결정해 응모권 1장을 지급합니다.",
        "tag": "출석 · 일회성 미션 · 게임별 일일 보상",
        "tone": "mint"
      },
      {
        "label": "02",
        "title": "차감·내역",
        "text": "사용자가 등급별 차감 장수를 선택합니다. 응모 기록·차감·이력을 함께 확정하고 중복 지급·초과 차감을 막습니다.",
        "tag": "일반 가중치 이벤트 누적 5장 상한",
        "tone": "yellow"
      },
      {
        "label": "03",
        "title": "만료·반환",
        "text": "일반 지급분은 해당 월말까지 사용합니다. 이벤트 취소 시 원래 응모권을 반환하고 반환 월의 다음 달 말까지 사용합니다.",
        "tag": "KST 만료 기준 · 반환 시 기존 등급 유지",
        "tone": "pink"
      }
    ]
  },
  {
    "type": "comparison",
    "title": "유사 서비스 분석",
    "label": "03 / COMPARISON",
    "description": "멤버십 혜택·활동 보상·행사 운영 서비스를 비교해 GETDDO의 기획 방향을 정했습니다.",
    "rows": [
      [
        "SKT T멤버십",
        "제휴 할인·혜택 · 멤버십 이벤트",
        "출석·미션·게임과 경품 응모를 연결"
      ],
      [
        "캐시워크",
        "걷기·챌린지로 캐시 적립",
        "응모권을 모아 멤버십 경품 이벤트에 참여"
      ],
      [
        "이벤터스",
        "행사 개설 · 참가 신청 · 운영",
        "멤버십 보상 획득·경품 응모 운영에 집중"
      ],
      [
        "구매 연계 경품 이벤트",
        "구매·리뷰를 참여 조건으로 설정",
        "구매 없이 출석·미션·게임으로 참여"
      ]
    ]
  },
  {
    "type": "cards",
    "title": "GETDDO의 차별점",
    "label": "03 / DIFFERENCE",
    "description": "여러 참여 콘텐츠를 응모권으로 연결하고, 고객 참여와 관리자 운영을 함께 구성합니다.",
    "cards": [
      {
        "label": "REWARD",
        "title": "출석·미션·게임을 응모권으로",
        "text": "활동별로 모은 응모권을 원하는 경품 이벤트에 사용합니다. 상품 구매를 참여 조건으로 두지 않습니다.",
        "tag": "보상 획득 → 경품 응모",
        "tone": "mint"
      },
      {
        "label": "ENTRY",
        "title": "두 가지 응모 방식",
        "text": "응모권 없이 1회 참여하는 이벤트와 응모권을 사용하는 이벤트를 제공합니다. 가중치는 이벤트별로 설정합니다.",
        "tag": "응모권 미사용형 · 사용형",
        "tone": "yellow"
      },
      {
        "label": "OPERATION",
        "title": "참여부터 결과 발표까지",
        "text": "고객 화면과 관리자 화면을 함께 제공합니다. 이벤트 등록·응모·추첨·명단 확인·공개를 한 흐름으로 운영합니다.",
        "tag": "사용자 서비스 · 관리자 도구",
        "tone": "pink"
      },
      {
        "label": "HISTORY",
        "title": "추첨 근거·응모권 이력",
        "text": "후보·조건 스냅샷과 확정 결과로 정합성을 검증합니다. 장별 이력으로 지급·차감·반환·만료를 확인합니다.",
        "tag": "확정 결과 검증 · 장별 변동 기록",
        "tone": "mint"
      }
    ]
  },
  {
    "type": "tech",
    "title": "핵심 기술 스택",
    "label": "04 / TECH STACK",
    "description": "프론트엔드·백엔드의 주요 기술과 역할",
    "items": [
      {
        "icon": "react",
        "track": "frontend",
        "name": "React · TypeScript",
        "role": "화면 개발 · Vite 빌드"
      },
      {
        "icon": "spring",
        "track": "backend",
        "name": "Spring Boot · Java",
        "role": "API · 비즈니스 로직"
      },
      {
        "icon": "tanstack",
        "track": "frontend",
        "name": "TanStack Query",
        "role": "서버 상태 · API 연동"
      },
      {
        "icon": "mysql",
        "track": "backend",
        "name": "JPA · MySQL",
        "role": "데이터 저장 · 트랜잭션"
      },
      {
        "icon": "tailwindcss",
        "track": "frontend",
        "name": "Tailwind · shadcn/ui",
        "role": "UI 스타일 · 컴포넌트"
      },
      {
        "icon": "redis",
        "track": "backend",
        "name": "Redis",
        "role": "Redis OSS 7.1 · 서버 연결 확인"
      },
      {
        "icon": "flyway",
        "track": "backend",
        "name": "Flyway · Gradle",
        "role": "DB 스키마 변경 · 빌드"
      }
    ],
    "notesTitle": "주요 보조 도구",
    "notes": [
      {
        "title": "상태·입력",
        "text": "Zustand · Redux Toolkit · React Hook Form · Zod"
      },
      {
        "title": "모션·검증",
        "text": "GSAP · Framer Motion · Vitest · Testing Library · MSW"
      },
      {
        "title": "AWS 인프라",
        "text": "CloudFront · ALB · EC2 · RDS · ElastiCache · S3 · SSM · Parameter Store"
      }
    ]
  },
  {
    "type": "image",
    "layout": "diagram",
    "title": "시스템 아키텍처",
    "label": "04 / SYSTEM ARCHITECTURE",
    "description": "CloudFront·내부 ALB·EC2 두 대로 확장하는 목표 구성입니다. 현재 EC2 한 대·RDS와 Redis 연결을 확인했고, Parameter Store 설정 전달은 로컬에 준비했습니다.",
    "src": "assets/round3-architecture.png",
    "alt": "로컬 미커밋 설계 자료: CloudFront, 내부 ALB, API 서버 두 대, 공용 RDS·Redis, 이미지 S3, Parameter Store, SSM과 배포 S3의 목표 아키텍처.",
    "caption": ""
  },
  {
    "type": "image",
    "title": "ERD",
    "label": "04 / DATA MODEL",
    "track": "backend",
    "description": "사용자·이벤트·응모권·응모·추첨을 중심으로 주요 엔티티와 관계 설명",
    "src": "assets/round3-erd.svg",
    "alt": "최신 DBML과 V026 마이그레이션을 대조한 사용자, 이벤트, 응모권, 응모, 추첨과 공개의 핵심 관계.",
    "caption": "전체 45개 테이블 중 핵심 관계 요약 · 응모권 장별 이력 · 접수·거절 기록 · 추첨 실행·결과 공개"
  },
  {
    "type": "image",
    "layout": "journey",
    "title": "사용자 이용 흐름",
    "label": "05 / USER JOURNEY",
    "description": "홈에서 원하는 활동을 선택하고, 이벤트에 응모한 뒤 당첨 결과를 확인합니다.",
    "src": "assets/round2-user-journey.svg",
    "alt": "홈에서 출석·미션·게임으로 응모권을 모으거나 바로 이벤트를 선택합니다. 상세 확인과 응모 후 내 응모 내역에서 발표를 기다리고, 알림함 또는 이벤트에서 당첨 결과를 확인합니다.",
    "caption": ""
  },
  {
    "type": "cards",
    "title": "진행 상태",
    "label": "06 / PROGRESS",
    "description": "로컬 운영 기록과 코드 기준 · 자원 준비와 애플리케이션 연동을 구분",
    "cards": [
      {
        "label": "CONFIRMED",
        "title": "구축·접속 확인",
        "text": "EC2·비공개 RDS와 첫 자동 배포를 확인했습니다. Redis는 생성 후 API 서버에서 PONG 응답을 확인한 기록이 있습니다.",
        "tag": "Redis 인프라 연결 확인 · 기능 연동은 별도",
        "tone": "mint"
      },
      {
        "label": "LOCAL",
        "title": "미커밋 코드 준비",
        "text": "Parameter Store 설정 13개 조회·검증, Redis TLS 환경변수, 이미지 설정과 배포 실패 시 이미지·설정 복구 코드를 준비했습니다.",
        "tag": "로컬 검증 · 서버 배포 전",
        "tone": "yellow"
      },
      {
        "label": "NEXT",
        "title": "연동·확장 검증",
        "text": "Redis 요청 제한 연동, 이미지 업로드·조회, HTTPS 프론트 연동과 EC2 두 대의 순차 배포·중복 처리 검증이 남아 있습니다.",
        "tag": "목표 구성 · 전체 연동 완료 아님",
        "tone": "pink"
      }
    ]
  },
  {
    "type": "questions",
    "title": "멘토님께 여쭤볼 내용",
    "label": "07 / MENTORING",
    "description": "서비스 설명과 최신 설계를 바탕으로, 연동·검증 단계의 의견을 듣고 싶습니다.",
    "questions": [
      "기존 리워드 서비스와 비교했을 때, 멤버십 고객이 GETDDO를 쓸 이유가 충분히 보이나요?",
      "응모권 획득·응모·결과 공개 흐름을 연결할 때, 동시 요청과 중복 처리를 어떤 시나리오부터 검증하면 좋을까요?",
      "EC2 두 대 전환과 Redis 장애 시에도 DB 정합성을 유지하려면, 부하·실패 복구 검증을 어떤 순서로 진행하면 좋을까요?"
    ]
  },
  {
    "type": "ending",
    "title": "감사합니다",
    "label": "GETDDO",
    "description": "3차 멘토링"
  }
];
