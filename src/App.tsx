import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'
import { AppRoutes } from './routes/AppRoutes'

export function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContextProvider>
  )
}