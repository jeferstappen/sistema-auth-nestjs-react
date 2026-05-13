import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('As senhas não coincidem!');
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      
      await api.post('/users', dataToSend);
      
      alert('Cadastro realizado com sucesso! Verifique seu e-mail para ativar a conta (olhe o Mailtrap).');
      navigate('/'); 
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Novo Cadastro</h1>

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && (
          <div style={{ backgroundColor: '#ffcccc', color: '#cc0000', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <input type="text" name="firstName" placeholder="Nome" onChange={handleChange} required style={{ padding: '0.5rem' }} />
        <input type="text" name="lastName" placeholder="Sobrenome" onChange={handleChange} required style={{ padding: '0.5rem' }} />
        <input type="text" name="username" placeholder="Nome de usuário" onChange={handleChange} required style={{ padding: '0.5rem' }} />
        <input type="email" name="email" placeholder="E-mail" onChange={handleChange} required style={{ padding: '0.5rem' }} />
        <input type="password" name="password" placeholder="Senha" onChange={handleChange} required style={{ padding: '0.5rem' }} />
        <input type="password" name="confirmPassword" placeholder="Confirme a Senha" onChange={handleChange} required style={{ padding: '0.5rem' }} />

        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}