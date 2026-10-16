import { secondRoundSlides } from './round2.js';
import { thirdRoundSlides } from './round3.js';

// 발표 내용은 이 파일에서 편집합니다. 사용 가능한 레이아웃은 README.md 참고.
export const tracks = {
  frontend: { name: '프론트엔드', english: 'Frontend', short: 'FE', description: '화면 및 API 연동' },
  combined: { name: '통합 발표자료', english: 'Combined', short: 'ALL', description: '공통 · 프론트엔드 · 백엔드' },
  backend: { name: '백엔드', english: 'Backend', short: 'BE', description: 'API 및 데이터 처리' },
};

// 표지·목차·요구사항은 두 트랙이 같은 데이터를 사용합니다.
const commonSlides = [
  {
    type: 'cover', shared: true, title: 'GETDDO\n1차 멘토링', label: 'MENTORING 01',
    description: '출석·미션·게임 기반 이벤트 응모 서비스',
    tags: ['이벤트', '응모권', '관리자'],
  },
  {
    type: 'agenda', shared: true, title: '목차', label: 'CONTENTS', description: '',
    items: [
      { title: '요구사항', description: '이벤트 · 응모권 · 관리자', target: 2 },
    ],
  },
  {
    type: 'cards', shared: true, title: '이벤트', label: '01 / REQUIREMENTS · 이벤트',
    description: '응모권 미사용 이벤트 / 지정 시각에 모집하는 응모권 사용 이벤트',
    cards: [
      { label: '01', title: '응모권 미사용', text: '응모 기간 내 사용자당 1회 응모. 응모권 차감 없이 이벤트 자체에 응모. 마감·검토 후 관리자 수동 추첨.', tag: '응모권 0장 · 사용자당 1회', tone: 'mint' },
      { label: '02', title: '응모권 사용', text: '지정 시각에 모집 시작, 설정된 마감 시각까지 접수. 이벤트당 모집 회차 1개. 마감 후 자동 추첨.', tag: '예: 15:00~15:10 모집 · 시간 설정 가능', tone: 'yellow' },
      { label: '03', title: '가중치·경품 구성', text: '가중치 적용: 여러 장 차감·추가 응모 가능. 미적용: 1장 차감·사용자당 1회. 단일 경품 또는 등수별 여러 경품 구성.', tag: '멤버십 등급별 응모 자격', tone: 'pink' },
    ],
    footnote: '응모자 수·차감 응모권 수 자동 갱신 · 관리자 승인 후 결과 발표 · 자동 추첨 시 미검토 건 처리 정책은 미정',
  },
  {
    type: 'cards', shared: true, title: '응모권', label: '01 / REQUIREMENTS · 응모권',
    description: '이벤트 공통 응모권 · 보유량 및 지급·차감 이력 조회',
    cards: [
      { label: '01', title: '획득', text: '출석: 하루 1장. 일회성 미션: 설문·퀴즈·연속 출석. 게임: 하루 1회 1장 보상.', tag: '주간 미션 보류', tone: 'mint' },
      { label: '02', title: '차감·내역', text: '응모권 사용 이벤트에 응모할 때 차감. 보유량과 지급·차감 내역 확인. 중복 지급 및 보유량 초과 차감 방지.', tag: '응모 기록·차감·이력 함께 처리', tone: 'yellow' },
      { label: '03', title: '만료·반환', text: '월별 잔여 응모권 만료. 이벤트 취소 및 추첨 대상 제외 시 해당 응모의 차감분 반환. 반환·만료 내역 보관.', tag: '반환 시점·유효기간 세부 정책 미정', tone: 'pink' },
    ],
    footnote: '게임 일일 보상의 전체 합산·게임별 기준 미정 · 부정 획득 응모권은 별도 회수 정책 적용',
  },
  {
    type: 'cards', shared: true, title: '관리자', label: '01 / REQUIREMENTS · 관리자',
    description: '이벤트·보상 운영, 추첨 결과 관리 및 어뷰징 검토',
    cards: [
      { label: '01', title: '운영 관리', text: '이벤트·경품·응모 조건 설정. 출석·미션·게임 보상 관리. 배너 등록·수정·삭제. 이벤트 중단·재개·취소.', tag: '중단: 일시 정지 / 취소: 최종 종료', tone: 'mint' },
      { label: '02', title: '추첨·결과 발표', text: '당첨자 및 추첨 이력 조회·재현. 사유를 기록한 수동 재추첨. 관리자 승인 후 결과 공개 및 응모자 알림.', tag: '알림함 · 읽음 처리 · 모의 발송', tone: 'yellow' },
      { label: '03', title: '어뷰징 검토', text: '의심 응모 확인 후 참여 허용 또는 추첨 대상 제외. 부정 획득 응모권 회수. 처리 사유·담당자·이력 기록.', tag: '일반 응모권 임의 지급·잔액 수정 제외', tone: 'pink' },
    ],
    footnote: '미션 인증 제출·관리자 승인 기능 제외 · 부정 획득분 회수는 최신 백오피스 항목 기준, 6절 제외 문구 정리 필요',
  },
];

