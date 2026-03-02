import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import './ToolLayout.css'

const toolNames: Record<string, string> = {
  'json-formatter': 'JSON Formatter',
  'base64': 'Base64 Encoder/Decoder',
  'uuid': 'UUID Generator',
  'color': 'Color Picker',
  'unit': 'Unit Converter',
  'password': 'Password Generator',
  'face-blur': 'Face Blur'
}

function ToolLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const getCurrentToolName = () => {
    const path = location.pathname.split('/').pop() || ''
    return toolNames[path] || 'Tool'
  }

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="tool-header-bar">
          <div className="tool-header-left">
            <button className="menu-button" onClick={toggleSidebar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <button className="back-button" onClick={() => navigate('/')}>
              <ArrowLeft size={18} />
              <span>Ana Sayfaya Dön</span>
            </button>
          </div>
          <div className="tool-header-right">
            <h1 className="tool-title">{getCurrentToolName()}</h1>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default ToolLayout
