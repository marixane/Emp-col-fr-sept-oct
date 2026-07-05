const COVER_LOGO_PATH = '/Logo_AR_TM_V.png';

const applyExactCoverLogo = () => {
  if (!document.body.classList.contains('cahier-tab-active')) return;
  const logo = document.querySelector('#cahier-cover-page img[alt="Logo Royaume du Maroc"]');
  if (!logo) return;
  if (logo.getAttribute('src') !== COVER_LOGO_PATH) logo.setAttribute('src', COVER_LOGO_PATH);
  if (logo.dataset.exactCoverLogoApplied === 'true') return;
  logo.dataset.exactCoverLogoApplied = 'true';
  logo.style.width = '96px';
  logo.style.height = 'auto';
  logo.style.objectFit = 'contain';
  logo.style.display = 'block';
  logo.style.margin = '0 auto 8px';
  logo.style.background = 'transparent';
  logo.style.border = '0';
  logo.style.boxShadow = 'none';
  logo.style.filter = 'none';
};

const applyCahierButtonOffset = () => {
  if (document.getElementById('cahier-span-buttons-left-style')) return;
  const style = document.createElement('style');
  style.id = 'cahier-span-buttons-left-style';
  style.textContent = [
    '.cahier-tab-active .timetable-cell-content.colored-cell .span-tools{width:max-content!important;margin:0 auto!important;transform:translateX(-7px)!important;}',
    '.cahier-tab-active .span-tools button{background:transparent!important;color:rgba(17,17,17,.55)!important;border-color:rgba(17,17,17,.28)!important;box-shadow:none!important;opacity:.55!important;}',
    '.cahier-tab-active .span-tools button:hover:not(:disabled),.cahier-tab-active .span-tools .span-remove-button:hover,.cahier-tab-active .span-tools .cell-delete-button:hover{background:white!important;color:#111!important;border-color:#111!important;opacity:1!important;}',
    '.cahier-tab-active .span-tools button:active,.cahier-tab-active .span-tools button:focus-visible{background:#38bdf8!important;color:white!important;border-color:#0284c7!important;opacity:1!important;}',
    '.cahier-tab-active .span-tools .span-remove-button:active,.cahier-tab-active .span-tools .cell-delete-button:active{background:#38bdf8!important;color:white!important;border-color:#0284c7!important;opacity:1!important;}'
  ].join('');
  document.head.appendChild(style);
};

const clearCahierForcedScrollLock = () => {
  applyExactCoverLogo();
  applyCahierButtonOffset();

  const zone = document.querySelector('.cahier-preview-zone');
  const shell = document.querySelector('.cahier-shell');

  if (document.documentElement.style.overflow) document.documentElement.style.overflow = '';
  if (document.documentElement.style.height) document.documentElement.style.height = '';
  if (document.body.style.overflow) document.body.style.overflow = '';
  if (document.body.style.height) document.body.style.height = '';

  if (shell) {
    if (shell.style.height) shell.style.height = '';
    if (shell.style.maxHeight) shell.style.maxHeight = '';
    if (shell.style.overflow) shell.style.overflow = '';
  }

  if (zone) {
    if (zone.style.height) zone.style.height = '';
    if (zone.style.maxHeight) zone.style.maxHeight = '';
    if (zone.style.overflowY) zone.style.overflowY = '';
    if (zone.style.overflowX) zone.style.overflowX = '';
    if (zone.style.webkitOverflowScrolling) zone.style.webkitOverflowScrolling = '';
    if (zone.style.paddingBottom) zone.style.paddingBottom = '';
    if (zone.style.scrollBehavior) zone.style.scrollBehavior = '';
  }
};

let cahierScrollRaf = 0;
const scheduleClearCahierScrollLock = () => {
  if (cahierScrollRaf) return;
  cahierScrollRaf = window.requestAnimationFrame(() => {
    cahierScrollRaf = 0;
    clearCahierForcedScrollLock();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleClearCahierScrollLock, { once: true });
} else {
  scheduleClearCahierScrollLock();
}

window.addEventListener('resize', scheduleClearCahierScrollLock, { passive: true });
window.addEventListener('orientationchange', scheduleClearCahierScrollLock, { passive: true });

new MutationObserver(scheduleClearCahierScrollLock).observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class']
});
