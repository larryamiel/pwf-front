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
import FastPage from './pages/fast'
import SchedulePage from './pages/schedule'
import { AuthProvider } from './context/auth-context'

function App() {
  return (
    <AuthProvider>
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
          <Route path="fast" element={<FastPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
