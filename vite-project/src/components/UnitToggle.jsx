import { useState } from 'react';
import './UnitToggle.css';

function UnitToggle({ onUnitChange }) {
  const [unit, setUnit] = useState('metric'); // Make Celsius default

  const handleToggle = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric'; // Change unit
    setUnit(newUnit); 
    onUnitChange(newUnit);
  };

  return (
    <div className="unit-toggle-container">
      <label className="unit-toggle-switch">
        <input type="checkbox" checked={unit === 'imperial'} onChange={handleToggle} />
        <span className="unit-toggle-slider"></span>
      </label>
      <span className="unit-toggle-label">{unit === 'metric' ? '°C' : '°F'}</span>
    </div>
  );
}

export default UnitToggle;
