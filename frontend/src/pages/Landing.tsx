import { FileJson, Lock, Fingerprint, Palette, Scale, ShieldCheck, ScanFace, LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

interface Tool {
  id: string
  name: string
  description: string
  route: string
  icon: LucideIcon
  gradient: string
  gradientFrom: string
  gradientTo: string
}

const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'JSON verilerinizi formatlayın ve minify edin',
    route: '/tools/json-formatter',
    icon: FileJson,
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
    gradientFrom: '#6366F1',
    gradientTo: '#8B5CF6'
  },
  {
    id: 'base64',
    name: 'Base64',
    description: 'Metinleri Base64 formatına dönüştürün',
    route: '/tools/base64',
    icon: Lock,
    gradient: 'linear-gradient(135deg, #10B981, #14B8A6)',
    gradientFrom: '#10B981',
    gradientTo: '#14B8A6'
  },
  {
    id: 'uuid',
    name: 'UUID Generator',
    description: 'Benzersiz UUID oluşturun',
    route: '/tools/uuid',
    icon: Fingerprint,
    gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    gradientFrom: '#3B82F6',
    gradientTo: '#06B6D4'
  },
  {
    id: 'color',
    name: 'Color Picker',
    description: 'Renk seçin ve farklı formatlarda kullanın',
    route: '/tools/color',
    icon: Palette,
    gradient: 'linear-gradient(135deg, #EC4899, #F43F5E)',
    gradientFrom: '#EC4899',
    gradientTo: '#F43F5E'
  },
  {
    id: 'unit',
    name: 'Unit Converter',
    description: 'Birimler arasında kolayca dönüştürün',
    route: '/tools/unit',
    icon: Scale,
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    gradientFrom: '#F59E0B',
    gradientTo: '#FBBF24'
  },
  {
    id: 'password',
    name: 'Password Generator',
    description: 'Güvenli parolalar oluşturun',
    route: '/tools/password',
    icon: ShieldCheck,
    gradient: 'linear-gradient(135deg, #22C55E, #10B981)',
    gradientFrom: '#22C55E',
    gradientTo: '#10B981'
  },
  {
    id: 'face-blur',
    name: 'Face Blur',
    description: 'Resimlerdeki yüzleri tespit edin ve bulanıklaştırın',
    route: '/tools/face-blur',
    icon: ScanFace,
    gradient: 'linear-gradient(135deg, #8B5CF6, #D946EF)',
    gradientFrom: '#8B5CF6',
    gradientTo: '#D946EF'
  }
]

function Landing() {
  const navigate = useNavigate()

  const handleToolClick = (route: string) => {
    const card = document.activeElement as HTMLElement
    card?.classList.add('clicked')
    setTimeout(() => {
      navigate(route)
    }, 300)
  }

  return (
    <div className="landing">
      <div className="landing-hero">
        <div className="landing-logo">
          <div className="logo-icon-wrapper">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V9C20 9.55228 19.5523 10 19 10H5C4.44772 10 4 9.55228 4 9V5Z" fill="currentColor"/>
              <path d="M4 15C4 14.4477 4.44772 14 5 14H19C19.5523 14 20 14.4477 20 15V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V15Z" fill="currentColor" fillOpacity="0.6"/>
              <path d="M8 7H16M8 17H12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="landing-title">ToolBox</h1>
        </div>
        <p className="landing-subtitle">Tüm ihtiyaçınız olan araçlar tek bir yerde</p>
        <div className="landing-scroll-hint">
          <span>Keşfetmek için aşağı kaydırın</span>
          <div className="scroll-indicator"></div>
        </div>
      </div>

      <div className="landing-tools">
        <h2 className="tools-heading">Araçlar</h2>
        <div className="tools-grid">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <button
                key={tool.id}
                className="tool-card"
                onClick={() => handleToolClick(tool.route)}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div 
                  className="tool-icon-bg"
                  style={{ background: tool.gradient }}
                >
                  <span className="tool-icon">
                    <Icon size={32} />
                  </span>
                </div>
                <div className="tool-info">
                  <h3 className="tool-name">{tool.name}</h3>
                  <p className="tool-desc">{tool.description}</p>
                </div>
                <div className="tool-card-glow" style={{ '--glow-color': tool.gradientFrom } as React.CSSProperties}></div>
              </button>
            )
          })}
        </div>
      </div>

      <footer className="landing-footer">
        <p>© 2026 ToolBox - Tüm hakları saklıdır</p>
      </footer>
    </div>
  )
}

export default Landing
