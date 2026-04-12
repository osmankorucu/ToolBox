import { useState, useRef, useEffect } from 'react'
import * as faceapi from 'face-api.js'
import { Upload, Download, RefreshCw, MousePointer2, ImageOff, Settings, X } from 'lucide-react'
import './FaceBlur.css'

interface SelectionRect {
  x: number
  y: number
  width: number
  height: number
}

function FaceBlur() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [detectedFaces, setDetectedFaces] = useState<faceapi.FaceDetection[]>([])
  const [manualSelections, setManualSelections] = useState<SelectionRect[]>([])
  const [blurLevel, setBlurLevel] = useState(20)
  const [isLoading, setIsLoading] = useState(false)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionStart, setSelectionStart] = useState<{ x: number; y: number } | null>(null)
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpg'>('png')

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadModels()
  }, [])

  useEffect(() => {
    if (image && modelsLoaded) {
      processImage()
    }
  }, [image, modelsLoaded])

  useEffect(() => {
    if (image && (detectedFaces.length > 0 || manualSelections.length > 0)) {
      drawResult()
    }
  }, [detectedFaces, manualSelections, blurLevel])

  const loadModels = async () => {
    setIsLoading(true)
    try {
      const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models'
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ])
      setModelsLoaded(true)
    } catch (error) {
      console.error('Model yükleme hatası:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setImage(img)
        setDetectedFaces([])
        setManualSelections([])
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const processImage = async () => {
    if (!image || !modelsLoaded) return

    setIsLoading(true)
    try {
      const detections = await faceapi.detectAllFaces(
        image,
        new faceapi.SsdMobilenetv1Options({ minConfidence: 0.3 })
      )
      setDetectedFaces(detections)
    } catch (error) {
      console.error('Yüz algılama hatası:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const drawResult = () => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = image.width
    canvas.height = image.height

    ctx.drawImage(image, 0, 0)

    const allRegions = [
      ...detectedFaces.map(d => ({
        x: d.box.x,
        y: d.box.y,
        width: d.box.width,
        height: d.box.height
      })),
      ...manualSelections
    ]

    allRegions.forEach(rect => {
      const padding = Math.min(rect.width, rect.height) * 0.1
      const x = Math.max(0, rect.x - padding / 2)
      const y = Math.max(0, rect.y - padding / 2)
      const w = Math.min(canvas.width - x, rect.width + padding)
      const h = Math.min(canvas.height - y, rect.height + padding)

      applyBlur(ctx, x, y, w, h, blurLevel)
    })
  }

  const applyBlur = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    const iterations = 2
    for (let i = 0; i < iterations; i++) {
      ctx.filter = `blur(${radius / iterations}px)`
      ctx.drawImage(ctx.canvas, x, y, width, height, x, y, width, height)
    }
    ctx.filter = 'none'
  }

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !image) return null

    const rect = canvasRef.current.getBoundingClientRect()
    const scaleX = image.width / rect.width
    const scaleY = image.height / rect.height

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e)
    if (!coords) return

    setIsSelecting(true)
    setSelectionStart(coords)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSelecting || !selectionStart || !canvasRef.current || !image) return

    const coords = getCanvasCoords(e)
    if (!coords) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    ctx.drawImage(image, 0, 0)

    const allRegions = [
      ...detectedFaces.map(d => ({
        x: d.box.x,
        y: d.box.y,
        width: d.box.width,
        height: d.box.height
      })),
      ...manualSelections,
      {
        x: Math.min(selectionStart.x, coords.x),
        y: Math.min(selectionStart.y, coords.y),
        width: Math.abs(coords.x - selectionStart.x),
        height: Math.abs(coords.y - selectionStart.y)
      }
    ]

    allRegions.forEach(rect => {
      const padding = Math.min(rect.width, rect.height) * 0.1
      const x = Math.max(0, rect.x - padding / 2)
      const y = Math.max(0, rect.y - padding / 2)
      const w = Math.min(image.width - x, rect.width + padding)
      const h = Math.min(image.height - y, rect.height + padding)

      applyBlur(ctx, x, y, w, h, blurLevel)
    })
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSelecting || !selectionStart || !canvasRef.current || !image) {
      setIsSelecting(false)
      setSelectionStart(null)
      return
    }

    const coords = getCanvasCoords(e)
    if (!coords) {
      setIsSelecting(false)
      setSelectionStart(null)
      return
    }

    const rect = {
      x: Math.min(selectionStart.x, coords.x),
      y: Math.min(selectionStart.y, coords.y),
      width: Math.abs(coords.x - selectionStart.x),
      height: Math.abs(coords.y - selectionStart.y)
    }

    if (rect.width > 10 && rect.height > 10) {
      setManualSelections([...manualSelections, rect])
    }

    setIsSelecting(false)
    setSelectionStart(null)
  }

  const removeManualSelection = (index: number) => {
    setManualSelections(manualSelections.filter((_, i) => i !== index))
  }

  const clearManualSelections = () => {
    setManualSelections([])
  }

  const clearAll = () => {
    setImage(null)
    setDetectedFaces([])
    setManualSelections([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const downloadImage = () => {
    if (!canvasRef.current) return

    const link = document.createElement('a')
    link.download = `face-blur-${Date.now()}.${downloadFormat}`
    link.href = canvasRef.current.toDataURL(`image/${downloadFormat}`, 0.95)
    link.click()
  }

  return (
    <div className="face-blur">
      <div className="tool-header">
        <h1>Face Blur</h1>
        <p>Resimlerdeki yüzleri algılayın veya manuel olarak seçip blur yapın</p>
      </div>

      {!modelsLoaded && !isLoading && (
        <div className="loading-message">Modeller yükleniyor...</div>
      )}

      {isLoading && modelsLoaded && (
        <div className="loading-message">Yüzler algılanıyor...</div>
      )}

      <div className="face-blur-content">
        <div className="controls-section">
          <div className="control-group">
            <label className="control-label">
              <Upload size={16} />
              Resim Yükle
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
          </div>

          <div className="control-group">
            <label className="control-label">
              <Settings size={16} />
              Blur Seviyesi: {blurLevel}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={blurLevel}
              onChange={(e) => setBlurLevel(Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="control-group">
            <label className="control-label">İndirme Formatı</label>
            <div className="format-buttons">
              <button
                className={`format-btn ${downloadFormat === 'png' ? 'active' : ''}`}
                onClick={() => setDownloadFormat('png')}
              >
                PNG
              </button>
              <button
                className={`format-btn ${downloadFormat === 'jpg' ? 'active' : ''}`}
                onClick={() => setDownloadFormat('jpg')}
              >
                JPG
              </button>
            </div>
          </div>

          {manualSelections.length > 0 && (
            <div className="control-group">
              <label className="control-label">Manuel Seçimler</label>
              <div className="selection-list">
                {manualSelections.map((_, index) => (
                  <div key={index} className="selection-item">
                    <span>Bölge {index + 1}</span>
                    <button
                      className="remove-btn"
                      onClick={() => removeManualSelection(index)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button className="clear-btn" onClick={clearManualSelections}>
                <RefreshCw size={14} />
                Tümünü Temizle
              </button>
            </div>
          )}

          {image && (
            <div className="action-buttons">
              <button className="action-btn secondary" onClick={clearAll}>
                <RefreshCw size={16} />
                Sıfırla
              </button>
              <button
                className="action-btn primary"
                onClick={downloadImage}
                disabled={!canvasRef.current}
              >
                <Download size={16} />
                İndir
              </button>
            </div>
          )}
        </div>

        <div className="canvas-section" ref={containerRef}>
          {image ? (
            <div className="canvas-wrapper">
              <canvas
                ref={canvasRef}
                className="result-canvas"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              />
              <div className="canvas-overlay-hint">
                <MousePointer2 size={14} />
                <span>Manuel seçim için sürükleyin</span>
              </div>
            </div>
          ) : (
            <div
              className="upload-placeholder"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={48} />
              <p>Resim yüklemek için tıklayın</p>
              <span>veya dosya seçin</span>
            </div>
          )}

          {!image && detectedFaces.length === 0 && modelsLoaded && (
            <div className="info-message">
              <ImageOff size={20} />
              <span>Yüz algılama otomatik olarak çalışacak</span>
            </div>
          )}
        </div>
      </div>

      {detectedFaces.length > 0 && (
        <div className="detection-info">
          <span className="detection-count">{detectedFaces.length} yüz algılandı</span>
          <span className="manual-hint">Manuel bölge eklemek için tuvalin üzerini sürükleyin</span>
        </div>
      )}
    </div>
  )
}

export default FaceBlur
