import { useState } from 'react'
import { Copy, Check, ArrowRightLeft } from 'lucide-react'
import axios from 'axios'
import './Base64Encoder.css'

function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const processText = async () => {
    if (!input.trim()) return
    
    setError('')
    const endpoint = mode === 'encode' ? '/api/tool/base64/encode' : '/api/tool/base64/decode'
    
    try {
      const response = await axios.post(endpoint, { text: input })
      if (response.data.error) {
        setError(response.data.error)
        setOutput('')
      } else {
        setOutput(response.data.result)
      }
    } catch (err: any) {
      setError('İşlem hatası: ' + (err.response?.data?.error || err.message))
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Kopyalama hatası:', err)
    }
  }

  const swapValues = () => {
    setInput(output)
    setOutput('')
    setError('')
  }

  return (
    <div className="base64-encoder">
      <div className="tool-header">
        <h1>Base64 Encoder/Decoder</h1>
        <p>Metinleri Base64 formatına dönüştürün veya çözün</p>
      </div>

      <div className="mode-switch">
        <button 
          className={`mode-btn ${mode === 'encode' ? 'active' : ''}`}
          onClick={() => setMode('encode')}
        >
          Encode
        </button>
        <button 
          className={`mode-btn ${mode === 'decode' ? 'active' : ''}`}
          onClick={() => setMode('decode')}
        >
          Decode
        </button>
      </div>

      <div className="editor-container">
        <div className="editor-section">
          <div className="editor-header">
            <span>Giriş</span>
            <button className="swap-btn" onClick={swapValues} disabled={!output} title="Değerleri değiştir">
              <ArrowRightLeft size={16} />
            </button>
          </div>
          <textarea
            className="editor-textarea"
            placeholder={mode === 'encode' ? 'Dönüştürülecek metin...' : 'Çözülecek Base64 metin...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="action-buttons">
          <button 
            className="action-btn primary" 
            onClick={processText}
            disabled={!input.trim()}
          >
            {mode === 'encode' ? 'Encode Et' : 'Decode Et'}
          </button>
        </div>

        <div className="editor-section">
          <div className="editor-header">
            <span>Çıkış</span>
            <button 
              className={`copy-btn ${copied ? 'copied' : ''}`} 
              onClick={copyToClipboard}
              disabled={!output}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Kopyalandı' : 'Kopyala'}
            </button>
          </div>
          <textarea
            className="editor-textarea output"
            placeholder="Sonuç burada görünecek..."
            value={output}
            readOnly
          />
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default Base64Encoder
