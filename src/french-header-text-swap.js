function setTextAreaValue(el, value) {
  if (!el || el.value === value) return;
  const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
  setter.call(el, value);
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

function swapFrenchHeaderTextValues() {
  if (document.body.classList.contains('arabic-mode')) return;

  const leftCell = document.querySelector('.left-header-cell');
  const rightCell = document.querySelector('.right-header-cell');
  const leftText = leftCell?.querySelector('.inline-class-input');
  const durationControl = leftCell?.querySelector('.tiny-duration-control');
  const rightTop = rightCell?.querySelector('.right-line-top');
  const rightBottom = rightCell?.querySelector('.right-line-bottom');

  if (!leftCell || !rightCell || !leftText || !durationControl || !rightTop || !rightBottom) return;
  if (leftText.dataset.frenchHeaderSwapped === 'true') return;

  const leftValue = leftText.value;
  const rightTopValue = rightTop.value;
  const rightBottomValue = rightBottom.value;

  setTextAreaValue(leftText, `${rightTopValue}\n${rightBottomValue}`);
  setTextAreaValue(rightTop, leftValue);
  setTextAreaValue(rightBottom, '');

  rightCell.appendChild(durationControl);
  leftText.rows = 2;
  leftText.dataset.frenchHeaderSwapped = 'true';
}

window.addEventListener('load', () => {
  setTimeout(swapFrenchHeaderTextValues, 80);
  setTimeout(swapFrenchHeaderTextValues, 300);
});

setTimeout(swapFrenchHeaderTextValues, 500);
