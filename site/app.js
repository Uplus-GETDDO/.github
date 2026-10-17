import { rounds, tracks } from './content.js';

const app = document.querySelector('#app');
const escape = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const lines = value => escape(value).replaceAll('\n', '<br>');
const number = value => String(value).padStart(2, '0');
const available = deck => deck?.enabled && deck.slides?.length > 0;
const route = (round, track, index = 0) => `#/mentoring/${round}/${track}/${index + 1}`;
const logo = '<img src="assets/logo.svg" alt="U+ GETDDO" width="137" height="36">';
let current = null;
let overviewOpen = false;

function ticketArt() {
  return `<div class="ticket-art" aria-hidden="true">
    <span class="orbit orbit-one"></span><span class="orbit orbit-two"></span>
    <span class="art-spark spark-one">✳</span><span class="art-spark spark-two">✦</span>
    <div class="ticket ticket-back"><span>EVENT TICKET</span><b>이벤트 응모권</b></div>
    <div class="ticket ticket-front"><div class="ticket-top"><span>GETDDO</span><span>ADMIT ONE ↗</span></div>
    <strong>GETDDO<br><span>EVENT</span> TICKET.</strong><div class="ticket-bottom"><span>출석 · 미션 · 게임</span><span class="barcode"></span></div></div>
    <img class="ticket-mascot" src="assets/mascot.svg" alt="">
    <span class="art-label">GETDDO · MENTORING</span>
  </div>`;
}

function home(message = '') {
  current = null;
  overviewOpen = false;
  document.title = 'GETDDO — Mentoring Studio';
  document.body.classList.remove('presenting');
  app.innerHTML = `<div class="home-shell">
    <header class="site-header"><a class="brand" href="#/" aria-label="GETDDO 홈">${logo}<span class="brand-divider"></span><span class="brand-caption">MENTORING STUDIO</span></a><span class="header-note"><i></i> GETDDO 발표 자료</span></header>
    <main id="main" tabindex="-1">
      ${message ? `<p class="notice" role="alert">${escape(message)}</p>` : ''}
      <section class="hero"><div class="hero-copy"><span class="eyebrow"><span class="tiny-star">✳</span> GETDDO PROJECT</span>
        <h1>GETDDO<br><span class="mint-word">멘토링</span> 발표 자료</h1>
        <p>이벤트 응모 서비스<br>요구사항 · 설계 · 구현 진행 사항</p>
        <a class="hero-cta" href="#sessions">발표 자료 선택 <span>↘</span></a>
        <div class="hero-keywords"><span>이벤트</span><span>응모권</span><span>관리자</span></div>
      </div>${ticketArt()}</section>
      <section class="sessions" id="sessions" aria-labelledby="sessions-title"><div class="section-heading"><div><span class="eyebrow">MENTORING</span><h2 id="sessions-title">멘토링 자료</h2></div><p>차수 및 발표 자료 선택</p></div>
      <div class="round-grid">${rounds.map(round => {
        const ready = Object.values(round.decks).some(available);
        return `<article class="round-card ${ready ? 'ready' : ''}"><div class="round-top"><span class="round-number">${number(round.id)}</span><span class="status ${ready ? 'open' : ''}">${ready ? '<i></i> 발표 자료' : '준비 중'}</span></div><span class="round-stage">${escape(round.stage)}</span><h3>${escape(round.title)}</h3><h4>${escape(round.subtitle)}</h4><p>${escape(round.description)}</p><div class="track-links">${Object.entries(tracks).filter(([key]) => round.decks[key]).map(([key, track]) => available(round.decks[key]) ? `<a href="${route(round.id, key)}"><span class="track-icon">${key === 'combined' ? '＋' : key === 'frontend' ? '〈/〉' : '{ }'}</span><span>${track.name}<small>${track.english}</small></span><span class="link-arrow">↗</span></a>` : `<button disabled aria-label="${round.title} ${track.name} 준비 중"><span class="track-icon">${key === 'combined' ? '＋' : key === 'frontend' ? '〈/〉' : '{ }'}</span><span>${track.name}<small>${track.english}</small></span><span class="lock-icon" aria-hidden="true">⌑</span></button>`).join('')}</div><div class="round-footer">${ready ? '자료 확인 가능' : '발표 자료 준비 중'}</div></article>`;
      }).join('')}</div></section>
      <section class="concept-strip"><span class="concept-mark" aria-hidden="true">✳</span><div><span class="eyebrow">SERVICE</span><p>출석·미션·게임 → 응모권 획득 → 이벤트 응모 → 추첨</p></div><span class="concept-end">GETDDO<br>PROJECT</span></section>
    </main><footer class="site-footer"><span>© GETDDO TEAM <span class="footer-dot">·</span> 멘토링 발표 자료</span><a href="requirements.md" target="_blank" rel="noopener">서비스 요구사항 ↗</a></footer>
  </div>`;
}

