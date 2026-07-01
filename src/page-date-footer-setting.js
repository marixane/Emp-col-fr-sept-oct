const DATE_STORAGE_KEY = 'exam-page-date-value';
const DATE_VISIBLE_KEY = 'exam-page-date-visible';

function todayText() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return dd + '/' + mm + '/' + yyyy;
}

function textToDateInputValue(value) {
  const match = String(value || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return '';
  return match[3] + '-' + match[2] + '-' + match[1];
}

function dateInputValueToText(value) {
  const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value || '';
  return match[3] + '/' + match[2] + '/' + match[1];
}

function getDateValue() {
  return localStorage.getItem(DATE_STORAGE_KEY) || todayText();
}

function isDateVisible() {
  return localStorage.getItem(DATE_VISIBLE_KEY) !== 'false';
}

function setDateValue(value) {
  localStorage.setItem(DATE_STORAGE_KEY, value || '');
  updatePageDates();
}

function setDateVisible(visible) {
  localStorage.setItem(DATE_VISIBLE_KEY, visible ? 'true' : 'false');
  document.body.classList.toggle('hide-page-date', !visible);
  updateDateControlState();
}

function updatePageDates() {
  const value = getDateValue();
  document.querySelectorAll('.a4-page').forEach(function (page) {
    let node = page.querySelector(':scope > .page-date');
    if (!node) {
      node = document.createElement('div');
      node.className = 'page-date';
      page.appendChild(node);
    }
    node.textContent = value;
  });
}

function updateDateControlState() {
  const control = document.querySelector('.page-date-control');
  if (!control) return;
  const visible = isDateVisible();
  control.classList.toggle('on', visible);
  control.classList.toggle('off', !visible);
}

function ensureDateControl() {
  const panel = document.querySelector('.panel');
  if (!panel || panel.querySelector('.page-date-control')) return;

  const control = document.createElement('div');
  control.className = 'page-date-control';
  control.addEventListener('click', function (event) {
    if (event.target && event.target.classList && event.target.classList.contains('page-date-input')) return;
    setDateVisible(!isDateVisible());
  });

  const title = document.createElement('span');
  title.className = 'page-date-title';
  title.textContent = 'Date :';

  const input = document.createElement('input');
  input.className = 'page-date-input';
  input.type = 'date';
  input.value = textToDateInputValue(getDateValue()) || textToDateInputValue(todayText());
  input.addEventListener('click', function (event) {
    event.stopPropagation();
    if (!isDateVisible()) setDateVisible(true);
    if (typeof input.showPicker === 'function') input.showPicker();
  });
  input.addEventListener('input', function () {
    setDateValue(dateInputValueToText(input.value));
  });
  input.addEventListener('change', function () {
    setDateValue(dateInputValueToText(input.value));
  });

  control.appendChild(title);
  control.appendChild(input);

  const after = panel.querySelector('.form-group');
  if (after && after.nextSibling) panel.insertBefore(control, after.nextSibling);
  else panel.appendChild(control);

  updateDateControlState();
}

function syncPageDateFeature() {
  if (!document.body) return;
  document.body.classList.toggle('hide-page-date', !isDateVisible());
  ensureDateControl();
  updatePageDates();
}

syncPageDateFeature();
setTimeout(syncPageDateFeature, 200);
setTimeout(syncPageDateFeature, 700);

document.addEventListener('click', function () {
  setTimeout(syncPageDateFeature, 80);
});

window.syncPageDateFeature = syncPageDateFeature;
