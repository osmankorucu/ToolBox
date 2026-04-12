import { Outlet } from 'react-router-dom'
import './LandingLayout.css'

function LandingLayout() {
  return (
    <div className="landing-layout">
      <Outlet />
    </div>
  )
}

export default LandingLayout
