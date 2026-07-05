import html2canvas from 'html2canvas';

const capture = async (node, options = {}, output = 'jpeg') => {
  const rect = node.getBoundingClientRect();
  const canvas = await html2canvas(node, {
    backgroundColor: options.backgroundColor || '#ffffff',
    scale: options.pixelRatio || 1,
    useCORS: false,
    allowTaint: false,
    logging: false,
    imageTimeout: 8000,
    removeContainer: true,
    foreignObjectRendering: false,
    width: options.width || Math.ceil(rect.width || node.offsetWidth),
    height: options.height || Math.ceil(rect.height || node.offsetHeight),
    onclone: (doc) => {
      doc.querySelectorAll('script, style, link').forEach((el) => el.remove());
      doc.querySelectorAll('textarea').forEach((textarea) => {
        textarea.textContent = textarea.value;
        textarea.setAttribute('value', textarea.value);
      });
      doc.querySelectorAll('input').forEach((input) => input.setAttribute('value', input.value));
    }
  });
  return output === 'png' ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', options.quality || 0.95);
};

export const toJpeg = (node, options = {}) => capture(node, options, 'jpeg');
export const toPng = (node, options = {}) => capture(node, options, 'png');
