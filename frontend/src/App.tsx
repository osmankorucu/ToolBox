import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
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
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="tools/json-formatter" element={<JsonFormatter />} />
          <Route path="tools/base64" element={<Base64Encoder />} />
          <Route path="tools/uuid" element={<UuidGenerator />} />
          <Route path="tools/color" element={<ColorPicker />} />
          <Route path="tools/unit" element={<UnitConverter />} />
          <Route path="tools/password" element={<PasswordGenerator />} />
          <Route path="tools/face-blur" element={<FaceBlur />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
