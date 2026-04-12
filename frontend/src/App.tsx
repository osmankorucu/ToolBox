import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingLayout from './layouts/LandingLayout'
import ToolLayout from './layouts/ToolLayout'
import Landing from './pages/Landing'
import JsonFormatter from './pages/tools/JsonFormatter'
import Base64Encoder from './pages/tools/Base64Encoder'
import UuidGenerator from './pages/tools/UuidGenerator'
import ColorPicker from './pages/tools/ColorPicker'
import UnitConverter from './pages/tools/UnitConverter'
import PasswordGenerator from './pages/tools/PasswordGenerator'
import FaceBlur from './pages/tools/FaceBlur'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path="/tools" element={<ToolLayout />}>
          <Route path="json-formatter" element={<JsonFormatter />} />
          <Route path="base64" element={<Base64Encoder />} />
          <Route path="uuid" element={<UuidGenerator />} />
          <Route path="color" element={<ColorPicker />} />
          <Route path="unit" element={<UnitConverter />} />
          <Route path="password" element={<PasswordGenerator />} />
          <Route path="face-blur" element={<FaceBlur />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