// 사용자 제공 기획 내용을 두 트랙에서 공유.
const overviewSlides = [
  {
    type: 'cards', shared: true, title: '프로젝트 개요', label: 'OVERVIEW / GOAL',
    description: 'LG유플러스 사이트와 결합하는 멤버십 응모 이벤트 플랫폼',
    cards: [
      { label: 'GOAL', title: '참여와 응모', text: '출석·미션·게임으로 응모권 획득. 응모권 사용 이벤트에 차감해 응모하거나, 미사용 이벤트에 무료 참여.', tag: '구매·결제 연계 없는 참여', tone: 'mint' },
      { label: 'TARGET', title: '기존 가입자 전체', text: '모든 멤버십 등급을 잠재 사용자로 설정. 신규 회원 모집이나 특정 등급에 한정하지 않고, 이벤트별 자격은 개별 설정.', tag: 'LG유플러스 멤버십 가입자', tone: 'yellow' },
      { label: 'USER', title: '일상·한정 시간 참여', text: '꾸준히 응모권을 모으는 사용자, 지정 시각 이벤트에 응모하는 사용자, 추첨 결과와 선정 과정을 확인하고 싶은 사용자.', tag: '앱·웹을 통한 반복 참여', tone: 'pink' },
    ],
    footnote: '서비스 기획 목표 · 실제 사이트·멤버십 연동 범위는 추가 예정',
  },
  {
    type: 'split', shared: true, title: '문제 정의', label: 'OVERVIEW / PROBLEM',
    description: '추첨 근거와 응모권 변동을 확인할 수 있는 기록',
    columns: [
      { label: 'DRAW', title: '선정 근거 확인', paragraphs: ['어떤 대상·조건으로 당첨자가 정해졌는지 확인하기 어려움.', '같은 입력으로 결과를 다시 확인할 자료가 없으면, 이의 제기 시 근거를 제시하기 어려움.'] },
      { label: 'TICKET', title: '보유량과 이력 일치', paragraphs: ['응모권 지급·차감 기록과 보유량이 어긋나면 사용 가능 수량을 설명하기 어려움.', '운영자도 문의·취소·반환 처리의 근거가 필요.'] },
    ],
    footnote: '프로젝트가 해결하려는 문제 가설 · 특정 서비스에서 확인된 결함을 뜻하지 않음',
  },
  {
    type: 'cards', shared: true, title: '해결 방향', label: 'OVERVIEW / APPROACH',
    description: '추첨 재현 자료 · 누적 이력 · 공개 시점 · 운영 판단 기록',
    cards: [
      { label: '01', title: '추첨 재현', text: '응모자·응모권 수·가중치·조건 스냅샷 보관. 시드 또는 추첨 키, 입력 순서·버전을 기록해 결과와 당첨 순서 대조.', tag: '관리자 사후 재현·검증', tone: 'mint' },
      { label: '02', title: '응모권 이력', text: '지급·차감 이력은 수정·삭제 없이 누적. 이력 합계와 보유량 일치. 취소 반환도 별도 이력으로 반영.', tag: '잔액과 변동 근거 함께 보관', tone: 'yellow' },
      { label: '03', title: '결과 공개', text: '발표 전 결과 비공개. 관리자 발표 승인 후 마스킹한 당첨자 명단과 경품 공개.', tag: '추첨 확정과 공개 시점 구분', tone: 'pink' },
      { label: '04', title: '검토·재추첨', text: '어뷰징은 자동 제외 없이 관리자 판단·사유 기록. 발표 후 문제 당첨만 취소하고 재추첨 이력을 최초 추첨과 연결.', tag: '처리 사유와 변경 이력 보존', tone: 'mint' },
    ],
  },
  {
    type: 'comparison', shared: true, title: '유사 서비스 분석', label: 'OVERVIEW / COMPARISON',
    description: '팀 제공 분석 요약 · 참여 구조와 비교할 지점',
    rows: [
      ['SKT T멤버십', '멤버십 등급별 혜택 · 이벤트', '전 등급 대상의 응모 중심 동선'],
      ['캐시워크', '일상 활동 리워드 · 반복 참여', '응모권 획득부터 이벤트 응모까지 연결'],
      ['이벤터스', '행사 등록 · 범용 이벤트 운영', '브랜드 멤버십 · 출석·미션·게임 결합'],
      ['커머스 경품 이벤트', '구매·리뷰 등 행동 연계 응모', '구매·결제 없는 무료 참여 구조'],
    ],
    footnote: '각 서비스의 현행 혜택·추첨 공개 범위는 출처 확인 필요 · 내부 재현·검증 기능 부재를 단정하지 않음',
  },
  {
    type: 'cards', shared: true, title: '차별점', label: 'OVERVIEW / DIFFERENCE',
    description: '응모권 데이터 정합성과 운영자까지 이어지는 서비스 화면',
    cards: [
      { label: 'DRAW', title: '재현 가능한 추첨', text: '동일 입력·조건으로 결과를 재현하고 원본과 대조. 당첨 취소·재추첨도 최초 실행과 연결.', tag: '운영자가 확인할 근거 보존', tone: 'mint' },
      { label: 'LEDGER', title: '응모권 이력 관리', text: '수정·삭제 없는 누적 이력과 잔액 일치. 문의·분쟁·반환 처리에 사용할 변동 근거 확보.', tag: '백엔드 · 정합성과 처리 기록', tone: 'yellow' },
      { label: 'EVENT', title: '두 가지 응모 방식', text: '응모권 미사용형과 지정 시간 차감형 구분. 가중치 적용 여부를 이벤트별 설정. 참여 화면부터 백오피스까지 구성.', tag: '프론트 · 사용자·운영자 UI', tone: 'pink' },
    ],
    footnote: '프로젝트 설계 목표 · 추첨 재현 가능성과 알고리즘의 공정성 검증은 별도',
  },
];

