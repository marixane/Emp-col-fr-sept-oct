const addJuly10ExitEvent = () => {
  if (document.querySelector('[data-july10-exit-event="true"]')) return;

  const pages = Array.from(document.querySelectorAll('.homework-page'));
  const page = pages[pages.length - 1];
  if (!page) return;

  const entry = document.createElement('section');
  entry.className = 'homework-entry cahier-exam-entry cahier-lycee-inline-event';
  entry.dataset.sort = '20270710';
  entry.dataset.july10ExitEvent = 'true';
  entry.style.setProperty('--homework-color', '#38bdf8');
  entry.innerHTML = `
    <div class="homework-date" contenteditable="true">SAMEDI 10/07</div>
    <div class="homework-content">
      <div class="homework-subject"><div><span>Lycée</span><span></span></div></div>
      <div class="homework-text" contenteditable="true">Signature du Procès-verbal de sortie</div>
    </div>
  `;
  page.append(entry);
};

const scheduleJuly10ExitEvent = () => {
  window.requestAnimationFrame(addJuly10ExitEvent);
  window.setTimeout(addJuly10ExitEvent, 250);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleJuly10ExitEvent, { once: true });
} else {
  scheduleJuly10ExitEvent();
}

document.addEventListener('focusout', scheduleJuly10ExitEvent, true);
document.addEventListener('drop', scheduleJuly10ExitEvent, true);
document.addEventListener('click', (event) => {
  if (event.target?.closest?.('.timetable-table, .span-tools, .cahier-tab, .cahier-preview-zone')) scheduleJuly10ExitEvent();
}, true);
