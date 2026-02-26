import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import './ColorPicker.css'

function ColorPicker() {
  const [color, setColor] = useState('#6366F1')
  const [copied, setCopied] = useState(false)

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Kopyalama hatası:', err)
    }
  }

  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  return (
    <div className="color-picker">
      <div className="tool-header">
        <h1>Color Picker</h1>
        <p>Renk seçin ve farklı formatlarda görüntüleyin</p>
      </div>

      <div className="color-picker-container">
        <div className="color-preview" style={{ backgroundColor: color }}>
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-input"
          />
        </div>

        <div className="color-values">
          <div className="color-value-item" onClick={() => copyToClipboard(color)}>
            <span className="label">HEX</span>
            <code className="value">{color}</code>
            <button className="copy-icon"><Copy size={14} /></button>
          </div>
          
          {rgb && (
            <div className="color-value-item" onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}>
              <span className="label">RGB</span>
              <code className="value">rgb({rgb.r}, {rgb.g}, {rgb.b})</code>
              <button className="copy-icon"><Copy size={14} /></button>
            </div>
          )}
          
          {hsl && (
            <div className="color-value-item" onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}>
              <span className="label">HSL</span>
              <code className="value">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</code>
              <button className="copy-icon"><Copy size={14} /></button>
            </div>
          )}
        </div>

        {copied && (
          <div className="copied-toast">
            <Check size={16} /> Kopyalandı!
          </div>
        )}
      </div>
    </div>
  )
}

export default ColorPicker