// 백엔드 발표: 구현 확인이 필요한 항목은 추가 예정으로 유지.
const makeBackendSlides = () => [
  commonSlides[0],
  {
    type: 'agenda', title: '목차', label: 'CONTENTS', description: '',
    items: [
      { title: '프로젝트 개요', description: '범위 · 진행 상태', target: 2 },
      { title: '요구사항', description: '이벤트 · 응모권 · 관리자', target: 9 },
      { title: '기술 스택', description: '설정 파일 기준 · 미정 항목', target: 12 },
      { title: '핵심 처리 흐름', description: '응모 · 추첨 · 결과 발표', target: 13 },
    ],
  },
  ...overviewSlides,
  {
    type: 'cards', title: '시연 범위', label: 'DEMO SCOPE',
    description: '출석·미션·게임으로 받은 응모권을 사용하는 이벤트 응모 서비스',
    cards: [
      { label: 'SERVICE', title: '사용자·관리자', text: '사용자: 응모권 획득, 이벤트 응모, 결과 확인. 관리자: 이벤트·경품 운영, 어뷰징 검토, 추첨 결과 발표.', tag: '응모권 미사용·사용 이벤트', tone: 'mint' },
      { label: 'SCOPE', title: '시연 범위', text: '고정 ID의 가상 사용자와 더미 데이터로 시연. 관리자 기능은 별도 인증. 실제 결제·배송·외부 알림 발송 제외.', tag: '주간 미션 보류 · 알림 모의 발송', tone: 'yellow' },
    ],
  },
  {
    type: 'cards', title: '진행 상태', label: 'STATUS',
    description: '현재 자료에 반영된 내용과 추가할 자료',
    cards: [
      { label: 'REQUIREMENTS', title: '요구사항 정리', text: '이벤트·응모권·관리자 기능 정리. 자동 추첨 시 미검토 건, 중단·재개 조건, 월 경계 반환 정책은 확인 필요.', tag: '정리된 범위와 미정 정책 구분', tone: 'mint' },
      { label: 'DESIGN', title: '설계 자료', text: '시스템 아키텍처, ERD, 기술 선택 근거, 상세 트랜잭션 경계와 연동 방식.', tag: '진행 중', tone: 'yellow' },
      { label: 'IMPLEMENTATION', title: '구현·검증 현황', text: '완료·진행 중 기능, 담당 범위, 개발 일정, 시연 화면 및 테스트 결과.', tag: '팀 진행 현황 확인 후 추가 예정', tone: 'pink' },
    ],
    footnote: '기능별 구현 완료 여부는 미확인 · 다음 처리 흐름은 요구사항 기준',
  },
  ...commonSlides.slice(2, 5),
  {
    type: 'tech', title: '기술 스택', label: '02 / TECH STACK',
    description: '언어 · 서버 · 데이터 저장 · 빌드',
    items: [
      { icon: 'java', name: 'Java', version: '21', role: '서버 개발 언어' },
      { icon: 'spring', name: 'Spring Boot', version: '4.1.1', role: 'Spring MVC · Validation' },
      { icon: 'mysql', name: 'MySQL', role: '관계형 데이터베이스' },
      { icon: 'redis', name: 'Redis', role: '도입 예정 · 적용 용도 추가 예정' },
      { icon: 'spring', name: 'Spring Data JPA', role: '데이터 접근' },
      { icon: 'flyway', name: 'Flyway', role: 'DB 스키마 변경 관리' },
      { icon: 'gradle', name: 'Gradle', version: '9.7.1', role: '빌드 도구' },
    ],
    notesTitle: '확인할 항목',
    notes: [
      { title: 'MySQL · Redis', text: '사용 기술 확정 · 버전 및 Redis 적용 범위 추가 예정' },
      { title: '배포·외부 연동', text: 'Docker · HTTPS · 객체 저장소는 요구사항. 실제 구성 추가 예정.' },
      { title: '선택 근거', text: '기술 선택 이유 · 대안 비교 추가 예정' },
    ],
    footnote: 'MySQL·Redis는 팀 선택 반영 · 나머지 버전은 저장소 설정 기준 · 실제 연동 완료 여부는 별도 확인',
  },
  {
    type: 'architecture', title: '응모 처리 흐름', label: '03 / ENTRY FLOW',
    description: '요구사항 기준 · 상세 처리 순서와 동시성 제어 방식 추가 예정',
    nodes: [
      { title: '접수 조건', subtitle: '응모 자격 · 모집 기간', detail: '멤버십 · 횟수 제한 · 중복 요청' },
      { title: '응모·차감', subtitle: '응모 기록 · 응모권 · 이력', detail: '함께 성공 또는 함께 실패' },
      { title: '실시간 응모 현황', subtitle: '응모자 수 · 응모권 사용량', detail: '자동 갱신 · 응모 직후 반영' },
    ],
    notes: [
      ['정합성 기준', '중복 응모 반영·초과 차감 방지. 미사용 이벤트는 차감 없이 응모.'],
      ['요구사항의 초기 방안', 'DB 트랜잭션 · 유일 제약 · 조건부 차감. 실제 설계·구현 자료 추가 예정.'],
      ['실시간 표시', '중복을 제외한 응모자 수, 전체·본인 차감 응모권 수 표시. 갱신 방식·주기 추가 예정.'],
    ],
    footnote: '실제 호출 순서도·트랜잭션 범위·실패 시 처리 상세 추가 예정',
  },
  {
    type: 'architecture', title: '추첨·결과 발표 흐름', label: '03 / DRAW FLOW',
    description: '추첨 결과 확정과 사용자에게 결과를 공개하는 시점 구분',
    nodes: [
      { title: '마감·대상 확정', subtitle: '유효 응모 · 제외 결과 반영', detail: '추첨 대상 및 조건 스냅샷 보관' },
      { title: '추첨·결과 확정', subtitle: '미사용: 수동 / 사용: 자동', detail: '실행별 중복 확정 방지 · 이력 보존' },
      { title: '관리자 발표', subtitle: '결과 공개 · 알림 작업 등록', detail: '접속 사용자 화면에 결과 실시간 반영' },
    ],
    notes: [
      ['발표 전 비공개', '관리자 승인 후 결과 공개. 전체 알림 생성 완료를 기다리지 않음.'],
      ['요구사항의 처리 기준', '발표 상태 변경과 알림 작업 등록을 같은 트랜잭션으로 처리.'],
      ['실시간 결과', '발표 승인 후 접속 사용자 화면에 결과 반영. 재접속 시 결과 조회 API로 확인.'],
    ],
    footnote: '결과 전달 방식·재연결 처리·추첨 상세 구조 추가 예정 · 알림은 비동기 생성 및 실패 시 재시도',
  },
  { type: 'ending', shared: true, title: '감사합니다', label: 'GETDDO', description: '1차 멘토링' },
];

