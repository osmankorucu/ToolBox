import { useState, useEffect } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'
import axios from 'axios'
import './PasswordGenerator.css'

function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [special, setSpecial] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const generatePassword = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        length: length.toString(),
        uppercase: uppercase.toString(),
        lowercase: lowercase.toString(),
        numbers: numbers.toString(),
        special: special.toString()
      })
      const response = await axios.get(`/api/tool/password/generate?${params}`)
      setPassword(response.data.result)
    } catch (err) {
      console.error('Şifre oluşturma hatası:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generatePassword()
  }, [])

  const copyToClipboard = async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Kopyalama hatası:', err)
    }
  }

  const getStrength = () => {
    let score = 0
    if (uppercase) score++
    if (lowercase) score++
    if (numbers) score++
    if (special) score++
    if (length >= 12) score++
    if (length >= 16) score++

    if (score <= 2) return { label: 'Zayıf', color: '#EF4444' }
    if (score <= 4) return { label: 'Orta', color: '#F59E0B' }
    return { label: 'Güçlü', color: '#10B981' }
  }

  const strength = getStrength()

  return (
    <div className="password-generator">
      <div className="tool-header">
        <h1>Password Generator</h1>
        <p>Güvenli parolalar oluşturun</p>
      </div>

      <div className="password-card">
        <div className="password-display">
          <code className="password-text">{password || 'Şifre oluşturuluyor...'}</code>
          <div className="password-actions">
            <button 
              className={`copy-btn ${copied ? 'copied' : ''}`} 
              onClick={copyToClipboard}
              disabled={!password}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <button 
              className="refresh-btn" 
              onClick={generatePassword}
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? 'spinning' : ''} />
            </button>
          </div>
        </div>

        <div className="strength-bar">
          <div className="strength-label">
            <span>Güvenlik:</span>
            <span style={{ color: strength.color }}>{strength.label}</span>
          </div>
          <div className="strength-track">
            <div 
              className="strength-fill" 
              style={{ 
                width: `${(strength.label === 'Zayıf' ? 33 : strength.label === 'Orta' ? 66 : 100)}%`,
                backgroundColor: strength.color 
              }} 
            />
          </div>
        </div>

        <div className="generator-settings">
          <div className="setting-item">
            <label>Şifre Uzunluğu: {length}</label>
            <input 
              type="range" 
              min="6" 
              max="64" 
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <div className="checkbox-group">
            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
              <span>Büyük Harf (A-Z)</span>
            </label>

            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
              />
              <span>Küçük Harf (a-z)</span>
            </label>

            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
              <span>Rakamlar (0-9)</span>
            </label>

            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={special}
                onChange={(e) => setSpecial(e.target.checked)}
              />
              <span>Özel Karakterler (!@#$...)</span>
            </label>
          </div>
        </div>

        <button 
          className="generate-btn"
          onClick={generatePassword}
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? 'spinning' : ''} />
          Yeni Şifre Oluştur
        </button>
      </div>
    </div>
  )
}

export default PasswordGenerator
