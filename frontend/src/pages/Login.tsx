import { useState } from 'react';
import { api } from '../services/api';
import { Link, useNavigate } from 'react-router-dom'; 

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); 

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.access_token;
      
      if (!token) {
        alert('Erro: O servidor não retornou um token de acesso válido!');
        return;
      }

      localStorage.setItem('access_token', token);
      
      // Alerta de sucesso restabelecido para diagnóstico
      alert('Login realizado com sucesso! Token armazenado no navegador.');
      
      // Força o redirecionamento para a Home
      navigate('/'); 
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Portal Verstappen - Login</h1>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {error && (
          <div style={{ backgroundColor: '#ffcccc', color: '#cc0000', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #555' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #555' }}
          />
          <Link 
            to="/esqueci-senha" 
            style={{ color: '#cc0000', marginTop: '0.5rem', fontSize: '14px', textDecoration: 'none', alignSelf: 'flex-end' }}
          >
            Esqueci minha senha?
          </Link>
        </div>

        <button 
          type="submit" 
          style={{ padding: '0.75rem', cursor: 'pointer', backgroundColor: '#cc0000', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '1rem' }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}