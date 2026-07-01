function lockOriginalPdfSize() {
  document.body.classList.add('pdf-original-size-now');
  document.documentElement.style.setProperty('--sheet-scale', '1');
  document.documentElement.style.setProperty('--sheet-columns', '1');

  document.querySelectorAll('.a4-page, .exam-page').forEach(function (page) {
    page.style.transform = 'none';
    page.style.scale = '1';
    page.style.width = '794px';
    page.style.height = '1123px';
    page.style.minWidth = '794px';
    page.style.minHeight = '1123px';
    page.style.maxWidth = '794px';
    page.style.maxHeight = '1123px';
  });
}

function unlockOriginalPdfSize() {
  document.body.classList.remove('pdf-original-size-now');
  document.querySelectorAll('.a4-page, .exam-page').forEach(function (page) {
    page.style.transform = '';
    page.style.scale = '';
    page.style.width = '';
    page.style.height = '';
    page.style.minWidth = '';
    page.style.minHeight = '';
    page.style.maxWidth = '';
    page.style.maxHeight = '';
  });
  if (window.syncTwoPageView) window.syncTwoPageView();
}

function enableOriginalPdfSizeNow() {
  lockOriginalPdfSize();

  clearInterval(window.__pdfOriginalSizeInterval);
  window.__pdfOriginalSizeInterval = setInterval(lockOriginalPdfSize, 20);

  clearTimeout(window.__pdfOriginalSizeTimer);
  window.__pdfOriginalSizeTimer = setTimeout(function () {
    clearInterval(window.__pdfOriginalSizeInterval);
    unlockOriginalPdfSize();
  }, 15000);
}

function getPdfButton(target) {
  const button = target && target.closest && target.closest('button');
  if (!button) return null;
  const text = String(button.textContent || '').trim().toLowerCase();
  if (text.includes('voir pdf') || text.includes('exporter pdf')) return button;
  return null;
}

document.addEventListener('pointerdown', function (event) {
  if (getPdfButton(event.target)) enableOriginalPdfSizeNow();
}, true);

document.addEventListener('mousedown', function (event) {
  if (getPdfButton(event.target)) enableOriginalPdfSizeNow();
}, true);

document.addEventListener('click', function (event) {
  if (getPdfButton(event.target)) enableOriginalPdfSizeNow();
}, true);

window.enableOriginalPdfSizeNow = enableOriginalPdfSizeNow;
window.lockOriginalPdfSize = lockOriginalPdfSize;