function renderBody(slide) {
  switch (slide.type) {
    case 'comparison': return `<table class="comparison-table"><thead><tr><th>서비스</th><th>참여 구조</th><th>프로젝트 비교 지점</th></tr></thead><tbody>${slide.rows.map(row => `<tr>${row.map(cell => `<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    case 'palette': return `<div class="palette-layout"><div class="palette-brand"><span class="eyebrow">BRAND COLOR</span><h2>마젠타</h2><p>#E6007E</p><span>유플러스 대표 컬러</span></div><div class="palette-roles"><article><div class="palette-samples"><i class="sample-ticket"></i></div><div><h2>응모권 · 옐로</h2><p>응모권을 구분하는 포인트 컬러</p></div></article><article><div class="palette-samples"><i class="sample-yellow"></i><i class="sample-pink"></i><i class="sample-lavender"></i></div><div><h2>놀이 · 파스텔</h2><p>옐로 · 핑크 · 라벤더</p></div></article><article><div class="palette-samples"><i class="sample-white"></i><i class="sample-gray"></i></div><div><h2>배경 · 뉴트럴</h2><p>흰색과 그레이 중심 · 과한 색상 사용 줄이기</p></div></article></div></div>`;
    case 'mascot': return `<div class="mascot-layout"><img src="assets/mascot.svg" alt="동그란 추첨공을 띄우는 타코야끼 캐릭터"><div>${slide.reasons.map(reason => `<article><h2>${escape(reason.title)}</h2><p>${escape(reason.text)}</p></article>`).join('')}</div></div>`;
    case 'tech': return `<div class="tech-layout ${slide.pending ? 'is-pending' : ''} ${slide.items.length > 6 ? 'is-dense' : ''}"><div class="tech-list">${slide.items.every(item => ['frontend', 'backend'].includes(item.track)) ? '<h3 class="tech-column-title">프론트엔드</h3><h3 class="tech-column-title">백엔드</h3>' : ''}${slide.items.map(item => `<article class="tech-entry" data-track="${escape(item.track || '')}"><img src="assets/tech/${escape(item.icon)}.svg" alt="" width="58" height="58"><div><div class="tech-name"><h2>${escape(item.name)}</h2>${item.version ? `<span class="tech-version">${escape(item.version)}</span>` : ''}</div><p>${escape(item.role)}</p>${item.status ? `<span class="tech-status">${escape(item.status)}</span>` : ''}</div></article>`).join('')}</div><aside class="tech-notes" aria-label="${escape(slide.notesTitle)}"><span class="eyebrow">${escape(slide.notesTitle)}</span>${slide.notes.map(note => `<div><h3>${escape(note.title)}</h3><p>${escape(note.text)}</p></div>`).join('')}</aside></div>`;
    case 'ending': return `<img class="ending-mascot" src="assets/mascot.svg" alt="GETDDO 타코야끼 캐릭터"><div class="ending-copy"><h1>${escape(slide.title)}</h1><p>${escape(slide.description || '')}</p></div>`;
    case 'cover': return `<div class="cover-copy"><h1>${lines(slide.title)}</h1><p>${lines(slide.description)}</p><div class="slide-tags">${(slide.tags || []).map(tag => `<span>${escape(tag)}</span>`).join('')}</div></div>${ticketArt()}`;
    case 'agenda': return `<div class="agenda-list ${slide.items.length > 5 ? 'many' : slide.items.length > 3 ? 'compact' : ''}">${slide.items.map((item, i) => `<button class="agenda-item" data-goto="${item.target}"><span>${number(i + 1)}</span><strong>${escape(item.title)}</strong><p>${escape(item.description)}</p><b aria-hidden="true">↗</b></button>`).join('')}</div>`;
    case 'cards': return `<div class="content-card-grid ${slide.cards.length === 4 ? 'four-cards' : slide.cards.length === 2 ? 'two-cards' : ''}">${slide.cards.map(card => {
      const diagram = /^assets\/erd-changes\/[a-z0-9-]+\.png$/.test(card.diagram || '') ? card.diagram : '';
      const tag = diagram ? 'a' : 'article';
      const link = diagram ? ` href="${escape(diagram)}" target="_blank" rel="noopener" aria-label="${escape(card.title)} 변경 전·후 구조 보기 (새 창)"` : '';
      return `<${tag} class="content-card ${['mint', 'yellow', 'pink'].includes(card.tone) ? card.tone : 'mint'}${diagram ? ' diagram-card' : ''}"${link}><span class="eyebrow">${escape(card.label)}</span><h2>${escape(card.title)}</h2><p>${escape(card.text)}</p><span class="card-tag">${escape(card.tag)}${diagram ? '<span class="diagram-link-hint">전·후 구조 보기 ↗</span>' : ''}</span></${tag}>`;
    }).join('')}</div>`;
    case 'architecture': return `<div class="architecture-flow">${slide.nodes.map((node, i) => `${i ? '<span class="flow-arrow" aria-hidden="true">→</span>' : ''}<article class="arch-node"><span class="node-number">${number(i + 1)}</span><h2>${escape(node.title)}</h2><p>${escape(node.subtitle)}</p><span>${escape(node.detail)}</span></article>`).join('')}</div><div class="architecture-notes">${slide.notes.map(([label, text]) => `<div><strong>${escape(label)}</strong><p>${escape(text)}</p></div>`).join('')}</div>`;
    case 'questions': return `<div class="questions-layout"><div><span class="question-mark" aria-hidden="true">Q<span>&</span>A</span><p>${escape(slide.description)}</p></div><ol class="question-list">${slide.questions.map((question, i) => `<li><span>${number(i + 1)}</span><p>${escape(question)}</p></li>`).join('')}</ol></div>`;
    case 'text': return `<div class="text-layout">${(slide.paragraphs || []).map(p => `<p>${lines(p)}</p>`).join('')}${slide.bullets ? `<ul>${slide.bullets.map(p => `<li>${escape(p)}</li>`).join('')}</ul>` : ''}</div>`;
    case 'split': return `<div class="split-layout">${(slide.columns || []).map(column => `<article><span class="eyebrow">${escape(column.label)}</span><h2>${escape(column.title)}</h2>${(column.paragraphs || []).map(p => `<p>${lines(p)}</p>`).join('')}</article>`).join('')}</div>`;
    case 'image': {
      const source = String(slide.src || '');
      if (!source) return `<div class="image-placeholder"><span>${escape(slide.title)}</span><p>${escape(slide.placeholder || '이미지 작성 예정')}</p></div>`;
      const safeSource = /^(assets\/|https:\/\/)/.test(source) ? source : '';
      const picture = `<img src="${escape(safeSource)}" alt="${escape(slide.alt || slide.title)}">`;
      return `<figure class="image-layout">${slide.zoomable ? `<a href="${escape(safeSource)}" target="_blank" rel="noopener" aria-label="${escape(slide.title)} 원본 이미지 열기">${picture}</a>` : picture}<figcaption>${escape(slide.caption || '')}</figcaption></figure>`;
    }
    default: return '<p class="notice">지원하지 않는 레이아웃입니다. content.js의 type을 확인하세요.</p>';
  }
}

function renderDeck(round, trackKey, index) {
  const deck = round.decks[trackKey];
  const slide = deck.slides[index];
  const track = tracks[trackKey];
  current = { round, trackKey, index, slides: deck.slides };
  document.title = `${round.title} · ${track.name} · ${index + 1} — GETDDO`;
  document.body.classList.add('presenting');
  app.innerHTML = `<div class="deck-shell">
    <header class="deck-header"><a class="brand" href="#/" aria-label="GETDDO 홈">${logo}</a><div class="deck-breadcrumb"><a href="#/">멘토링</a><span>/</span><span>${escape(round.title)}</span><span>/</span><strong>${track.name}</strong></div><button class="icon-button fullscreen-button" data-action="fullscreen" aria-label="전체 화면">⛶ <span>전체 화면</span></button></header>
    <div class="deck-workspace"><aside class="slide-outline ${overviewOpen ? 'is-open' : ''}" aria-label="슬라이드 목록"><div class="outline-heading"><span>SLIDE INDEX</span><span>${number(deck.slides.length)}</span></div>${deck.slides.map((item, i) => `<a class="outline-item ${index === i ? 'active' : ''}" href="${route(round.id, trackKey, i)}" ${index === i ? 'aria-current="step"' : ''}><span>${number(i + 1)}</span><div class="mini-preview mini-${escape(item.type)}"><span>${escape(item.label || item.type)}</span><b>${escape(item.title).replaceAll('\n', '<br>')}</b><i></i></div><span class="outline-title">${escape(({ cover: '표지', agenda: '목차', cards: item.title, architecture: item.title, questions: item.title })[item.type] || item.title)}</span></a>`).join('')}<a class="back-home" href="#/">← 멘토링 홈</a></aside>
    <main class="presentation-main" id="main" tabindex="-1"><div class="slide-fit"><article class="slide slide-${escape(slide.type)}${slide.type === 'image' && ['diagram', 'journey', 'image-only'].includes(slide.layout) ? ` ${slide.layout}-slide` : ''}" aria-label="${index + 1} / ${deck.slides.length}: ${escape(slide.title)}"><div class="slide-top"><span>${escape(slide.label || `${number(index + 1)} / ${slide.type.toUpperCase()}`)}</span><span>${slide.shared ? 'COMMON' : (tracks[slide.track] || track).english.toUpperCase()} <i>●</i> ${escape(round.title)}</span></div>
    ${!['cover', 'ending'].includes(slide.type) && !(slide.type === 'image' && slide.layout === 'image-only') ? `<div class="slide-heading"><h1>${lines(slide.title)}</h1>${slide.type !== 'questions' ? `<p>${escape(slide.description || '')}</p>` : ''}</div>` : ''}
    <div class="slide-content">${renderBody(slide)}</div>
    <footer class="slide-footer">${logo}<span>GETDDO · ${slide.shared ? 'Common' : (tracks[slide.track] || track).english} · MENTORING ${number(round.id)}</span><b>${number(index + 1)} <span>/ ${number(deck.slides.length)}</span></b></footer></article></div></main></div>
    <footer class="deck-toolbar"><button class="icon-button" data-action="outline" aria-expanded="${overviewOpen}" aria-label="슬라이드 목록 열기">☷ <span>슬라이드 목록</span></button><button class="icon-button fullscreen-button fullscreen-exit" data-action="fullscreen" aria-label="전체 화면 종료">⛶ <span>전체 화면 종료</span></button><span class="keyboard-hint"><kbd>←</kbd><kbd>→</kbd> 슬라이드 이동 <span>·</span> <kbd>F</kbd> 전체 화면</span><nav class="slide-controls" aria-label="슬라이드 이동"><button class="icon-button" data-action="prev" aria-label="이전 슬라이드" ${index === 0 ? 'disabled' : ''}>←</button><span><b>${number(index + 1)}</b> / ${number(deck.slides.length)}</span><button class="icon-button" data-action="next" aria-label="다음 슬라이드" ${index === deck.slides.length - 1 ? 'disabled' : ''}>→</button></nav></footer><div class="progress-track"><div style="width:${(index + 1) / deck.slides.length * 100}%"></div></div></div>`;
  requestAnimationFrame(fitSlide);
  updateFullscreen();
  document.querySelector('#announcement').textContent = `${index + 1} / ${deck.slides.length}, ${slide.title.replaceAll('\n', ' ')}`;
}

function fitSlide() {
  const fit = document.querySelector('.slide-fit');
  if (!fit) return;
  const area = fit.parentElement;
  const css = getComputedStyle(area);
  const width = area.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight);
  const height = area.clientHeight - parseFloat(css.paddingTop) - parseFloat(css.paddingBottom);
  const scale = Math.max(.05, Math.min(width / 1280, height / 720));
  fit.style.width = `${1280 * scale}px`;
  fit.style.height = `${720 * scale}px`;
  fit.querySelector('.slide').style.transform = `scale(${scale})`;
}

function navigate(index) {
  if (!current) return;
  location.hash = route(current.round.id, current.trackKey, Math.max(0, Math.min(index, current.slides.length - 1)));
}

function renderRoute() {
  if (!location.hash || location.hash === '#/' || location.hash === '#sessions' || location.hash === '#main') {
    if (current || !app.children.length) home();
    return;
  }
  const match = location.hash.match(/^#\/mentoring\/([1-3])\/(frontend|backend|combined)\/(\d+)$/);
  if (!match) return home('발표 주소를 찾을 수 없습니다. 아래에서 발표 자료를 선택해 주세요.');
  const [, roundId, track, page] = match;
  const round = rounds.find(r => r.id === roundId);
  if (!available(round?.decks[track])) return home('아직 준비 중인 발표 자료입니다. 준비되면 이곳에서 열 수 있습니다.');
  const index = Math.min(Math.max(Number(page) - 1, 0), round.decks[track].slides.length - 1);
  const canonical = route(roundId, track, index);
  if (location.hash !== canonical) history.replaceState(null, '', canonical);
  renderDeck(round, track, index);
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else throw new Error('unsupported');
  } catch {
    document.querySelector('#announcement').textContent = '전체 화면을 사용할 수 없습니다. 브라우저의 전체 화면 메뉴를 이용해 주세요.';
    const button = document.querySelector('.fullscreen-button');
    if (button) { button.textContent = '전체 화면 미지원'; button.title = '브라우저의 전체 화면 메뉴를 이용해 주세요.'; }
  }
}

function updateFullscreen() {
  const enabled = Boolean(document.fullscreenElement);
  document.body.classList.toggle('fullscreen', enabled);
  document.querySelectorAll('.fullscreen-button').forEach(button => {
    button.innerHTML = `⛶ <span>${enabled ? '전체 화면 종료' : '전체 화면'}</span>`;
    button.setAttribute('aria-label', enabled ? '전체 화면 종료' : '전체 화면');
  });
  requestAnimationFrame(fitSlide);
}

document.addEventListener('click', event => {
  if (event.target.closest('.skip-link')) {
    event.preventDefault();
    document.querySelector('#main').focus();
    return;
  }
  if (event.target.closest('.outline-item')) {
    overviewOpen = false;
    document.querySelector('.slide-outline').classList.remove('is-open');
    document.querySelector('[data-action="outline"]').setAttribute('aria-expanded', 'false');
  }
  const target = event.target.closest('button');
  if (!target || target.disabled) return;
  if (target.dataset.goto !== undefined) navigate(Number(target.dataset.goto));
  switch (target.dataset.action) {
    case 'prev': navigate(current.index - 1); break;
    case 'next': navigate(current.index + 1); break;
    case 'fullscreen': toggleFullscreen(); break;
    case 'outline':
      overviewOpen = !overviewOpen;
      document.querySelector('.slide-outline').classList.toggle('is-open', overviewOpen);
      target.setAttribute('aria-expanded', String(overviewOpen));
      break;
  }
});

document.addEventListener('keydown', event => {
  if (!current || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
  if (event.key === ' ' && event.target.closest('button,a')) return;
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); navigate(current.index + 1); }
  else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); navigate(current.index - 1); }
  else if (event.key === 'Home') { event.preventDefault(); navigate(0); }
  else if (event.key === 'End') { event.preventDefault(); navigate(current.slides.length - 1); }
  else if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFullscreen(); }
  else if (event.key === 'Escape' && overviewOpen) {
    overviewOpen = false;
    document.querySelector('.slide-outline').classList.remove('is-open');
    document.querySelector('[data-action="outline"]').setAttribute('aria-expanded', 'false');
  }
});
window.addEventListener('hashchange', renderRoute);
window.addEventListener('resize', fitSlide);
document.addEventListener('fullscreenchange', updateFullscreen);
renderRoute();
