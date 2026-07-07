const originalPdfFetch = window.fetch.bind(window);

window.fetch = async (input, init = {}) => {
  const url = typeof input === 'string' ? input : input?.url || '';
  if (!url.includes('/api/cahier-pdf') || !init?.body) {
    return originalPdfFetch(input, init);
  }

  try {
    const payload = JSON.parse(init.body);
    if (!payload?.html) return originalPdfFetch(input, init);

    const parser = new DOMParser();
    const pdfDocument = parser.parseFromString(payload.html, 'text/html');

    pdfDocument.querySelectorAll('.homework-page').forEach((page) => {
      const header = page.firstElementChild;
      const progressWrap = header?.children?.[1];
      const progressBar = progressWrap?.children?.[0];

      if (!progressWrap || !progressBar) return;

      progressWrap.style.setProperty('width', '100%', 'important');
      progressWrap.style.setProperty('display', 'flex', 'important');
      progressWrap.style.setProperty('align-items', 'center', 'important');
      progressWrap.style.setProperty('justify-content', 'center', 'important');

      progressBar.style.setProperty('width', '75%', 'important');
      progressBar.style.setProperty('min-width', '0', 'important');
      progressBar.style.setProperty('max-width', '75%', 'important');
      progressBar.style.setProperty('flex', '0 0 75%', 'important');
      progressBar.style.setProperty('margin-left', 'auto', 'important');
      progressBar.style.setProperty('margin-right', 'auto', 'important');
    });

    payload.html = pdfDocument.documentElement.outerHTML;
    return originalPdfFetch(input, { ...init, body: JSON.stringify(payload) });
  } catch {
    return originalPdfFetch(input, init);
  }
};
