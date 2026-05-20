import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgEsquerda from '../assets/imagem1.png';
import imgDireita from '../assets/imagem2.png';

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Função para deslogar da conta
  const handleLogout = () => {
    localStorage.removeItem('access_token'); 
    navigate('/login'); 
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <img src={imgEsquerda} alt="Esquerda" style={{ height: '60px', objectFit: 'contain' }} />
        <h1 style={{ margin: 0 }}>Portal Verstappen</h1>
        <img src={imgDireita} alt="Direita" style={{ height: '60px', objectFit: 'contain' }} />
      </div>

      <p style={{ fontSize: '18px', marginTop: '2rem', color: '#ccc' }}>
        Acesso Autorizado. Bem-vindo ao painel de telemetria!
      </p>
      
      <div style={{ marginTop: '2rem', fontSize: '50px' }}>
        🏁🏎️💨
      </div>

      {/* Botão de Logout para fechar o sistema com estilo */}
      <button 
        onClick={handleLogout}
        style={{ marginTop: '3rem', padding: '0.75rem 2rem', backgroundColor: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Sair do Sistema
      </button>

    </div>
  );
}