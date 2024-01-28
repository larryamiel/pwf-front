import { Route, Routes, Navigate } from 'react-router-dom'

// Layout
import GuestLayout from './layout/guest'
import DashboardLayout from './layout/dashboard'

// Pages
import NotFoundPage from './pages/not-found'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import DashboardPage from './pages/dashboard'
import ChatPage from './pages/chat'
import ChainFastingPage from './pages/chain-fasting'
import SchedulePage from './pages/schedule'

function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<Navigate to="login"/>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="chain-fasting" element={<ChainFastingPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
