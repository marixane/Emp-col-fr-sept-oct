var previousTitleMode = null;
var activateBarOnceOnIndividualClick = false;

function getTitleModeValue() {
  var title = document.querySelector('.title-line-top');
  return ((title && (title.value || title.textContent)) || '').trim();
}

function getTitleModeKind() {
  var value = getTitleModeValue();
  if (value === 'Devoir libre' || value === 'Devoir à la maison' || value === 'فرض منزلي') return 'free';
  if (value === 'Devoir individuel' || value === 'فرض محروس') return 'individual';
  return 'other';
}

function isFreeModeActive() {
  var notes = document.querySelector('.note-scale-control:not(.homework-disabled-note)');
  if (!notes) return false;

  return getTitleModeKind() === 'free';
}

function isIndividualModeActive() {
  return getTitleModeKind() === 'individual';
}

function isIndividualButton(node) {
  var button = node && node.closest && node.closest('button');
  if (!button) return false;
  var text = (button.textContent || '').replace(/\s+/g, ' ').trim();
  return text === 'Individuel' || text === 'Devoir individuel' || text === 'فرض محروس';
}

function updateDisplay(node, hidden) {
  if (!node) return;
  if (hidden) node.style.display = 'none';
  else node.style.display = '';
}

function syncFreeModeBodyClass() {
  if (!document.body) return;
  document.body.classList.toggle('no-title-points', isFreeModeActive());
}

function syncFreeModeBarRibbon(freeMode) {
  var button = document.querySelector('.bar-ribbon-toggle');
  if (!button) return;

  var currentMode = getTitleModeKind();
  var shouldActivateOnce = currentMode === 'individual' && (activateBarOnceOnIndividualClick || previousTitleMode === 'free');

  if (freeMode && button.classList.contains('on')) {
    button.click();
  }

  if (shouldActivateOnce && button.classList.contains('off')) {
    button.click();
  }

  if (currentMode === 'individual') activateBarOnceOnIndividualClick = false;

  button.disabled = !!freeMode;
  button.setAttribute('aria-disabled', freeMode ? 'true' : 'false');
  button.style.pointerEvents = freeMode ? 'none' : '';
  button.style.opacity = freeMode ? '0.45' : '';
  button.style.cursor = freeMode ? 'not-allowed' : '';
  button.title = freeMode ? 'Barème désactivé en devoir libre' : '';

  previousTitleMode = currentMode;
}

function cleanFreeModeExerciseTitles() {
  var freeMode = isFreeModeActive();
  syncFreeModeBodyClass();
  syncFreeModeBarRibbon(freeMode);

  document.querySelectorAll('.exam-exercise:not(.blank-exercise) .exercise-title-controls').forEach(function (title) {
    var span = title.querySelector('span:first-child');
    var text = (span && span.textContent) || '';
    var match = text.match(/(Exercice|تمرين)\s*(\d+)/i);

    if (freeMode && span && match) span.textContent = match[1] + ' ' + match[2] + ' :';

    title.querySelectorAll('button, strong, .points-decoration').forEach(function (node) {
      updateDisplay(node, freeMode);
    });
  });
}

function syncFreeModeClean() {
  cleanFreeModeExerciseTitles();
}

syncFreeModeClean();
setTimeout(syncFreeModeClean, 100);
setTimeout(syncFreeModeClean, 300);
setTimeout(syncFreeModeClean, 700);

window.setInterval(syncFreeModeClean, 400);

document.addEventListener('click', function (event) {
  if (isIndividualButton(event.target)) activateBarOnceOnIndividualClick = true;
  setTimeout(syncFreeModeClean, 20);
  setTimeout(syncFreeModeClean, 80);
  setTimeout(syncFreeModeClean, 250);
});

document.addEventListener('input', function () {
  setTimeout(syncFreeModeClean, 20);
  setTimeout(syncFreeModeClean, 80);
});

window.cleanFreeModeExerciseTitles = cleanFreeModeExerciseTitles;
window.syncFreeModeBodyClass = syncFreeModeBodyClass;
window.syncFreeModeBarRibbon = syncFreeModeBarRibbon;
