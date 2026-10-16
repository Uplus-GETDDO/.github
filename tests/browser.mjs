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
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
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
  assert.deepEqual(third.decks.combined.slides.map(slide => slide.title), ['시스템 아키텍처', 'ERD', '기술 스택']);
  await page.goto(base);
  await page.locator('a[href="#/mentoring/3/combined/1"]').click();
  await page.waitForSelector('.slide-image');
  assert.equal(await page.locator('[data-action=prev]').isDisabled(), true);
  for (let i = 1; i <= 3; i++) {
    await page.goto(`${base}#/mentoring/3/combined/${i}`);
    await page.evaluate(() => document.fonts.ready);
    if (i < 3) {
      await page.waitForFunction(() => [...document.querySelectorAll('.image-layout img')].every(img => img.complete && img.naturalWidth > 0));
    }
    await page.screenshot({ path: `/tmp/getddo-round3-${i}.png` });
  }
  await page.keyboard.press('End');
  assert.equal(await page.locator('[data-action=next]').isDisabled(), true);
  await page.reload();
  assert.match(page.url(), /3\/combined\/3$/);
  pass('third mentoring: exact three-slide order, home link, SVG assets, boundaries and reload');
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
