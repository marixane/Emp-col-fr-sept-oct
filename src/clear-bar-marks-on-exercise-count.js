function clearAllBarMarks() {
  function removeOne() {
    var mark = document.querySelector('.bar-mark');
    if (!mark) return;
    mark.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, cancelable: true }));
    setTimeout(removeOne, 0);
  }
  removeOne();
}

function syncPageCountCards() {
  var cards = Array.prototype.slice.call(document.querySelectorAll('.page-count-card'));
  cards.forEach(function (card, index) {
    if (index <= 1) {
      card.style.display = '';
      return;
    }
    var previous = cards[index - 1];
    var countText = previous && previous.querySelector('.compact-control strong');
    var count = parseInt((countText && countText.textContent ? countText.textContent : '0').trim(), 10) || 0;
    card.style.display = count > 0 ? '' : 'none';
  });
}

document.addEventListener('click', function (event) {
  var button = event.target && event.target.closest && event.target.closest('.page-count-card .compact-control button');
  if (!button || button.disabled) return;
  setTimeout(function () {
    clearAllBarMarks();
    syncPageCountCards();
  }, 30);
}, true);

syncPageCountCards();
setInterval(syncPageCountCards, 300);
