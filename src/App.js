import React, { useState } from 'react';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const parsePos = (line) => {
    const match = line.match(/setpos\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)/);
    if (match) {
      return {
        x: parseFloat(match[1]),
        y: parseFloat(match[2]),
        z: parseFloat(match[3])
      };
    }
    return null;
  };

  const distance = (a, b) => {
    return Math.sqrt(
      Math.pow(b.x - a.x, 2) +
      Math.pow(b.y - a.y, 2) +
      Math.pow(b.z - a.z, 2)
    );
  };

  const calculate = () => {
    const lines = input.split('\n');
    const positions = [];

    for (const line of lines) {
      const pos = parsePos(line.trim());
      if (pos) positions.push(pos);
    }

    if (positions.length < 2) {
      setResult('❌ Нужно хотя бы 2 точки.');
      return;
    }

    let totalUnits = 0;
    let output = '📍 Расчёты:\n\n';

    for (let i = 0; i < positions.length - 1; i++) {
      const d = distance(positions[i], positions[i + 1]);
      const meters = d * 0.01905;
      totalUnits += d;

      output += `Точка ${i+1} → ${i+2}:\n`;
      output += `  ${d.toFixed(2)} юнитов (${meters.toFixed(2)} м)\n\n`;
    }

    const totalMeters = totalUnits * 0.01905;
    output += `✅ Всего: ${totalUnits.toFixed(2)} юнитов (${totalMeters.toFixed(2)} м)`;

    setResult(output);
  };

  return (
    <div className="container">
      <h1>📏 Калькулятор расстояния для Garry's Mod</h1>
      <p>Вставьте строки из консоли (setpos):</p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="setpos -5000 3000 200;setang ..."
      />
      <button onClick={calculate}>Рассчитать</button>
      <pre className="output">{result}</pre>
    </div>
  );
}

export default App;