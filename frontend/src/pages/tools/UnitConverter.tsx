import { useState } from 'react'
import './UnitConverter.css'

type UnitType = 'length' | 'weight' | 'temperature'

interface Unit {
  name: string
  toBase: (value: number) => number
  fromBase: (value: number) => number
}

const lengthUnits: Unit[] = [
  { name: 'Metre', toBase: (v) => v, fromBase: (v) => v },
  { name: 'Kilometre', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { name: 'Santimetre', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  { name: 'Milimetre', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { name: 'İnç', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  { name: 'Fit', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  { name: 'Yard', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  { name: 'Mil', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
]

const weightUnits: Unit[] = [
  { name: 'Kilogram', toBase: (v) => v, fromBase: (v) => v },
  { name: 'Gram', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { name: 'Miligram', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
  { name: 'Ton', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { name: 'Pound', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
  { name: 'Ounce', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
]

function UnitConverter() {
  const [unitType, setUnitType] = useState<UnitType>('length')
  const [inputValue, setInputValue] = useState('')
  const [fromUnit, setFromUnit] = useState(0)
  const [toUnit, setToUnit] = useState(0)

  const units = unitType === 'length' ? lengthUnits : weightUnits

  const convert = () => {
    const value = parseFloat(inputValue)
    if (isNaN(value)) return
    const baseValue = units[fromUnit].toBase(value)
    const result = units[toUnit].fromBase(baseValue)
    return result
  }

  const result = convert()

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
  }

  return (
    <div className="unit-converter">
      <div className="tool-header">
        <h1>Unit Converter</h1>
        <p>Birimler arasında dönüşüm yapın</p>
      </div>

      <div className="unit-type-selector">
        <button 
          className={`type-btn ${unitType === 'length' ? 'active' : ''}`}
          onClick={() => setUnitType('length')}
        >
          Uzunluk
        </button>
        <button 
          className={`type-btn ${unitType === 'weight' ? 'active' : ''}`}
          onClick={() => setUnitType('weight')}
        >
          Ağırlık
        </button>
      </div>

      <div className="converter-card">
        <div className="converter-input-group">
          <label>Miktar</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Değer girin..."
          />
        </div>

        <div className="converter-units">
          <div className="unit-select">
            <label>From</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(parseInt(e.target.value))}>
              {units.map((unit, index) => (
                <option key={index} value={index}>{unit.name}</option>
              ))}
            </select>
          </div>

          <button className="swap-units-btn" onClick={swapUnits}>
            ⇄
          </button>

          <div className="unit-select">
            <label>To</label>
            <select value={toUnit} onChange={(e) => setToUnit(parseInt(e.target.value))}>
              {units.map((unit, index) => (
                <option key={index} value={index}>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="converter-result">
          <label>Sonuç</label>
          <div className="result-value">
            {result !== undefined ? result.toLocaleString('tr-TR', { maximumFractionDigits: 6 }) : '—'}
            {result !== undefined && <span className="result-unit">{units[toUnit].name}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitConverter
