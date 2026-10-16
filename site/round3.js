// 기준: getddo-spec main 00f16aa (2026-10-16), getddo-be dev 88833ce.
// 프론트: getddo-fe dev cc1ea7b의 package.json 선언 범위 기준.
// 인프라 상태는 백엔드의 2026-10-14~15 배포 기록 기준이며 실시간 운영 확인이 아니다.
export const thirdRoundSlides = [
  {
    type: 'cover', title: 'GETDDO\n3차 멘토링', label: 'MENTORING 03',
    description: '멤버십 이벤트 플랫폼 · 시스템 설계',
    tags: ['시스템 아키텍처', 'ERD', '기술 스택'],
  },
  {
    type: 'agenda', title: '목차', label: 'CONTENTS',
    description: '시스템 구성과 데이터 모델, 주요 기술을 소개합니다.',
    items: [
      { title: '시스템 아키텍처', description: '애플리케이션 · 데이터 · 배포 구성', target: 2 },
      { title: 'ERD', description: '핵심 엔티티 · 데이터 관계', target: 3 },
      { title: '기술 스택', description: '프론트엔드 · 백엔드 주요 기술', target: 4 },
    ],
  },
  {
    type: 'image', layout: 'diagram', title: '시스템 아키텍처', label: '01 / SYSTEM ARCHITECTURE',
    description: 'EC2 한 대와 비공개 RDS를 사용하고, S3·SSM으로 배포합니다. CloudFront·ALB·Redis와 서버 확장은 후속 준비 단계입니다.',
    src: 'assets/round3-architecture.svg', alt: '기존 AWS 영역도 형식으로 표현한 Web Client, VPC, 가용 영역, EC2, 비공개 RDS, S3 배포 이미지와 Systems Manager 구성.',
  },
  {
    type: 'image', title: 'ERD', label: '02 / DATA MODEL',
    description: '사용자·이벤트·응모권·응모·추첨을 중심으로 주요 엔티티와 관계 설명',
    src: 'assets/round3-erd.svg', alt: '전체 45개 테이블 중 사용자, 응모권, 응모, 이벤트, 추첨, 결과 공개의 핵심 12개 테이블 관계 요약.',
  },
  {
    type: 'tech', title: '기술 스택', label: '03 / TECH STACK',
    description: '프론트엔드·백엔드의 주요 기술과 역할',
    items: [
      { icon: 'react', track: 'frontend', name: 'React · TypeScript', role: '화면 개발 · Vite 빌드' },
      { icon: 'spring', track: 'backend', name: 'Spring Boot · Java', role: 'API · 비즈니스 로직' },
      { icon: 'tanstack', track: 'frontend', name: 'TanStack Query', role: '서버 상태 · API 연동' },
      { icon: 'mysql', track: 'backend', name: 'JPA · MySQL', role: '데이터 저장 · 트랜잭션' },
      { icon: 'tailwindcss', track: 'frontend', name: 'Tailwind · shadcn/ui', role: 'UI 스타일 · 컴포넌트' },
      { icon: 'redis', track: 'backend', name: 'Redis', role: '도입 준비 · 서비스 연동 검증 예정' },
      { icon: 'flyway', track: 'backend', name: 'Flyway · Gradle', role: 'DB 스키마 변경 · 빌드' },
    ],
    notesTitle: '주요 보조 도구',
    notes: [
      { title: '상태·입력', text: 'Zustand · Redux Toolkit · React Hook Form · Zod' },
      { title: '모션·검증', text: 'GSAP · Framer Motion · Vitest · Testing Library · MSW' },
      { title: '배포·인프라', text: 'Vercel · Docker · GitHub Actions · EC2 · RDS · S3 · SSM' },
    ],
  },
  { type: 'ending', title: '감사합니다', label: 'GETDDO', description: '3차 멘토링' },
];
