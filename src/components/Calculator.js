import React, { useState } from 'react';
import { create, all } from 'mathjs';
import ConfettiExplosion from 'react-confetti-explosion';
import Button from './Button';
import Display from './Display';

const math = create(all);

const buttons = [
  ['(', ')', 'mc', 'm+', 'm-', 'mr', 'C'],
  ['2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x', '%'],
  ['1/x', '2√x', '3√x', 'y√x', 'ln', 'log10', '÷'],
  ['x!', 'sin', 'cos', 'tan', 'e', 'EE', '×'],
  ['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '-'],
  ['7', '8', '9', '4', '5', '6', '+'],
  ['1', '2', '3', '0', '.', '=', '+/-']
];

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [memory, setMemory] = useState(null);
  const [degreeMode, setDegreeMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setDisplay('');
      return;
    }

    if (value === '=') {
      try {
        let expr = display.replace('÷', '/').replace('×', '*');

        // Convert trigonometric functions from degrees to radians if in degree mode
        if (degreeMode) {
          expr = expr.replace(/sin\(([^)]+)\)/g, (match, p1) => `sin(${p1} * pi / 180)`);
          expr = expr.replace(/cos\(([^)]+)\)/g, (match, p1) => `cos(${p1} * pi / 180)`);
          expr = expr.replace(/tan\(([^)]+)\)/g, (match, p1) => `tan(${p1} * pi / 180)`);
        }

        const result = math.evaluate(expr);
        setDisplay(result.toString());
        if (display.includes('2') && display.includes('6')) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } catch {
        setDisplay('Error');
      }
      return;
    }

    if (value === 'Rand') {
      setDisplay((prev) => prev + Math.random().toString());
      return;
    }

    if (value === 'x^2') {
      setDisplay((prev) => `(${prev})^2`);
      return;
    }

    if (value === 'x^3') {
      setDisplay((prev) => `(${prev})^3`);
      return;
    }

    if (value === 'x^y') {
      setDisplay((prev) => `(${prev})^`);
      return;
    }

    if (value === '2√x') {
      setDisplay((prev) => `(${prev})^(1/2)`);
      return;
    }

    if (value === '3√x') {
      setDisplay((prev) => `(${prev})^(1/3)`);
      return;
    }

    if (value === 'y√x') {
      setDisplay((prev) => `(${prev})^(1/)`);
      return;
    }

    if (value === 'ln') {
      setDisplay((prev) => `ln(${prev})`);
      return;
    }

    if (value === 'log10') {
      setDisplay((prev) => `log10(${prev})`);
      return;
    }

    if (value === 'e^x') {
      setDisplay((prev) => `e^(${prev})`);
      return;
    }

    if (value === '10^x') {
      setDisplay((prev) => `10^(${prev})`);
      return;
    }

    // Handle trigonometric functions
    if (value === 'sin' || value === 'cos' || value === 'tan' || value === 'sinh' || value === 'cosh' || value === 'tanh') {
      setDisplay((prev) => `${value}(${prev})`);
      return;
    }

    if (value === 'π') {
      setDisplay((prev) => prev + 'pi');
      return;
    }

    if (value === 'e') {
      setDisplay((prev) => prev + 'e');
      return;
    }

    if (value === 'EE') {
      setDisplay((prev) => prev + 'E');
      return;
    }

    if (value === 'Rad') {
      setDegreeMode((prevMode) => !prevMode); // Toggle between degree and radian mode
      return;
    }

    if (value === 'x!') {
      try {
        const result = math.evaluate(`factorial(${display})`);
        setDisplay(result.toString());
      } catch {
        setDisplay('Error');
      }
      return;
    }

    if (value === '+/-') {
      setDisplay((prev) => {
        if (prev.startsWith('-')) {
          return prev.slice(1); // Remove the negative sign if already present
        } else {
          return '-' + prev; // Add a negative sign if not present
        }
      });
      return;
    }

    setDisplay((prev) => prev + value);
  };

  return (
    <div className="calculator">
      <Display value={display} />
      {showConfetti && <ConfettiExplosion />}
      <div className="buttons">
        {buttons.flat().map((btn, idx) => (
          <Button
            key={idx}
            value={btn}
            onClick={handleButtonClick}
            className={
              btn === 'C' || btn === '=' || btn === '÷' || btn === '×' || btn === '-' || btn === '+' || btn === '+/-'
                ? 'operator'
                : ''
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
