function simplifyNoteCounter() {
  document.querySelectorAll('.note-scale-counter').forEach(function (counter) {
    var text = counter.textContent || '';
    var match = text.match(/Total\s*:\s*([0-9]+(?:[,.][0-9]+)?)/i);
    if (!match) return;
    counter.textContent = 'Total : ' + match[1].replace('.', ',') + ' Pts';
  });
}

simplifyNoteCounter();
setTimeout(simplifyNoteCounter, 100);
setTimeout(simplifyNoteCounter, 400);

new MutationObserver(function () {
  simplifyNoteCounter();
}).observe(document.body, { childList: true, subtree: true, characterData: true });
