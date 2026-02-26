import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'
import axios from 'axios'
import './UuidGenerator.css'

function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateUuids = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/tool/uuid/generate?count=${count}`)
      const result = response.data.result
      const uuidList = result.split('\n').filter(u => u.trim())
      setUuids(uuidList)
    } catch (err) {
      console.error('UUID oluşturma hatası:', err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!uuids.length) return
    try {
      await navigator.clipboard.writeText(uuids.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Kopyalama hatası:', err)
    }
  }

  return (
    <div className="uuid-generator">
      <div className="tool-header">
        <h1>UUID Generator</h1>
        <p>Rastgele UUID oluşturun</p>
      </div>

      <div className="generator-controls">
        <div className="count-input">
          <label>UUID Sayısı:</label>
          <input 
            type="number" 
            min="1" 
            max="100" 
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
          />
        </div>
        
        <button 
          className="generate-btn" 
          onClick={generateUuids}
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? 'spinning' : ''} />
          {loading ? 'Oluşturuluyor...' : 'Oluştur'}
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="uuid-output">
          <div className="uuid-header">
            <span>{uuids.length} UUID</span>
            <button 
              className={`copy-btn ${copied ? 'copied' : ''}`} 
              onClick={copyToClipboard}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Kopyalandı' : 'Tümünü Kopyala'}
            </button>
          </div>
          <div className="uuid-list">
            {uuids.map((uuid, index) => (
              <div key={index} className="uuid-item">
                <code>{uuid}</code>
                <button 
                  className="copy-single"
                  onClick={() => navigator.clipboard.writeText(uuid)}
                  title="Kopyala"
                >
                  <Copy size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uuids.length === 0 && !loading && (
        <div className="empty-state">
          <p>UUID oluşturmak için "Oluştur" butonuna tıklayın</p>
        </div>
      )}
    </div>
  )
}

export default UuidGenerator
