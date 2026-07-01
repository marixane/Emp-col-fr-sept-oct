const TWO_PAGE_VIEW_KEY = 'exam-two-page-view';
let lastMultiplePageState = false;

function pageCount() {
  return document.querySelectorAll('.preview-zone .a4-page').length;
}

function hasMultiplePages() {
  return pageCount() > 1;
}

function isTwoPageViewEnabled() {
  return localStorage.getItem(TWO_PAGE_VIEW_KEY) !== 'false';
}

function setTwoPageView(enabled) {
  localStorage.setItem(TWO_PAGE_VIEW_KEY, enabled ? 'true' : 'false');
  syncTwoPageView();
}

function autoEnableWhenSecondPageAppears(multiple) {
  if (multiple && !lastMultiplePageState) {
    localStorage.setItem(TWO_PAGE_VIEW_KEY, 'true');
  }
  lastMultiplePageState = multiple;
}

function getTwoPageZoomClass(scale) {
  if (scale >= 0.98) return 'two-page-zoom-100';
  if (scale >= 0.92) return 'two-page-zoom-95';
  if (scale >= 0.86) return 'two-page-zoom-90';
  if (scale >= 0.80) return 'two-page-zoom-84';
  if (scale >= 0.74) return 'two-page-zoom-78';
  if (scale >= 0.68) return 'two-page-zoom-72';
  if (scale >= 0.62) return 'two-page-zoom-66';
  return 'two-page-zoom-60';
}

function updateTwoPageZoom(enabled) {
  document.body.classList.remove('two-page-zoom-100', 'two-page-zoom-95', 'two-page-zoom-90', 'two-page-zoom-84', 'two-page-zoom-78', 'two-page-zoom-72', 'two-page-zoom-66', 'two-page-zoom-60');
  if (!enabled) return;

  const panel = document.querySelector('.panel');
  const available = Math.max(720, window.innerWidth - ((panel && panel.offsetWidth) || 190) - 42);
  const natural = 794 * 2 + 16;
  const scale = Math.min(1, Math.max(0.60, available / natural));
  document.body.classList.add(getTwoPageZoomClass(scale));
}

function syncTwoPageView() {
  const multiple = hasMultiplePages();
  autoEnableWhenSecondPageAppears(multiple);
  const enabled = isTwoPageViewEnabled() && multiple;
  document.body.classList.toggle('two-page-view', enabled);
  updateTwoPageZoom(enabled);

  const button = document.querySelector('.two-page-view-toggle');
  if (!button) return;

  button.classList.toggle('on', enabled);
  button.classList.toggle('off', !enabled);
  button.disabled = !multiple;
  button.innerHTML = enabled ? '<span class="two-page-icon two-page-icon-2" aria-hidden="true"><i></i><i></i></span>' : '<span class="two-page-icon two-page-icon-1" aria-hidden="true"><i></i></span>';
  button.setAttribute('aria-label', enabled ? 'Affichage 2 pages côte à côte' : 'Affichage 1 page');
  button.title = multiple ? (enabled ? 'Afficher 1 page' : 'Afficher 2 pages côte à côte') : 'Ajoute une 2e feuille pour activer cet affichage';
}

function ensureTwoPageViewButton() {
  const panel = document.querySelector('.panel');
  if (!panel || panel.querySelector('.two-page-view-toggle')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'two-page-view-toggle off';
  button.addEventListener('click', function () {
    if (!hasMultiplePages()) return;
    setTwoPageView(!isTwoPageViewEnabled());
  });

  const barButton = panel.querySelector('.bar-ribbon-toggle');
  if (barButton && barButton.nextSibling) panel.insertBefore(button, barButton.nextSibling);
  else panel.appendChild(button);

  syncTwoPageView();
}

function initTwoPageView() {
  ensureTwoPageViewButton();
  syncTwoPageView();
}

initTwoPageView();
setTimeout(initTwoPageView, 200);
setTimeout(initTwoPageView, 700);
setInterval(initTwoPageView, 500);
window.addEventListener('resize', syncTwoPageView);

window.syncTwoPageView = syncTwoPageView;
