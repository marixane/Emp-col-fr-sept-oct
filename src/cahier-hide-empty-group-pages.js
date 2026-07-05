const getEventDateValue = (text) => {
  const match = String(text || '').match(/\b(\d{2})\/(\d{2})\b/);
  if (!match) return 0;
  const day = Number(match[1]);
  const month = Number(match[2]);
  return (month >= 9 ? 0 : 10000) + month * 100 + day;
};

const getAllowedGroupCounts = () => {
  const timetablePage = Array.from(document.querySelectorAll('.cahier-page')).find((page) => page.querySelector('.timetable-table'));
  const groupsWrap = Array.from(timetablePage?.children || []).find((child) => String(child.getAttribute('style') || '').includes('grid-template-columns: repeat(5'));
  const counts = new Map();

  Array.from(groupsWrap?.children || []).forEach((group) => {
    const title = String(group.children?.[0]?.textContent || '').trim();
    const hasClass = Boolean(group.children?.[1]?.querySelector('span'));
    if (!title || !hasClass) return;
    counts.set(title, (counts.get(title) || 0) + 1);
  });

  return counts;
};

const hideEmptyGroupHomeworkPages = () => {
  if (!document.body.classList.contains('cahier-tab-active')) return;

  const allowedCounts = getAllowedGroupCounts();
  const usedBlocks = new Map();
  const lastDateByTitle = new Map();
  let previousTitle = '';

  Array.from(document.querySelectorAll('.homework-page')).forEach((page) => {
    const title = String(page.querySelector('[style*="text-transform: uppercase"]')?.textContent || '').trim();
    const firstDate = getEventDateValue(page.querySelector('.homework-date')?.textContent || '');
    const allowed = allowedCounts.get(title) || 0;

    const isNewBlock = title !== previousTitle || firstDate <= (lastDateByTitle.get(title) || 0);
    if (isNewBlock) usedBlocks.set(title, (usedBlocks.get(title) || 0) + 1);

    const currentBlock = usedBlocks.get(title) || 1;
    page.style.display = allowed > 0 && currentBlock <= allowed ? '' : 'none';

    previousTitle = title;
    lastDateByTitle.set(title, firstDate);
  });
};

const scheduleHideEmptyGroupHomeworkPages = () => window.requestAnimationFrame(hideEmptyGroupHomeworkPages);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleHideEmptyGroupHomeworkPages, { once: true });
} else {
  scheduleHideEmptyGroupHomeworkPages();
}

document.addEventListener('input', (event) => {
  if (event.target?.closest?.('.timetable-table')) window.setTimeout(scheduleHideEmptyGroupHomeworkPages, 120);
}, { passive: true });
document.addEventListener('drop', () => window.setTimeout(scheduleHideEmptyGroupHomeworkPages, 150), { passive: true });
document.addEventListener('mouseup', () => window.setTimeout(scheduleHideEmptyGroupHomeworkPages, 150), { passive: true });
