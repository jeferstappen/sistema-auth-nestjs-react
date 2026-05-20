import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { ActivateAccount } from './pages/ActivateAccount';
import { UserManagement } from './pages/UserManagement'; 

function NavBar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav style={{ 
      padding: '1.5rem', 
      backgroundColor: '#cc0000', 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '40px', 
      marginBottom: '3rem',
      boxShadow: '0px 4px 10px rgba(0,0,0,0.5)' 
    }}>
      {}
      {(path === '/' || path === '/usuarios') && (
        <>
          <Link to="/" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', fontSize: '18px' }}>Início</Link>
          <Link to="/usuarios" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', fontSize: '18px' }}>Gerenciar Usuários</Link>
        </>
      )}

      {path !== '/' && path !== '/usuarios' && path !== '/login' && (
        <Link to="/login" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', fontSize: '18px' }}>Login</Link>
      )}

      {path !== '/' && path !== '/usuarios' && path !== '/cadastro' && (
        <Link to="/cadastro" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', fontSize: '18px' }}>Cadastrar</Link>
      )}
    </nav>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <NavBar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/ativar" element={<ActivateAccount />} />
        <Route path="/esqueci-senha" element={<ForgotPassword />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
        <Route path="/usuarios" element={<UserManagement />} /> {}
      </Routes>
    </BrowserRouter>
  );
}

export default App;