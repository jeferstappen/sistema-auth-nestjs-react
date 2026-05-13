import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/reset-password', { token, newPassword });
      alert('Senha alterada com sucesso! Você já pode fazer login.');
      navigate('/');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Erro ao redefinir. O token pode estar inválido ou expirado.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Nova Senha</h1>

      <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {message && (
          <div style={{ backgroundColor: '#ffcccc', color: '#cc0000', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>
            {message}
          </div>
        )}

        <input 
          type="text" 
          placeholder="Token de recuperação" 
          value={token} 
          onChange={(e) => setToken(e.target.value)} 
          required 
          style={{ padding: '0.5rem' }} 
        />
        <input 
          type="password" 
          placeholder="Digite a nova senha" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required 
          style={{ padding: '0.5rem' }} 
        />

        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#17a2b8', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Salvar Nova Senha
        </button>
      </form>
    </div>
  );
}