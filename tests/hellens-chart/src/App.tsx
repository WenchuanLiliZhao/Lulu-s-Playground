import { Routes, Route, Navigate } from 'react-router-dom'
import SalesEventTrendPage_V1 from './SalesEventTrend_V1'

function App() {
  return (
    <Routes>
      <Route path="/" element={SalesEventTrendPage_V1.content} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
