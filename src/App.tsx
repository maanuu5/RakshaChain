import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DispatchPage from './pages/DispatchPage'
import CheckpointPage from './pages/CheckpointPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkpoint/login" element={<LoginPage />} />
        <Route path="/dispatch" element={<DispatchPage />} />
        <Route path="/checkpoint" element={<CheckpointPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App