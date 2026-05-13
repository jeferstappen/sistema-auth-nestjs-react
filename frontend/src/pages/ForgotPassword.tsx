import { useState } from 'react';
import { api } from '../services/api';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.message || 'Instruções enviadas para o seu e-mail!');
    } catch (err: any) {
      setMessage('Erro ao solicitar a recuperação. Verifique o e-mail digitado.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Esqueci a Senha</h1>
      <p style={{ textAlign: 'center' }}>Digite seu e-mail para receber o código de recuperação.</p>

      <form onSubmit={handleForgot} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {message && (
          <div style={{ 
            backgroundColor: '#e2e3e5', 
            color: 'black',     
            fontWeight: 'bold',
            padding: '0.75rem', 
            borderRadius: '4px', 
            textAlign: 'center' 
          }}>
            {message}
          </div>
        )}

        <input 
          type="email" 
          placeholder="Seu e-mail cadastrado" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #555' }} 
        />

        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Enviar Código
        </button>
      </form>
    </div>
  );
}