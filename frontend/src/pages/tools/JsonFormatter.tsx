import { useState } from 'react'
import { Copy, Check, ArrowDownUp } from 'lucide-react'
import axios from 'axios'
import './JsonFormatter.css'

function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const formatJson = async () => {
    if (!input.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await axios.post('/api/tool/json/format', { json: input })
      if (response.data.error) {
        setError(response.data.error)
        setOutput('')
      } else {
        setOutput(response.data.result)
      }
    } catch (err: any) {
      setError('JSON formatlama hatası: ' + (err.response?.data?.error || err.message))
      setOutput('')
    } finally {
      setLoading(false)
    }
  }

  const minifyJson = async () => {
    if (!input.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await axios.post('/api/tool/json/minify', { json: input })
      if (response.data.error) {
        setError(response.data.error)
        setOutput('')
      } else {
        setOutput(response.data.result)
      }
    } catch (err: any) {
      setError('JSON minify hatası: ' + (err.response?.data?.error || err.message))
      setOutput('')
    } finally {
      setLoading(false)
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
    <div className="json-formatter">
      <div className="tool-header">
        <h1>JSON Formatter</h1>
        <p>JSON verilerinizi formatlayın veya minify edin</p>
      </div>

      <div className="editor-container">
        <div className="editor-section">
          <div className="editor-header">
            <span>Giriş (JSON)</span>
            <button className="swap-btn" onClick={swapValues} disabled={!output} title="Değerleri değiştir">
              <ArrowDownUp size={16} />
            </button>
          </div>
          <textarea
            className="editor-textarea"
            placeholder='{"ornek": "veri"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="action-buttons">
          <button 
            className="action-btn primary" 
            onClick={formatJson}
            disabled={loading || !input.trim()}
          >
            Formatla
          </button>
          <button 
            className="action-btn secondary" 
            onClick={minifyJson}
            disabled={loading || !input.trim()}
          >
            Minify
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

export default JsonFormatter