const makeSlides = (track) => {
  if (track === 'backend') return makeBackendSlides();
  return [
    ...commonSlides.map(slide => slide.type === 'agenda' ? {
      ...slide, shared: false,
      items: [
        { title: '프로젝트 개요', description: '목표 · 문제 · 유사 서비스 · 차별점', target: 2 },
        { ...slide.items[0], target: 7 },
        { title: '디자인 시스템', description: '브랜드 컬러 · 응모권 · 놀이', target: 10 },
        { title: '마스코트', description: '타코야끼 · 채택 이유', target: 11 },
        { title: '게임 컨셉', description: '게임 후보 · 플레이 흐름 · 보상', target: 12 },
        { title: '기술 스택', description: '기본·상태 · UI·입력 · 모션 · 개발 도구', target: 13 },
      ],
    } : slide).flatMap((slide, index) => index === 2 ? [...overviewSlides, slide] : [slide]),
    {
      type: 'palette', title: '디자인 시스템', label: '02 / DESIGN SYSTEM',
      description: '브랜드는 마젠타 · 응모권은 옐로 · 놀이는 파스텔',
      footnote: '마젠타 #E6007E · 보조 색상은 사용 방향을 보여주는 예시',
    },
    {
      type: 'mascot', title: '마스코트 — 타코야끼', label: '03 / MASCOT',
      description: '응모·추첨과 놀이를 연결하는 서비스 캐릭터',
      reasons: [
        { title: '추첨공을 닮은 모양', text: '동그란 형태로 응모·추첨 서비스의 컨셉 표현' },
        { title: '무너의 친구', text: '유플러스 캐릭터 ‘무너’의 친구라는 설정으로 브랜드와 연결' },
      ],
    },
    {
      type: 'cards', title: '게임 컨셉', label: '04 / GAME CONCEPT',
      description: '게임 종류는 미확정 · 후보와 화면 흐름 검토',
      cards: [
        { label: 'CONCEPT', title: '타코야끼 만들기', text: '요구사항에 나온 게임 후보. 조작 방식, 성공·실패 조건, 제한 시간과 난이도는 추가 예정.', tag: '후보 · 확정 게임 아님', tone: 'mint' },
        { label: 'PLAY FLOW', title: '플레이 흐름', text: '게임 선택 → 규칙 안내 → 플레이 → 점수 확인 → 보상 확인. 화면 흐름 초안이며 세부 규칙은 미정.', tag: '플레이 횟수 제한 없음', tone: 'yellow' },
        { label: 'REWARD', title: '점수·보상', text: '점수는 서버 판정. 개인 최고점·누적 점수 보관. 하루 1회 응모권 1장 보상, 획득 조건과 적용 단위는 미정.', tag: '전체 게임 합산·게임별 기준 확인 필요', tone: 'pink' },
        { label: 'SCREEN', title: '화면·연동', text: '플레이 화면, 조작 안내, 결과·재도전 화면 추가 예정. 이탈·중복 결과 제출·오류 시 처리 방식 검토.', tag: '와이어프레임 · 디자인 · API 연동 추가 예정', tone: 'mint' },
      ],
      footnote: '멘토링 확인: 조작·난이도 범위, 점수 검증 및 클라이언트·서버 역할, 플레이 중 이탈·재시도 처리',
    },
    {
      type: 'tech', title: '기술 스택', label: '05 / TECH STACK · 1/4',
      description: '기본 · 상태 관리',
      items: [
        { icon: 'typescript', name: 'TypeScript', role: '개발 언어' },
        { icon: 'react', name: 'React', role: 'UI 컴포넌트' },
        { icon: 'vitejs', name: 'Vite', role: '개발 서버 · 빌드' },
        { icon: 'reactrouter', name: 'React Router', role: '페이지 라우팅' },
        { icon: 'tanstack', name: 'TanStack Query', role: '서버 상태 · 데이터 요청' },
        { icon: 'zustand', name: 'Zustand', role: '클라이언트 상태 관리' },
        { icon: 'redux', name: 'Redux Toolkit', role: '전역 상태 관리' },
      ],
      notesTitle: '사용 역할',
      notes: [
        { title: '상태 관리', text: 'Zustand · Redux Toolkit의 담당 범위 추가 예정' },
        { title: '서버 데이터', text: 'TanStack Query로 요청·캐시 관리' },
      ],
      footnote: '팀 제공 기술 목록 · 버전 및 세부 적용 범위 추가 예정',
    },
    {
      type: 'tech', title: '기술 스택 · UI·입력', label: '05 / TECH STACK · 2/4',
      description: '스타일 · 표 · 날짜 · 폼',
      items: [
        { icon: 'tailwindcss', name: 'TailwindCSS', role: '유틸리티 기반 스타일' },
        { icon: 'shadcnui', name: 'shadcn/ui', role: 'UI 컴포넌트' },
        { icon: 'tanstack', name: 'TanStack Table', role: '테이블 상태 · 데이터 표현' },
        { icon: 'calendar-days', name: 'react-day-picker', role: '날짜 선택' },
        { icon: 'reacthookform', name: 'React Hook Form', role: '폼 상태 · 입력 처리' },
        { icon: 'zod', name: 'Zod', role: '스키마 · 입력 검증' },
      ],
      notesTitle: '사용 역할',
      notes: [
        { title: '화면 구성', text: '공통 UI · 테이블 · 날짜 선택' },
        { title: '입력 처리', text: '폼 상태와 스키마 검증' },
      ],
      footnote: '팀 제공 기술 목록 · 버전 및 세부 적용 범위 추가 예정 · 날짜·색종이 아이콘은 기능 표현',
    },
    {
      type: 'tech', title: '기술 스택 · 모션', label: '05 / TECH STACK · 3/4',
      description: '애니메이션 · 참여 효과',
      items: [
        { icon: 'gsap', name: 'GSAP', role: '타임라인 애니메이션' },
        { icon: 'framer', name: 'Framer Motion', role: '컴포넌트 모션 · 화면 전환' },
        { icon: 'party-popper', name: 'canvas-confetti', role: '색종이 효과' },
      ],
      notesTitle: '사용 역할',
      notes: [
        { title: '참여 화면', text: '게임·응모 화면의 움직임과 효과' },
        { title: '적용 범위', text: 'GSAP · Framer Motion 사용 범위 추가 예정' },
      ],
      footnote: '팀 제공 기술 목록 · 버전 및 세부 적용 범위 추가 예정 · 날짜·색종이 아이콘은 기능 표현',
    },
    {
      type: 'tech', title: '기술 스택 · 개발 도구', label: '05 / TECH STACK · 4/4',
      description: 'API 모킹 · 테스트 · 디버깅',
      items: [
        { icon: 'mockserviceworker', name: 'MSW', role: 'API 응답 모킹' },
        { icon: 'vitest', name: 'Vitest', role: '테스트 실행' },
        { icon: 'testinglibrary', name: 'React Testing Library', role: '사용자 동작 중심 UI 테스트' },
        { icon: 'react', name: 'React DevTools', role: '컴포넌트 확인 · 디버깅' },
      ],
      notesTitle: '사용 역할',
      notes: [
        { title: '개발 중 확인', text: '모킹으로 API 응답 상황 재현' },
        { title: '화면 검증', text: '컴포넌트 동작 확인 · 디버깅' },
      ],
      footnote: '팀 제공 기술 목록 · 버전 및 세부 적용 범위 추가 예정',
    },
    {
      type: 'ending', shared: true, title: '감사합니다', label: 'GETDDO',
      description: '1차 멘토링',
    },
  ];
};

