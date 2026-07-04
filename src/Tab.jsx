import { useState } from 'react';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const HOURS = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'];

const createRows = () => DAYS.map((day) => ({
  day,
  cells: HOURS.reduce((acc, hour) => ({ ...acc, [hour]: '' }), {})
}));

export default function Tab() {
  const [school, setSchool] = useState('Établissement :');
  const [teacher, setTeacher] = useState('Professeur :');
  const [year, setYear] = useState('Année scolaire : 2026 / 2027');
  const [hours, setHours] = useState(HOURS);
  const [rows, setRows] = useState(createRows);

  const updateHour = (index, value) => {
    const oldHour = hours[index];
    setHours((current) => current.map((hour, i) => i === index ? value : hour));
    setRows((current) => current.map((row) => {
      const nextCells = { ...row.cells, [value]: row.cells[oldHour] ?? '' };
      delete nextCells[oldHour];
      return { ...row, cells: nextCells };
    }));
  };

  const updateDay = (index, value) => {
    setRows((current) => current.map((row, i) => i === index ? { ...row, day: value } : row));
  };

  const updateCell = (dayIndex, hour, value) => {
    setRows((current) => current.map((row, i) => i === dayIndex ? {
      ...row,
      cells: { ...row.cells, [hour]: value }
    } : row));
  };

  return <main className="cahier-shell clean-cahier-shell">
    <section className="cahier-preview-zone">
      <div className="a4-page cahier-page">
        <header className="cahier-header">
          <input value={school} onChange={(e) => setSchool(e.target.value)} />
          <h2>Cahier de texte</h2>
          <input value={teacher} onChange={(e) => setTeacher(e.target.value)} />
          <input value={year} onChange={(e) => setYear(e.target.value)} />
        </header>

        <table className="timetable-table">
          <thead>
            <tr>
              <th>Jour</th>
              {hours.map((hour, index) => <th key={`${hour}-${index}`}>
                <textarea value={hour} onChange={(e) => updateHour(index, e.target.value)} rows="2" />
              </th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, dayIndex) => <tr key={dayIndex}>
              <td className="hour-cell day-cell">
                <textarea value={row.day} onChange={(e) => updateDay(dayIndex, e.target.value)} rows="2" />
              </td>
              {hours.map((hour, hourIndex) => <td key={`${hour}-${hourIndex}`}>
                <textarea
                  value={row.cells[hour] ?? ''}
                  onChange={(e) => updateCell(dayIndex, hour, e.target.value)}
                  placeholder="Classe / matière / salle"
                  rows="4"
                />
              </td>)}
            </tr>)}
          </tbody>
        </table>

        <footer className="cahier-footer">
          <span>Signature :</span>
          <span>Observations :</span>
        </footer>
      </div>
    </section>
  </main>;
}
