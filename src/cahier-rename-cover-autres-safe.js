const renameAutresTitlesSafely = () => {
  document.querySelectorAll('.homework-cover-page h1, .homework-page div').forEach((node) => {
    if (String(node.textContent || '').trim().toUpperCase() === 'AUTRES') {
      node.textContent = '1 AC';
    }
  });
};

const scheduleRenameAutresTitles = () => window.requestAnimationFrame(renameAutresTitlesSafely);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleRenameAutresTitles, { once: true });
} else {
  scheduleRenameAutresTitles();
}

document.addEventListener('focusout', scheduleRenameAutresTitles, true);
document.addEventListener('click', (event) => {
  if (event.target?.closest?.('.cahier-tab, .timetable-table, .cahier-preview-zone')) scheduleRenameAutresTitles();
}, true);
