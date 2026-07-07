const TITLES = ['1 AC', '2 AC', '3 AC'];

const applyCollegeTitles = () => {
  const boxes = document.querySelectorAll('.cahier-page [contenteditable]');
  let index = 0;

  boxes.forEach((element) => {
    const text = (element.textContent || '').trim().toUpperCase();
    if (['TRONC COMMUN', '1ÈRES BAC', '1ERES BAC', '2ÈME BAC', '2EME BAC'].includes(text) && index < TITLES.length) {
      element.textContent = TITLES[index];
      index += 1;
    }
  });
};

const observer = new MutationObserver(applyCollegeTitles);

window.addEventListener('DOMContentLoaded', () => {
  applyCollegeTitles();
  observer.observe(document.body, { childList: true, subtree: true });
});
