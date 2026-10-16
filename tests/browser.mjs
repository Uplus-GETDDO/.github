import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { rounds } from '../site/content.js';

const { frontend, backend, combined } = rounds[0].decks;
assert.deepEqual(frontend.slides[0], backend.slides[0]);
assert.deepEqual(frontend.slides.slice(7, 10), backend.slides.slice(9, 12));
for (const deck of [frontend, backend, combined]) {
  assert.equal(deck.slides.some(slide => ['아키텍처', '시스템 아키텍처', 'ERD'].includes(slide.title)), false);
}
assert.equal(backend.slides.find(slide => slide.title === '진행 상태').cards.find(card => card.title === '설계 자료').tag, '진행 중');
assert.equal(backend.slides.find(slide => slide.type === 'tech').items.find(item => item.name === 'Gradle').role, '빌드 도구');
assert.equal(backend.slides.some(slide => slide.title === '검증 계획'), false);
assert.deepEqual(frontend.slides.slice(7, 10).map(slide => slide.title), ['이벤트', '응모권', '관리자']);
for (const deck of [frontend, backend]) {
  assert.deepEqual(deck.slides[1].items.map(item => item.title), deck === frontend ? ['프로젝트 개요', '요구사항', '디자인 시스템', '마스코트', '게임 컨셉', '기술 스택'] : ['프로젝트 개요', '요구사항', '기술 스택', '핵심 처리 흐름']);
  assert.equal(deck.slides.at(-1).title, '감사합니다');
  assert.equal(deck.slides.at(-1).type, 'ending');
  for (const item of deck.slides[1].items) {
    assert.ok(deck.slides[item.target], `Missing agenda target: ${item.title}`);
  }
  const stack = deck.slides[1].items.find(item => item.title === '기술 스택');
  assert.equal(deck.slides[stack.target].title, '기술 스택');
}
assert.equal(combined.slides.length, 23);
const lastFrontendStack = combined.slides.findLastIndex(slide => slide.type === 'tech' && slide.track === 'frontend');
assert.equal(combined.slides[lastFrontendStack + 1].type, 'tech');
assert.equal(combined.slides[lastFrontendStack + 1].track, 'backend');
assert.equal(combined.slides[1].items.find(item => item.title === '백엔드').target, lastFrontendStack + 1);
for (const slide of frontend.slides.filter(slide => slide.shared)) {
  assert.equal(combined.slides.filter(item => item.title === slide.title).length, 1);
}
for (const item of combined.slides[1].items) assert.ok(item.target > 1);
for (const deck of [frontend, backend, combined]) assert.equal(deck.slides.some(slide => slide.type === 'questions'), false);
const feNames = frontend.slides.filter(slide => slide.type === 'tech').flatMap(slide => slide.items.map(item => item.name));
assert.equal(feNames.length, 20);
assert.equal(new Set(feNames).size, 20);
assert.deepEqual(combined.slides.filter(slide => slide.type === 'tech' && slide.track === 'frontend').flatMap(slide => slide.items.map(item => item.name)), feNames);
console.log('PASS shared cover/agenda/requirements, event/ticket/admin sections, agenda destinations');

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../site');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
let overrideContent = null;
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  path = path.replace(/^\/\.github\//, '/');
  if (path.endsWith('/')) path += 'index.html';
  const file = resolve(root, `.${path}`);
  if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  try {
    const data = file === resolve(root, 'content.js') && overrideContent ? overrideContent : await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'text/plain; charset=utf-8' }).end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
