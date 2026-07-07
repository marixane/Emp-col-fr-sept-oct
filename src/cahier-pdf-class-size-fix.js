const PDF_BUTTON_ID = 'cahier-pdf-button-stable';

const preparePdfClassSizes = () => {
  const labels = Array.from(document.querySelectorAll('.cahier-preview-zone .homework-subject > div > span:nth-child(2)'));
  const previousStyles = labels.map((label) => label.getAttribute('style'));

  labels.forEach((label) => {
    const count = label.parentElement?.parentElement?.children?.length || 1;
    const size = count >= 4 ? 12 : count === 3 ? 14 : 16;

    label.style.setProperty('font-size', `${size}px`, 'important');
    label.style.setProperty('transform', 'none', 'important');
    label.style.setProperty('transform-origin', 'left center', 'important');
    label.style.setProperty('overflow', 'hidden', 'important');
    label.style.setProperty('white-space', 'nowrap', 'important');
    label.style.setProperty('text-overflow', 'clip', 'important');
  });

  window.setTimeout(() => {
    labels.forEach((label, index) => {
      const previous = previousStyles[index];
      if (previous === null) label.removeAttribute('style');
      else label.setAttribute('style', previous);
    });
  }, 10000);
};

document.addEventListener('click', (event) => {
  if (event.target?.closest?.(`#${PDF_BUTTON_ID}`)) preparePdfClassSizes();
}, true);
