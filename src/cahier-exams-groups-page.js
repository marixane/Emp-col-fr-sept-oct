const SECOND_PAGE_ID = 'cahier-exams-groups-page';

const findTimetablePage = () => document.querySelector('.timetable-table')?.closest?.('.a4-page.cahier-page');

const findGroupsBlock = (page) => Array.from(page?.children || []).find((node) => {
  if (node.querySelector?.('.cahier-exams-list, .timetable-table')) return false;
  const text = String(node.textContent || '').toUpperCase();
  return text.includes('TRONC COMMUN') && text.includes('1ÈRES BAC') && text.includes('2ÈME BAC');
});

const makeSecondPage = () => {
  const timetablePage = findTimetablePage();
  if (!timetablePage) return;

  const examList = timetablePage.querySelector('.cahier-exams-list');
  const groups = findGroupsBlock(timetablePage);
  if (!examList || !groups) return;

  document.getElementById(SECOND_PAGE_ID)?.remove();

  const page = document.createElement('div');
  page.id = SECOND_PAGE_ID;
  page.className = 'a4-page cahier-page cahier-exams-groups-page';

  const title = document.createElement('div');
  title.className = 'cahier-exams-groups-main-title';
  title.textContent = 'Liste des examens et groupes';
  page.append(title);

  const examClone = examList.cloneNode(true);
  const groupsClone = groups.cloneNode(true);
  examClone.style.display = '';
  groupsClone.style.display = '';
  page.append(examClone, groupsClone);

  timetablePage.insertAdjacentElement('afterend', page);

  examList.style.setProperty('display', 'none', 'important');
  groups.style.setProperty('display', 'none', 'important');
};

const scheduleSecondPage = () => {
  window.requestAnimationFrame(makeSecondPage);
  window.setTimeout(makeSecondPage, 120);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleSecondPage, { once: true });
} else {
  scheduleSecondPage();
}

document.addEventListener('focusout', scheduleSecondPage, true);
document.addEventListener('drop', scheduleSecondPage, true);
document.addEventListener('click', (event) => {
  if (event.target?.closest?.('.timetable-table, .span-tools, .cahier-tab, .cahier-preview-zone')) scheduleSecondPage();
}, true);
