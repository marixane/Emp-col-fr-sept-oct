const STORAGE_KEY = 'cahierCompactTimetablePdf';

const applyCompactTimetableState = (enabled) => {
  document.body.classList.toggle('compact-timetable-pdf', enabled);
  document.querySelectorAll('.timetable-table').forEach((table) => {
    table.classList.toggle('compact-pdf-hours', enabled);
  });
};

const arrangeTimetableControls = () => {
  const table = document.querySelector('.timetable-table');
  const total = document.querySelector('.total-hours-control');
  if (!table || !total) return null;

  const page = table.closest('.cahier-page');
  if (!page) return null;

  page.style.setProperty('position', 'relative', 'important');

  if (table.nextElementSibling !== total) {
    table.insertAdjacentElement('afterend', total);
  }

  total.style.setProperty('display', 'flex', 'important');
  total.style.setProperty('align-items', 'center', 'important');
  total.style.setProperty('justify-content', 'center', 'important');
  total.style.setProperty('width', 'fit-content', 'important');
  total.style.setProperty('min-width', '240px', 'important');
  total.style.setProperty('margin', '64px auto 0', 'important');
  total.style.setProperty('padding', '14px 28px', 'important');
  total.style.setProperty('border', '2px solid rgba(30,64,175,.22)', 'important');
  total.style.setProperty('border-radius', '16px', 'important');
  total.style.setProperty('background', 'linear-gradient(135deg,#eff6ff 0%,#ecfdf5 100%)', 'important');
  total.style.setProperty('box-shadow', '0 10px 24px rgba(15,23,42,.10)', 'important');
  total.style.setProperty('font-size', '20px', 'important');
  total.style.setProperty('font-weight', '800', 'important');
  total.style.setProperty('color', '#0f172a', 'important');
  total.style.setProperty('transform', 'translateX(200px)', 'important');

  return page;
};

const installCompactTimetableToggle = () => {
  const page = arrangeTimetableControls();
  if (!page) return;
  const table = page.querySelector('.timetable-table');
  const dayHeader = table?.tHead?.rows?.[0]?.cells?.[0];
  if (!dayHeader) return;

  let wrapper = document.getElementById('compact-timetable-pdf-toggle');
  if (!wrapper) {
    wrapper = document.createElement('label');
    wrapper.id = 'compact-timetable-pdf-toggle';
    wrapper.className = 'compact-timetable-pdf-toggle no-print';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = localStorage.getItem(STORAGE_KEY) !== '0';
    checkbox.setAttribute('aria-label', 'Réduire ou élargir le tableau');

    const icon = document.createElement('span');
    icon.className = 'compact-timetable-pdf-icon';
    icon.setAttribute('aria-hidden', 'true');

    const refreshAppearance = () => {
      icon.innerHTML = checkbox.checked
        ? '<svg viewBox="0 0 24 24" focusable="false"><path d="M9 9 5 5m0 0h4M5 5v4m10 0 4-4m0 0h-4m4 0v4M9 15l-4 4m0 0h4m-4 0v-4m10 0 4 4m0 0h-4m4 0v-4"/></svg>'
        : '<svg viewBox="0 0 24 24" focusable="false"><path d="M4 4l5 5m0 0V5m0 4H5m15-5-5 5m0 0h4m-4 0V5M4 20l5-5m0 0H5m4 0v4m11 1-5-5m0 0v4m0-4h4"/></svg>';
      wrapper.title = checkbox.checked ? 'Élargir le tableau' : 'Réduire le tableau';
      wrapper.setAttribute('aria-label', wrapper.title);
      wrapper.setAttribute('data-compact', checkbox.checked ? 'true' : 'false');
    };

    checkbox.addEventListener('change', () => {
      const enabled = checkbox.checked;
      localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
      applyCompactTimetableState(enabled);
      refreshAppearance();
    });

    wrapper.append(checkbox, icon);
    refreshAppearance();
  }

  if (wrapper.parentElement !== dayHeader) {
    dayHeader.replaceChildren(wrapper);
  }

  dayHeader.classList.add('compact-timetable-day-header');

  const checkbox = wrapper.querySelector('input');
  applyCompactTimetableState(Boolean(checkbox?.checked));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', installCompactTimetableToggle, { once: true });
} else {
  installCompactTimetableToggle();
}

new MutationObserver(installCompactTimetableToggle).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