// 공통 슬라이드는 한 번만, 개별 내용은 원본 트랙에서 가져옵니다.
const makeCombinedSlides = () => {
  const frontend = makeSlides('frontend');
  const backend = makeSlides('backend');
  const specific = (slides, track) => slides
    .filter(slide => !slide.shared && !['agenda', 'questions'].includes(slide.type))
    .map(slide => ({ ...slide, track }));
  const slides = [
    commonSlides[0],
    { type: 'agenda', title: '목차', label: 'CONTENTS', description: '공통 · 프론트엔드 · 백엔드', items: [] },
    ...overviewSlides,
    ...commonSlides.slice(2, 5),
    ...specific(frontend, 'frontend'),
    ...specific(backend, 'backend').filter(slide => slide.type === 'tech'),
    ...specific(backend, 'backend').filter(slide => slide.type !== 'tech'),
    frontend.at(-1),
  ];
  slides[1].items = [
    ['프로젝트 개요', '목표 · 문제 · 유사 서비스 · 차별점', '프로젝트 개요'],
    ['요구사항', '이벤트 · 응모권 · 관리자', '이벤트'],
    ['프론트엔드', '디자인 · 마스코트 · 게임 · 기술', '디자인 시스템'],
    ['백엔드', '기술 스택 · 시연 범위 · 진행 상태', '기술 스택'],
    ['핵심 처리 흐름', '응모 · 추첨 · 실시간 결과', '응모 처리 흐름'],
  ].map(([title, description, destination]) => ({ title, description, target: slides.findIndex(slide => slide.title === destination && (title !== '백엔드' || slide.track === 'backend')) }));
  return slides;
};

// 2·3차는 통합 자료를 사용합니다.
export const rounds = [
  { id: '1', title: '1차 멘토링', subtitle: '요구사항 및 설계', description: '이벤트 · 응모권 · 관리자', stage: 'FOUNDATION', decks: {
    frontend: { enabled: true, slides: makeSlides('frontend') },
    backend: { enabled: true, slides: makeSlides('backend') },
    combined: { enabled: true, slides: makeCombinedSlides() },
  } },
  { id: '2', title: '2차 멘토링', subtitle: '구현 진행 사항', description: '프론트엔드 · 백엔드 통합 발표', stage: 'BUILD & REFINE', decks: {
    combined: { enabled: true, slides: secondRoundSlides },
  } },
  { id: '3', title: '3차 멘토링', subtitle: '서비스 소개와 최신 설계', description: '프로젝트 · 주요 기능 · 설계·구현 현황', stage: 'REVIEW & GROW', decks: {
    frontend: { enabled: false, slides: [] }, backend: { enabled: false, slides: [] }, combined: { enabled: true, slides: thirdRoundSlides },
  } },
];