let browser;
let checks = 0;
const pass = name => { checks++; console.log(`PASS ${name}`); };
try {
  browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()}: ${response.url()}`); });
  const base = `http://127.0.0.1:${server.address().port}/.github/`;
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('.round-card').count(), 3);
  assert.equal(await page.locator('.track-links a').count(), 5);
  assert.equal(await page.locator('.track-links button:disabled').count(), 2);
  assert.equal(await page.locator('.round-card').nth(1).locator('.track-links > *').count(), 1);
  assert.equal(await page.locator('.round-card').nth(1).locator('.track-links a').getAttribute('href'), '#/mentoring/2/combined/1');
  assert.equal(await page.locator('.brand img').evaluate(img => img.complete && img.naturalWidth > 0), true);
  pass('3 rounds, 5 active tracks, 2 locked tracks; logo and project-path assets');
  await page.locator('.track-links a').first().click();
  await page.waitForSelector('.slide-cover');
  assert.match(await page.title(), /프론트엔드/);
  await page.locator('.skip-link').focus();
  await page.keyboard.press('Enter');
  assert.match(page.url(), /frontend\/1$/);
  assert.equal(await page.locator('#main').evaluate(el => el === document.activeElement), true);
  pass('skip link focuses current presentation without changing route');
  assert.equal(await page.locator('[data-action=prev]').isDisabled(), true);
  await page.keyboard.press('ArrowRight');
  await page.waitForSelector('.slide-agenda');
  await page.locator('.agenda-item').filter({ hasText: '요구사항' }).click();
  await page.waitForSelector('.slide-cards');
  assert.match(await page.locator('.slide').innerText(), /지정 시각에 모집/);
  await page.keyboard.press('End');
  await page.waitForSelector('.slide-ending');
  assert.equal(await page.locator('[data-action=next]').isDisabled(), true);
  await page.keyboard.press('ArrowRight');
  assert.match(page.url(), /frontend\/18$/);
  await page.keyboard.press('Home');
  await page.waitForSelector('.slide-cover');
  await page.locator('[data-action=next]').click();
  await page.waitForSelector('.slide-agenda');
  await page.goBack();
  await page.waitForSelector('.slide-cover');
  pass('frontend navigation, agenda links, first/last limits, browser Back');
  await page.goto(`${base}#/mentoring/1/frontend/2`);
  await page.locator('.agenda-item').filter({ hasText: '게임 컨셉' }).click();
  await page.waitForSelector('.slide-cards');
  assert.equal(await page.locator('.slide-heading h1').innerText(), '게임 컨셉');
  assert.match(await page.locator('.slide').innerText(), /후보 · 확정 게임 아님/);
  assert.match(await page.locator('.slide').innerText(), /추가 예정/);
  await page.goto(`${base}#/mentoring/1/frontend/1`);
  await page.waitForSelector('.slide-cover');
  pass('frontend game concept linked with candidate and pending labels');
  await page.locator('.deck-header [data-action=fullscreen]').click();
  await page.waitForFunction(() => Boolean(document.fullscreenElement));
  await page.keyboard.press('ArrowRight');
  await page.waitForSelector('.slide-agenda');
  assert.equal(await page.evaluate(() => Boolean(document.fullscreenElement)), true);
  await page.locator('.fullscreen-exit').click();
  await page.waitForFunction(() => !document.fullscreenElement);
  pass('native fullscreen stays active on slide change and exits by button');
  for (const round of rounds) for (const track of ['combined', 'frontend', 'backend']) {
    const deck = round.decks[track];
    if (!deck?.enabled) continue;
    for (let i = 1; i <= deck.slides.length; i++) {
      await page.goto(`${base}#/mentoring/${round.id}/${track}/${i}`);
      await page.waitForSelector('.slide');
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('.slide-footnote').count(), 0);
      const overflow = await page.locator('.slide').evaluate(slide => {
        const footer = slide.querySelector('.slide-footer').getBoundingClientRect();
        const content = slide.querySelector('.slide-content');
        const bounds = slide.getBoundingClientRect();
        return [...content.querySelectorAll('h1,h2,h3,p,li,td,.ticket-mascot,.ending-mascot,.mascot-layout>img,.image-layout img,.content-card,.arch-node,.agenda-item,.tech-entry,.tech-notes')].filter(el => {
          const r = el.getBoundingClientRect();
          return r.bottom > footer.top + 2 || r.right > bounds.right + 2 || r.left < bounds.left - 2;
        }).map(el => el.textContent);
      });
      assert.deepEqual(overflow, [], `${round.id} ${track} ${i} overflows footer/canvas`);
    }
  }
  await page.reload();
  assert.match(await page.title(), /3차 멘토링.*통합 발표자료/);
  pass('all published slides fit canvas without footer overlap; deep links survive reload');
  const third = rounds.find(round => round.id === '3');
  const latest = third.decks.combined.slides;
  assert.equal(latest.length, 19);
  assert.deepEqual(latest.map(slide => slide.title), [
    'GETDDO\n3차 멘토링', '목차', 'GETDDO 서비스 소개', '문제 정의', '해결 방향',
    '마스코트 — 타코야끼', '게임 컨셉', '사용자 기능', '관리자 기능', '게임·미션 보상', '응모권 등급', '응모권', '유사 서비스 분석', 'GETDDO의 차별점',
    '핵심 기술 스택', '시스템 아키텍처', 'ERD', '사용자 이용 흐름', '감사합니다',
  ]);
  assert.deepEqual(latest.find(slide => slide.title === 'GETDDO 서비스 소개').cards[1], rounds[1].decks.combined.slides.find(slide => slide.title === 'GETDDO 서비스 소개').cards[1]);
  assert.deepEqual(latest.find(slide => slide.title === '유사 서비스 분석').rows.map(row => row.slice(0, 2)), rounds[1].decks.combined.slides.find(slide => slide.title === '유사 서비스 분석').rows.map(row => row.slice(0, 2)));
  assert.equal(latest.some(slide => slide.type === 'questions'), false);
  assert.doesNotMatch(JSON.stringify(latest), /로컬|미커밋|PONG|진행 상태|멘토님께/);
  assert.equal(latest.some(slide => slide.title === 'Q&A'), false);
  assert.equal(latest.find(slide => slide.title === '시스템 아키텍처').description, '');
  const originalConcepts = rounds[0].decks.frontend.slides;
  const mascot = latest.find(slide => slide.type === 'mascot');
  assert.deepEqual(mascot.reasons, originalConcepts.find(slide => slide.type === 'mascot').reasons);
  assert.equal(latest.some(slide => slide.type === 'palette'), false);
  const gameConcept = latest.find(slide => slide.title === '게임 컨셉');
  assert.match(JSON.stringify(gameConcept), /타꼬런/);
  assert.match(JSON.stringify(gameConcept), /글자색깔 맞추기/);
  assert.doesNotMatch(JSON.stringify(gameConcept), /게임 종류는 미확정|획득 조건과 적용 단위는 미정/);
  const rewards = latest.find(slide => slide.title === '게임·미션 보상');
  assert.match(rewards.cards[0].text, /유효한 완료 결과.*최소 점수.*1장/);
  assert.match(rewards.cards[0].tag, /400점.*50점/);
  const grades = latest.find(slide => slide.title === '응모권 등급');
  assert.deepEqual(grades.cards.map(card => card.title), ['브론즈', '실버', '골드']);
  for (const [index, probability, weight] of [[0, 80, 1], [1, 18, 3], [2, 2, 5]]) {
    assert.match(grades.cards[index].tag, new RegExp(`확률 ${probability}%.*가중치 ${weight}`));
  }
  const difference = JSON.stringify(latest.find(slide => slide.title === 'GETDDO의 차별점'));
  assert.match(difference, /무작위 등급/);
  assert.match(difference, /등급별 사용 장수를 직접 선택/);
  const adminText = JSON.stringify(latest.find(slide => slide.title === '관리자 기능'));
  assert.doesNotMatch(adminText, /중단·재개|응모권을 회수|참여 허용·제외/);
  assert.match(adminText, /자동 추첨/);
  assert.match(adminText, /수동 공개/);
  assert.doesNotMatch(JSON.stringify(latest), /같은 입력으로 결과를 다시|추첨 당시 조건으로 결과를 재현/);

  await page.goto(base);
  await page.locator('a[href="#/mentoring/3/combined/1"]').click();
  await page.waitForSelector('.slide-cover');
  assert.equal(await page.locator('[data-action=prev]').isDisabled(), true);
  assert.equal(await page.locator('.ticket-art').count(), 1);
  for (const item of latest[1].items) {
    await page.goto(`${base}#/mentoring/3/combined/2`);
    await page.locator('.agenda-item').filter({ hasText: item.title }).click();
    assert.match(page.url(), new RegExp(`3/combined/${item.target + 1}$`));
    await page.waitForFunction(expected => document.querySelector('.slide-heading h1')?.innerText === expected, latest[item.target].title);
  }
  const previousStack = rounds[1].decks.combined.slides.find(slide => slide.type === 'tech');
  const currentStack = latest.find(slide => slide.type === 'tech');
  const identity = ({ icon, track, name }) => ({ icon, track, name });
  assert.deepEqual(currentStack.items.map(identity), previousStack.items.map(identity));
  assert.equal(currentStack.notesTitle, previousStack.notesTitle);
  await page.goto(`${base}#/mentoring/2/combined/9`);
  await page.waitForSelector('.diagram-slide');
  const previousDiagram = await page.locator('.image-layout img').boundingBox();
  await page.goto(`${base}#/mentoring/3/combined/${latest.findIndex(slide => slide.title === '시스템 아키텍처') + 1}`);
  await page.waitForSelector('.image-only-slide');
  assert.equal(await page.locator('.slide-heading').count(), 0);
  const diagram = await page.locator('.image-layout img').boundingBox();
  assert.ok(diagram.width > previousDiagram.width * 1.4, 'architecture image uses the width previously occupied by the heading');
  assert.ok(diagram.height > previousDiagram.height, 'architecture image is taller');
  assert.equal(await page.locator('.image-layout figcaption').innerText(), '');
  const erdIndex = latest.findIndex(slide => slide.title === 'ERD');
  await page.goto(`${base}#/mentoring/3/combined/${erdIndex + 1}`);
  await page.waitForSelector('.image-layout a');
  const [originalErd] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('.image-layout a').click(),
  ]);
  await originalErd.waitForLoadState('domcontentloaded');
  assert.match(originalErd.url(), /assets\/round3-erd\.png$/);
  await originalErd.waitForFunction(() => document.querySelector('img')?.naturalWidth === 8030);
  await originalErd.close();
  assert.equal(latest.some(slide => slide.title === '전체 서비스 워크플로우'), false);
  pass('complete ERD opens its original image; removed workflow is absent');
  pass('third mentoring preserves the project narrative and design, explains graded rewards, and excludes work status and questions');
  for (let i = 1; i <= latest.length; i++) {
    await page.goto(`${base}#/mentoring/3/combined/${i}`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => [...document.images].every(img => img.complete));
    await page.screenshot({ path: `/tmp/getddo-round3-format-${i}.png` });
  }
  assert.equal(await page.locator('.slide-ending .ending-mascot').count(), 1);
  assert.equal(await page.locator('[data-action=next]').isDisabled(), true);
  await page.reload();
  assert.match(page.url(), /3\/combined\/19$/);
  await page.keyboard.press('Home');
  await page.waitForSelector('.slide-cover');
  pass('third mentoring full presentation: agenda destinations, all image assets, boundaries and reload');
  for (const track of ['frontend', 'backend']) {
    await page.goto(`${base}#/mentoring/1/${track}/2`);
    await page.locator('.agenda-item').filter({ hasText: '기술 스택' }).click();
    await page.waitForSelector('.slide-tech');
    const text = await page.locator('.slide').innerText();
    assert.match(text, track === 'backend' ? /Java/ : /TypeScript/);
    if (track === 'backend') {
      assert.match(text, /MySQL/);
      assert.match(text, /Redis/);
      assert.doesNotMatch(text, /JUnit/);
    }
    assert.equal(await page.locator('.content-card').count(), 0);
    assert.equal(await page.locator('.tech-entry img').count(), 7);
    await page.waitForFunction(() => [...document.querySelectorAll('.tech-entry img')].every(img => img.complete && img.naturalWidth > 0));
  }
  pass('both tech-stack agenda links, backend and frontend technology icons');
  await page.goto(`${base}#/mentoring/2/combined/2`);
  await page.locator('.agenda-item').filter({ hasText: '기술·데이터 설계' }).click();
  await page.waitForSelector('.slide-tech');
  const frontendBox = await page.locator('.tech-entry').filter({ hasText: 'React · TypeScript' }).boundingBox();
  const backendBox = await page.locator('.tech-entry').filter({ hasText: 'Spring Boot · Java' }).boundingBox();
  const buildBox = await page.locator('.tech-entry').filter({ hasText: 'Flyway · Gradle' }).boundingBox();
  assert.ok(buildBox.x > frontendBox.x && Math.abs(buildBox.x - backendBox.x) < 1, 'Flyway/Gradle must align with the backend column');
  assert.deepEqual(await page.locator('.tech-column-title').allTextContents(), ['프론트엔드', '백엔드']);
  pass('combined tech stack labels both columns and keeps Flyway/Gradle with backend');
  await page.goto(`${base}#/mentoring/1/backend/2`);
  await page.locator('.agenda-item').filter({ hasText: '핵심 처리 흐름' }).click();
  await page.waitForSelector('.slide-architecture');
  assert.equal(await page.locator('.slide-heading h1').innerText(), '응모 처리 흐름');
  pass('backend entry flow agenda link after design slide removal');
  for (const hash of ['#/mentoring/2/frontend/1', '#/mentoring/2/backend/1', '#/mentoring/3/backend/1', '#/broken']) {
    await page.goto(base + hash);
    await page.waitForSelector('.notice');
    assert.equal(await page.locator('.slide').count(), 0);
  }
  await page.goto(`${base}#/mentoring/1/backend/999`);
  await page.waitForSelector('.slide-ending');
  assert.match(page.url(), /backend\/16$/);
  pass('locked/invalid links handled, out-of-range page canonicalized');
  for (const viewport of [{ width: 390, height: 844 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(viewport);
    await page.goto(base);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.goto(`${base}#/mentoring/1/backend/1`);
    await page.waitForSelector('.slide');
    await page.waitForFunction(() => document.querySelector('.slide').style.transform);
    const bounds = await page.locator('.slide').boundingBox();
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= viewport.width + 1);
    assert.ok(bounds.y >= 0 && bounds.y + bounds.height <= viewport.height + 1);
    assert.ok(Math.abs(bounds.width / bounds.height - 16 / 9) < 0.01);
    await page.locator('[data-action=outline]').click();
    await page.locator('.outline-item.active').click();
    assert.equal(await page.locator('.slide-outline').isVisible(), false);
    assert.equal(await page.locator('[data-action=outline]').getAttribute('aria-expanded'), 'false');
    await page.locator('[data-action=outline]').click();
    await page.locator('.outline-item').nth(2).click();
    await page.waitForSelector('.slide-cards');
    assert.equal(await page.locator('.slide-outline').isVisible(), false);
  }
  pass('mobile portrait/landscape, 16:9 fit, no horizontal overflow, outline navigation');
  const original = await readFile(resolve(root, 'content.js'), 'utf8');
  overrideContent = original.replace('frontend: { enabled: false, slides: [] }', "frontend: { enabled: true, slides: makeSlides('frontend') }");
  await page.goto(base);
  assert.equal(await page.locator('.track-links a').count(), 6);
  await page.goto(`${base}#/mentoring/3/frontend/1`);
  await page.waitForSelector('.slide-cover');
  assert.match(await page.title(), /3차 멘토링/);
  pass('future round becomes available through content configuration');
  overrideContent = original.replace('frontend: { enabled: false, slides: [] }', `frontend: { enabled: true, slides: [
    { type:'text', title:'본문', paragraphs:['핵심 내용'], bullets:['확인 항목'] },
    { type:'split', title:'비교', columns:[{title:'선택 A', paragraphs:['설명']},{title:'선택 B', paragraphs:['설명']}] },
    { type:'image', title:'이미지', src:'assets/logo.svg', alt:'서비스 로고', caption:'원본 이미지' }
  ] }`);
  await page.reload();
  for (const [i, type] of ['text','split','image'].entries()) {
    await page.goto(`${base}#/mentoring/3/frontend/${i + 1}`);
    await page.waitForSelector(`.slide-${type}`);
  }
  pass('extensible text, split and image layouts');
  assert.deepEqual(errors, []);
  pass('no browser exceptions or failed assets');
  console.log(`\n${checks} checks passed.`);
} finally {
  if (browser) await browser.close();
  await new Promise(done => server.close(done));
}
