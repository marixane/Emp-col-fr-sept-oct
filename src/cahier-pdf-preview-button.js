const DOWNLOAD_BUTTON_ID = 'cahier-pdf-button-stable';
const PREVIEW_BUTTON_ID = 'cahier-pdf-preview-button';

let previewRequested = false;
const originalAnchorClick = HTMLAnchorElement.prototype.click;

HTMLAnchorElement.prototype.click = function patchedAnchorClick() {
  if (previewRequested && String(this.href || '').startsWith('blob:')) {
    previewRequested = false;
    window.open(this.href, '_blank', 'noopener,noreferrer');
    return;
  }
  return originalAnchorClick.call(this);
};

const styleButtons = () => {
  const downloadButton = document.getElementById(DOWNLOAD_BUTTON_ID);
  if (!downloadButton) return;

  downloadButton.style.setProperty('right', '170px', 'important');
  downloadButton.style.setProperty('bottom', '22px', 'important');

  let previewButton = document.getElementById(PREVIEW_BUTTON_ID);
  if (!previewButton) {
    previewButton = document.createElement('button');
    previewButton.id = PREVIEW_BUTTON_ID;
    previewButton.type = 'button';
    previewButton.textContent = 'Voir PDF';
    previewButton.addEventListener('click', () => {
      const button = document.getElementById(DOWNLOAD_BUTTON_ID);
      if (!button || button.disabled) return;
      previewRequested = true;
      button.click();
    });
    document.body.append(previewButton);
  }

  previewButton.style.cssText = 'position:fixed!important;right:22px!important;bottom:22px!important;z-index:2147483647!important;display:block!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;background:#2563eb!important;color:#fff!important;border:0!important;border-radius:14px!important;padding:13px 18px!important;font:900 14px Arial,sans-serif!important;box-shadow:0 8px 25px rgba(0,0,0,.30)!important;cursor:pointer!important;';
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', styleButtons, { once: true });
} else {
  styleButtons();
}

window.setInterval(styleButtons, 1000);
