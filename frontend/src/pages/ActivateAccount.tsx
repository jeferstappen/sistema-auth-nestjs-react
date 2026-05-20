import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export function ActivateAccount() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await api.get(`/auth/confirm?token=${token.trim()}`);
      
      alert('Conta ativada com sucesso! Pódio liberado. Vamos para o login.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Código inválido ou expirado.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Ativar Conta</h1>
      <p style={{ textAlign: 'center', color: '#ccc' }}>Insira o código de verificação enviado para o seu e-mail do Mailtrap.</p>

      <form onSubmit={handleActivate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && (
          <div style={{ backgroundColor: '#ffcccc', color: '#cc0000', padding: '0.5rem', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Código de Verificação:</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            placeholder="Cole o token aqui"
            style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '0.75rem', cursor: 'pointer', backgroundColor: '#cc0000', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
        >
          Confirmar Código
        </button>
      </form>
    </div>
  );
}