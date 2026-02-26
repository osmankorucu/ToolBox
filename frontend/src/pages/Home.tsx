import { useState, useEffect } from 'react'
import { Code, Lock, Hash, Palette, Scale, Key, ArrowRight } from 'lucide-react'
import './Home.css'

interface Tool {
  id: string
  name: string
  icon: string
  category: string
  description: string
  route: string
}

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  code: Code,
  lock: Lock,
  hash: Hash,
  palette: Palette,
  scale: Scale,
  key: Key,
}

function Home() {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: 'json-formatter',
      name: 'JSON Formatter',
      icon: 'code',
      category: 'Geliştirici',
      description: 'JSON verilerinizi formatlayın ve doğrulayın',
      route: '/tools/json-formatter'
    },
    {
      id: 'base64',
      name: 'Base64 Encoder',
      icon: 'lock',
      category: 'Geliştirici',
      description: 'Metinleri Base64 formatına dönüştürün',
      route: '/tools/base64'
    },
    {
      id: 'uuid',
      name: 'UUID Generator',
      icon: 'hash',
      category: 'Geliştirici',
      description: 'Rastgele UUID oluşturun',
      route: '/tools/uuid'
    },
    {
      id: 'color',
      name: 'Color Picker',
      icon: 'palette',
      category: 'Tasarım',
      description: 'Renk seçin ve dönüştürün',
      route: '/tools/color'
    },
    {
      id: 'unit',
      name: 'Unit Converter',
      icon: 'scale',
      category: 'Genel',
      description: 'Birimler arasında dönüşüm yapın',
      route: '/tools/unit'
    },
    {
      id: 'password',
      name: 'Password Generator',
      icon: 'key',
      category: 'Güvenlik',
      description: 'Güvenli parolalar oluşturun',
      route: '/tools/password'
    }
  ])

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Code
    return Icon
  }

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="gradient-text">ToolBox</span>'a Hoş Geldiniz
        </h1>
        <p className="hero-subtitle">
          İhtiyacınız olan tüm araçlar tek bir yerde. Hızlı, kolay ve modern.
        </p>
      </div>

      <div className="tools-grid">
        {tools.map((tool, index) => {
          const Icon = getIcon(tool.icon)
          return (
            <a 
              key={tool.id} 
              href={tool.route} 
              className="tool-card"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="tool-icon-wrapper">
                <Icon size={24} />
              </div>
              <div className="tool-content">
                <span className="tool-category">{tool.category}</span>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-description">{tool.description}</p>
              </div>
              <div className="tool-arrow">
                <ArrowRight size={18} />
              </div>
            </a>
          )
        })}
      </div>

      <div className="coming-soon">
        <h2>Yakında Eklenecek Araçlar</h2>
        <div className="coming-soon-grid">
          <div className="coming-soon-item">QR Code Generator</div>
          <div className="coming-soon-item">URL Shortener</div>
          <div className="coming-soon-item">Lorem Ipsum Generator</div>
          <div className="coming-soon-item">Timestamp Converter</div>
        </div>
      </div>
    </div>
  )
}

export default Home
