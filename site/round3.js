// 기준: getddo-spec main 00f16aa (2026-10-16), getddo-be dev 88833ce.
// 프론트: getddo-fe dev cc1ea7b의 package.json 선언 범위 기준.
// 인프라 상태는 백엔드의 2026-10-14~15 배포 기록 기준이며 실시간 운영 확인이 아니다.
export const thirdRoundSlides = [
  {
    type: 'image', layout: 'journey', title: '시스템 아키텍처', label: '01 / SYSTEM ARCHITECTURE',
    description: '애플리케이션 · 데이터 · 배포 흐름과 후속 인프라 구성',
    src: 'assets/round3-architecture.svg', alt: '브라우저, Vercel 프론트, EC2 Spring Boot, RDS 및 S3·SSM 배포 흐름. 후속 HTTPS·Redis·확장 구성은 별도 표시.',
  },
  {
    type: 'image', layout: 'journey', title: 'ERD', label: '02 / ENTITY RELATIONSHIP',
    description: '응모권 한 장과 변경 이력 · 응모 접수·거절 · 추첨 스냅샷 · 관리자 수동 공개',
    src: 'assets/round3-erd.svg', alt: '전체 45개 테이블 중 사용자, 응모권, 응모, 이벤트, 추첨, 결과 공개의 핵심 12개 테이블 관계 요약.',
  },
  {
    type: 'tech', title: '기술 스택', label: '03 / TECH STACK',
    description: '프론트·백엔드 dev 설정 기준 · 인프라는 현재 구성과 후속 계획 구분',
    items: [
      { track: 'frontend', icon: 'react', name: 'React · TypeScript', version: '19 / 6', role: 'UI 컴포넌트 · 타입 검사' },
      { track: 'backend', icon: 'spring', name: 'Spring Boot · Java', version: '4.1.1 / 21', role: 'HTTP API · 도메인 서비스' },
      { track: 'frontend', icon: 'vitejs', name: 'Vite · React Router', version: '8 / 7', role: '개발·빌드 · 페이지 라우팅' },
      { track: 'backend', icon: 'mysql', name: 'MySQL · Spring Data JPA', version: '8.4', role: 'RDS 저장 · 트랜잭션 · 영속성' },
      { track: 'frontend', icon: 'tanstack', name: 'TanStack Query · Zustand', role: '서버 상태 · 클라이언트 상태' },
      { track: 'backend', icon: 'flyway', name: 'Flyway · Gradle', role: '스키마 버전 관리 · 빌드·테스트' },
      { track: 'frontend', icon: 'tailwindcss', name: 'Tailwind CSS · shadcn/ui', role: '스타일 · 공통 UI 컴포넌트' },
      { track: 'backend', icon: 'layers', name: 'Docker · GitHub Actions', role: '컨테이너 · CI/CD · S3/SSM 배포' },
    ],
    notesTitle: '배포와 후속 구성',
    notes: [
      { title: 'Frontend / Backend', text: 'Vercel / AWS EC2 · 비공개 RDS' },
      { title: 'HTTPS · 이미지', text: 'CloudFront · ALB · S3 이미지 저장은 준비·검증 단계' },
      { title: 'Redis', text: '도입 준비. 현재 요청 제한 기본 구현은 서버 메모리.' },
    ],
  },
];
