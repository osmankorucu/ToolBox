import { NavLink } from 'react-router-dom'
import { X, Code, Lock, Palette, Scale, Hash, Key } from 'lucide-react'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const tools = [
  { id: 'json-formatter', name: 'JSON Formatter', icon: Code, path: '/tools/json-formatter', category: 'Geliştirici' },
  { id: 'base64', name: 'Base64 Encoder', icon: Lock, path: '/tools/base64', category: 'Geliştirici' },
  { id: 'uuid', name: 'UUID Generator', icon: Hash, path: '/tools/uuid', category: 'Geliştirici' },
  { id: 'color', name: 'Color Picker', icon: Palette, path: '/tools/color', category: 'Tasarım' },
  { id: 'unit', name: 'Unit Converter', icon: Scale, path: '/tools/unit', category: 'Genel' },
  { id: 'password', name: 'Password Generator', icon: Key, path: '/tools/password', category: 'Güvenlik' },
]

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <Code size={24} />
            </div>
            <span className="logo-text">ToolBox</span>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">Araçlar</h3>
            <ul className="nav-list">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <NavLink
                    to={tool.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => window.innerWidth <= 768 && onClose()}
                  >
                    <tool.icon size={18} className="nav-icon" />
                    <span className="nav-text">{tool.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <p className="sidebar-version">v1.0.0</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
