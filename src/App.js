import React, { useState } from 'react';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [showHelp, setShowHelp] = useState(false);

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
    <div className="app">
      {/* Шапка с изображением и логотипом */}
      <header className="app-header">
        <div className="logo-container">
          <img 
            src={`${process.env.PUBLIC_URL}/logo.png`} 
            alt="Postbellum Logo" 
            className="app-logo"
          />
          <h1 className="app-title">📏 Калькулятор дистанции</h1>
        </div>
      </header>
      <div className="app-header-body-border"/>
      {/* Основной контент */}
      <main className="app-main">
        <div className="content-wrapper">
          {/* Боковая информационная панель */}
        

          {/* Основной калькулятор */}
          <div className="calculator-container">
            <div className="container">
              <p>Вставьте строки из консоли (setpos):</p>
              
              <div className="input-group">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="setpos -5000 3000 200;setang ..."
                />
                <button onClick={calculate}>Рассчитать расстояние</button>
              </div>
              
              <pre className="output">{result}</pre>
            </div>
          </div>

          {!showHelp && (<button 
            className="help-toggle"
            onClick={() => setShowHelp(!showHelp)}
          >
            {showHelp ? '▼ Скрыть справку' : '📄'}
          </button>
          )}

          {showHelp && (<aside className="info-panel">
            <div className="info-content">
              <h2>ℹ️ Справка и инструкция</h2>
              
              <h3>🎮 Как получить координаты:</h3>
              <ol>
                <li>Открой консоль (<code>~</code>)</li>
                <li>Пропиши команду: <code>getpos</code></li>
                <li>Скопируй строку с <code>setpos</code></li>
                <li>Перемести персонажа и повтори</li>
              </ol>

              <h3>💻 Как использовать калькулятор:</h3>
              <ol>
                <li>Вставь все строки <code>setpos</code> слева</li>
                <li>Нажми "Рассчитать расстояние"</li>
                <li>Получи результат справа</li>
              </ol>

              <h3>🎯 Применение в бою:</h3>
              <ul>
                <li><strong>Дальность стрельбы:</strong> Проверка досягаемости оружия</li>
                <li><strong>Перемещение:</strong> Лимит метров за ход</li>
              </ul>

              <div className="example">
                <h4>📌 Пример ввода:</h4>
                <pre>{`setpos -5000 3000 200;setang 0 0 0
setpos -4500 3200 200;setang 0 0 0
setpos -4000 3400 250;setang 0 0 0`}</pre>
              </div>
            </div>
            <button 
            className="help-toggle"
            onClick={() => setShowHelp(!showHelp)}
          >
            x
          </button>
          </aside>)}
        </div>
      </main>
    </div>
  );
}

export default App;