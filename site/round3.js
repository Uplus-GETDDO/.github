// 1·2차의 프로젝트 설명·컨셉을 유지하고 최신 스펙·GD-212 전체 ERD를 반영.
// 기능 기준: getddo-spec main bda7722. ERD: docs/GD-212 25754f8.
export const thirdRoundSlides = [
  {
    "type": "cover",
    "title": "GETDDO\n3차 멘토링",
    "label": "MENTORING 03",
    "description": "멤버십 이벤트 플랫폼 · 서비스 소개와 최신 설계",
    "tags": [
      "프로젝트 소개",
      "등급 응모권 보상",
      "시스템 설계"
    ]
  },
  {
    "type": "agenda",
    "title": "목차",
    "label": "CONTENTS",
    "description": "프로젝트의 목적과 주요 기능, 등급 응모권의 참여 경험과 시스템 설계를 소개합니다.",
    "items": [
      {
        "title": "프로젝트 소개",
        "description": "서비스 · 대상 고객 · 문제와 해결 방향",
        "target": 2
      },
      {
        "title": "브랜드·게임 컨셉",
        "description": "디자인 시스템 · 마스코트 · 플레이 경험",
        "target": 5
      },
      {
        "title": "주요 기능",
        "description": "사용자 · 관리자 · 활동별 보상 · 응모권 등급",
        "target": 8
      },
      {
        "title": "유사 서비스·차별점",
        "description": "등급 보상 · 선택 응모 · 반복 참여",
        "target": 13
      },
      {
        "title": "기술·데이터 설계",
        "description": "기술 스택 · 시스템 아키텍처 · ERD",
        "target": 15
      },
      {
        "title": "서비스 흐름",
        "description": "활동 · 이벤트 선택 · 응모 · 결과 확인",
        "target": 18
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
        "text": "출석·미션·게임으로 응모권을 모으고, 등급별로 사용할 장수를 골라 경품 이벤트에 응모한 뒤 당첨 결과를 확인합니다.",
        "tag": "활동 → 등급 보상 → 선택 응모 → 결과 확인",
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
    "description": "활동의 보상 경험을 이벤트 응모로 연결하고, 처리 근거와 공개 결과를 함께 관리합니다.",
    "cards": [
      {
        "label": "01",
        "title": "활동마다 받는 등급 보상",
        "text": "미션 달성·게임 보상 조건 충족 시 브론즈·실버·골드 중 무작위 등급 응모권 1장을 지급해 다음 응모로 연결합니다.",
        "tag": "활동 완료 → 등급 보상 → 경품 응모",
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
    "type": "palette",
    "title": "디자인 시스템",
    "label": "02 / DESIGN SYSTEM",
    "description": "브랜드는 마젠타 · 응모권은 옐로 · 놀이는 파스텔"
  },
  {
    "type": "mascot",
    "title": "마스코트 — 타코야끼",
    "label": "02 / MASCOT",
    "description": "응모·추첨과 놀이를 연결하는 서비스 캐릭터",
    "reasons": [
      {
        "title": "추첨공을 닮은 모양",
        "text": "동그란 형태로 응모·추첨 서비스의 컨셉 표현"
      },
      {
        "title": "무너의 친구",
        "text": "유플러스 캐릭터 ‘무너’의 친구라는 설정으로 브랜드와 연결"
      }
    ]
  },
  {
    "type": "cards",
    "title": "게임 컨셉",
    "label": "02 / GAME CONCEPT",
    "description": "마스코트와 가벼운 플레이를 등급 응모권 보상으로 연결",
    "cards": [
      {
        "label": "TAKKO RUN",
        "title": "타꼬런",
        "text": "타코야끼 캐릭터가 소스병과 꼬치를 뛰어넘으며 달립니다. 스페이스바·위 방향키·화면 터치로 점프합니다.",
        "tag": "마스코트를 직접 조작하는 러닝 게임",
        "tone": "mint"
      },
      {
        "label": "COLOR WORD",
        "title": "글자색깔 맞추기",
        "text": "글자의 뜻이 아닌 칠해진 색을 고릅니다. 정답마다 10점을 얻고, 오답·시간 초과로 목숨 3개를 모두 잃으면 종료합니다.",
        "tag": "정답이 쌓일수록 짧아지는 제한 시간",
        "tone": "yellow"
      },
      {
        "label": "PLAY FLOW",
        "title": "플레이부터 보상 확인까지",
        "text": "게임 선택 → 규칙 안내 → 플레이 → 서버 결과 판정 → 점수·보상 확인. 개인 최고점·누적 점수를 기록합니다.",
        "tag": "플레이 횟수 제한 없이 재도전",
        "tone": "pink"
      },
      {
        "label": "REWARD",
        "title": "등급 응모권으로 연결",
        "text": "완료 결과가 유효하고 최소 보상 점수를 충족하면 게임별 하루 1회 무작위 등급 응모권 1장을 받습니다.",
        "tag": "타꼬런 400점 · 글자색깔 맞추기 50점",
        "tone": "mint"
      }
    ]
  },
  {
    "type": "cards",
    "title": "사용자 기능",
    "label": "02 / USER FEATURES",
    "description": "일상 콘텐츠로 등급 응모권을 모으고, 원하는 이벤트에 골라 사용합니다.",
    "cards": [
      {
        "label": "REWARD",
        "title": "출석·미션·게임 보상",
        "text": "출석은 브론즈, 미션 달성과 게임 보상 조건 충족 시 브론즈·실버·골드 중 무작위 등급 응모권 1장을 받습니다.",
        "tag": "게임별 하루 1회 · 미션별 1회",
        "tone": "mint"
      },
      {
        "label": "EVENT",
        "title": "이벤트 조회·응모",
        "text": "응모권 미사용 이벤트에 참여하거나, 사용 이벤트에서 보유 응모권의 등급별 차감 장수를 선택해 응모합니다.",
        "tag": "가중치 적용 시 브론즈 1 · 실버 3 · 골드 5",
        "tone": "yellow"
      },
      {
        "label": "TICKET",
        "title": "응모권 조회",
        "text": "등급별 보유 장수와 지급·차감·만료·반환 내역을 확인합니다. 실제 응모권 장수와 추첨 가중치는 구분합니다.",
        "tag": "보유량 · 변동 내역",
        "tone": "pink"
      },
      {
        "label": "RESULT",
        "title": "당첨 결과·알림",
        "text": "관리자가 공개한 당첨 결과를 3등→2등→1등 순서로 확인하고, 알림함에서 안내를 조회·읽음 처리합니다.",
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
    "title": "게임·미션 보상",
    "label": "02 / REWARDS",
    "description": "활동별 달성 조건을 충족하면 보상을 지급합니다.",
    "cards": [
      {
        "label": "GAME",
        "title": "게임 완료 후 등급 보상",
        "text": "서버가 유효한 완료 결과로 인정하고 최소 점수를 충족하면 무작위 등급 응모권 1장을 지급합니다. 사용자별·게임별 하루 1회입니다.",
        "tag": "타꼬런 400점 · 글자색깔 맞추기 50점",
        "tone": "mint"
      },
      {
        "label": "MISSION",
        "title": "미션 달성 후 등급 보상",
        "text": "퀴즈 정답 또는 설문의 필수 문항 최종 제출을 서버가 확인하면 무작위 등급 응모권 1장을 지급합니다. 사용자당 미션별 1회입니다.",
        "tag": "퀴즈 오답은 재도전 · 정답·달성에 보상",
        "tone": "yellow"
      },
      {
        "label": "ATTENDANCE",
        "title": "꾸준한 출석은 브론즈",
        "text": "기본 출석과 연속 출석 보상은 브론즈로 지급합니다. 초기 설정은 매일 1장, 연속 7·14·28일에 각각 1·3·7장입니다.",
        "tag": "KST 하루 1회 · 연속 출석 매월 초기화",
        "tone": "pink"
      }
    ]
  },
  {
    "type": "cards",
    "title": "응모권 등급",
    "label": "02 / TICKET GRADES",
    "description": "미션·게임 보상마다 등급을 무작위 결정해 1장 지급 · 가중치는 적용 이벤트에서 사용",
    "cards": [
      {
        "label": "BRONZE",
        "title": "브론즈",
        "text": "미션·게임 보상의 등급 추첨 확률 80%. 브론즈 1장을 차감하면 추첨 가중치 1이 반영됩니다.",
        "tag": "획득 확률 80% · 장당 가중치 1",
        "tone": "mint"
      },
      {
        "label": "SILVER",
        "title": "실버",
        "text": "미션·게임 보상의 등급 추첨 확률 18%. 실버 1장을 차감하면 추첨 가중치 3이 반영됩니다.",
        "tag": "획득 확률 18% · 장당 가중치 3",
        "tone": "yellow"
      },
      {
        "label": "GOLD",
        "title": "골드",
        "text": "미션·게임 보상의 등급 추첨 확률 2%. 골드 1장을 차감하면 추첨 가중치 5가 반영됩니다.",
        "tag": "획득 확률 2% · 장당 가중치 5",
        "tone": "pink"
      }
    ]
  },
  {
    "type": "cards",
    "title": "응모권",
    "label": "02 / TICKETS",
    "description": "모은 등급 응모권을 선택해 사용하고, 장별 이력과 만료·반환을 확인합니다.",
    "cards": [
      {
        "label": "01",
        "title": "획득",
        "text": "기본·연속 출석은 브론즈로 지급합니다. 미션·게임 보상은 등급을 무작위 결정해 응모권 1장을 지급합니다.",
        "tag": "무작위 등급 지급 · 보상 장수는 1장",
        "tone": "mint"
      },
      {
        "label": "02",
        "title": "차감·내역",
        "text": "등급별 사용할 장수를 선택합니다. 일반 가중치 이벤트는 누적 5장까지 사용하고, 월말 소진용 이벤트는 보유량 내에서 사용합니다.",
        "tag": "예: 골드·실버·브론즈 각 1장 → 3장 사용 · 가중치 9",
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
        "활동별 등급 보상과 멤버십 경품 응모 연결"
      ],
      [
        "캐시워크",
        "걷기·챌린지로 캐시 적립",
        "무작위 등급 응모권 · 등급별 선택 사용"
      ],
      [
        "이벤터스",
        "행사 개설 · 참가 신청 · 운영",
        "등급 응모권 보상·경품 응모 운영에 집중"
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
    "description": "활동 후 등급 보상을 받고, 모은 응모권을 골라 쓰는 참여 경험",
    "cards": [
      {
        "label": "RANDOM REWARD",
        "title": "완료 후 열리는 등급 보상",
        "text": "미션 달성과 게임 보상 조건 충족 후 무작위 등급 응모권 1장을 받습니다. 같은 지급 장수에도 브론즈·실버·골드의 획득 경험을 제공합니다.",
        "tag": "브론즈 80% · 실버 18% · 골드 2%",
        "tone": "mint"
      },
      {
        "label": "CHOICE",
        "title": "등급을 골라 응모",
        "text": "보유한 등급별 사용 장수를 직접 선택합니다. 가중치 적용 이벤트에서 브론즈·실버·골드의 장당 가중치 1·3·5를 합산합니다.",
        "tag": "같은 1장이어도 다른 추첨 가중치",
        "tone": "yellow"
      },
      {
        "label": "DAILY",
        "title": "매일 쌓이는 참여",
        "text": "출석은 브론즈 고정 보상, 게임은 게임별 하루 1회, 미션은 미션별 1회 보상으로 일상 참여를 응모권 획득에 연결합니다.",
        "tag": "기본·연속 출석 · 게임 · 퀴즈·설문",
        "tone": "pink"
      },
      {
        "label": "EVENT",
        "title": "모으기부터 원하는 이벤트까지",
        "text": "구매 없이 모은 공통 응모권을 원하는 이벤트에 사용합니다. 응모권 미사용 이벤트도 제공하고, 결과·알림까지 한 흐름으로 연결합니다.",
        "tag": "다양한 활동 → 공통 응모권 → 경품 이벤트",
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
        "role": "공유 요청 빈도 제한용 저장소"
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
    "layout": "image-only",
    "title": "시스템 아키텍처",
    "label": "04 / SYSTEM ARCHITECTURE",
    "description": "",
    "src": "assets/round3-architecture.png",
    "alt": "Vercel 프론트엔드, 브라우저, CloudFront, 내부 ALB, EC2 API 서버 두 대, RDS·Redis, S3, Parameter Store와 Systems Manager의 전체 아키텍처.",
    "caption": ""
  },
  {
    "type": "image",
    "title": "ERD",
    "label": "04 / DATA MODEL",
    "track": "backend",
    "description": "45개 테이블의 전체 데이터 모델 · 이미지를 클릭하면 원본을 확대할 수 있습니다.",
    "src": "assets/round3-erd.png",
    "alt": "docs/GD-212의 2026-10-16 전체 ERD. 도메인별 45개 테이블과 외래 키 관계.",
    "caption": "",
    "layout": "journey",
    "zoomable": true
  },
  {
    "type": "image",
    "layout": "journey",
    "title": "사용자 이용 흐름",
    "label": "05 / USER JOURNEY",
    "description": "출석·미션·게임 → 등급 응모권 획득 → 이벤트 선택·응모 → 당첨 결과 확인",
    "src": "assets/round3-user-journey.svg",
    "alt": "출석은 브론즈, 미션·게임 보상은 무작위 등급 응모권을 얻습니다. 원하는 이벤트에서 보유한 등급별 사용 장수를 선택해 응모하고 발표된 결과를 확인합니다.",
    "caption": ""
  },
  {
    "type": "ending",
    "title": "감사합니다",
    "label": "GETDDO",
    "description": "3차 멘토링"
  }
];
