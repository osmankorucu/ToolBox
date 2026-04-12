import { Menu, Search } from 'lucide-react'
import './Header.css'

interface HeaderProps {
  onMenuClick: () => void
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Ara..." 
            className="search-input"
          />
        </div>
      </div>
      <div className="header-right">
        <div className="header-title">
          <h1>Multi-Tool Uygulaması</h1>
        </div>
      </div>
    </header>
  )
}

export default Header
