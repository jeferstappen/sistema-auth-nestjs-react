import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
     
      await api.post('/users', { username, email, password, firstName, lastName });
      
      alert('Usuário cadastrado com sucesso! Verifique o Mailtrap para obter o código de verificação.');
      
      navigate('/ativar'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar o cadastro.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Portal Verstappen - Cadastro</h1>

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {error && (
          <div style={{ backgroundColor: '#ffcccc', color: '#cc0000', padding: '0.5rem', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Nome:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #555' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Sobrenome:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #555' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Nome de Usuário (Username):</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #555' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>E-mail:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #555' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #555' }} />
        </div>

        <button type="submit" style={{ padding: '0.75rem', cursor: 'pointer', backgroundColor: '#cc0000', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginTop: '1rem' }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}