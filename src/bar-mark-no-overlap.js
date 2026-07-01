const BAR_MARK_MIN_GAP = 24;
const BAR_MARK_MIN_X_GAP = 46;
let barMarkSpacingTimer = null;

function numberValue(node) {
  const value = parseFloat(String(node.style.top || '').replace('px', ''));
  return Number.isFinite(value) ? value : node.offsetTop || 0;
}

function xValue(node) {
  const value = parseFloat(String(node.style.left || '').replace('px', ''));
  return Number.isFinite(value) ? value : node.offsetLeft || 0;
}

function keepBarMarksSeparated() {
  document.querySelectorAll('.exam-exercise').forEach(function (exercise) {
    const marks = Array.from(exercise.querySelectorAll('.bar-mark'));
    if (marks.length < 2) return;

    const sorted = marks
      .map(function (node, index) { return { node: node, index: index, top: numberValue(node), left: xValue(node) }; })
      .sort(function (a, b) { return a.top - b.top || a.index - b.index; });

    sorted.forEach(function (item, order) {
      item.node.style.zIndex = String(80 + order);
    });

    for (let i = 1; i < sorted.length; i += 1) {
      const previous = sorted[i - 1];
      const current = sorted[i];
      const closeVertically = current.top - previous.top < BAR_MARK_MIN_GAP;
      const closeHorizontally = Math.abs(current.left - previous.left) < BAR_MARK_MIN_X_GAP;

      if (closeVertically && closeHorizontally) {
        current.top = previous.top + BAR_MARK_MIN_GAP;
        current.node.style.top = current.top + 'px';
      }
    }
  });
}

function scheduleBarMarkSpacing(delay) {
  clearTimeout(barMarkSpacingTimer);
  barMarkSpacingTimer = setTimeout(keepBarMarksSeparated, delay || 0);
}

window.addEventListener('mouseup', function () {
  scheduleBarMarkSpacing(40);
});

document.addEventListener('click', function (event) {
  if (event.target && event.target.closest && (event.target.closest('.bar-mark') || event.target.closest('.bar-buttons'))) {
    scheduleBarMarkSpacing(60);
  }
});

window.keepBarMarksSeparated = keepBarMarksSeparated;
window.scheduleBarMarkSpacing = scheduleBarMarkSpacing;
