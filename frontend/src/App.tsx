import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

export function App() {
  return (
    <BrowserRouter>
      <nav style={{ 
        padding: '1.5rem', 
        backgroundColor: '#cc0000', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '40px', 
        marginBottom: '3rem',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.5)' 
      }}>
        <Link to="/" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', fontSize: '18px' }}>Login</Link>
        <Link to="/cadastro" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', fontSize: '18px' }}>Cadastrar</Link>
        {}
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/esqueci-senha" element={<ForgotPassword />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;