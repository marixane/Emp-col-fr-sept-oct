import { useEffect } from 'react';
import Tab from './Tab.jsx';

const addSchoolYearToDates = () => {
  document.querySelectorAll('.homework-date').forEach((element) => {
    const text = element.textContent.trim();
    if (/\/\d{4}(?:\b|\s|-)/.test(text)) return;

    element.textContent = text.replace(/(\d{2})\/(\d{2})(?!\/\d{4})/g, (match, day, month) => {
      const numericMonth = Number(month);
      const year = numericMonth >= 9 ? 2026 : 2027;
      return `${day}/${month}/${year}`;
    });
  });
};

export default function App() {
  useEffect(() => {
    document.body.classList.add('cahier-tab-active');
    document.body.classList.remove('devoir-tab-active');

    let scheduled = false;
    const scheduleDateUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        addSchoolYearToDates();
      });
    };

    scheduleDateUpdate();
    const observer = new MutationObserver(scheduleDateUpdate);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      observer.disconnect();
      document.body.classList.remove('cahier-tab-active');
    };
  }, []);

  return <>
    <style>{`
      table.timetable-table {
        position: relative !important;
        top: -150px !important;
        transform: none !important;
      }

      div.total-hours-control {
        transform: translateY(-100px) !important;
        z-index: 10 !important;
      }

      .cahier-page:not(.cahier-exams-groups-page) > div[style*="grid-template-columns: repeat(3, 1fr)"] {
        margin-top: 96px !important;
      }
    `}</style>
    <Tab />
  </>;
}