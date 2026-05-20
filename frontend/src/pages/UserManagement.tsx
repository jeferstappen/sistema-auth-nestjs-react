import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Estados para o formulário de edição
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // 1. Busca todos os usuários do back-end
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err) {
      alert('Erro ao carregar a lista de usuários.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Função para deletar um usuário
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este piloto do grid?')) {
      try {
        await api.delete(`/users/${id}`);
        alert('Usuário excluído com sucesso!');
        fetchUsers(); // Recarrega a lista
      } catch (err) {
        alert('Erro ao excluir o usuário.');
      }
    }
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await api.patch(`/users/${editingUser.id}`, { firstName, lastName });
      alert('Usuário atualizado com sucesso!');
      setEditingUser(null); 
      fetchUsers(); 
    } catch (err) {
      alert('Erro ao atualizar o usuário.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Gerenciamento do Grid (Usuários)</h1>

      {}
      {editingUser && (
        <div style={{ backgroundColor: '#222', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #cc0000' }}>
          <h3>Editando: {editingUser.username}</h3>
          <form onSubmit={handleUpdate} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Nome:</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Sobrenome:</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
            </div>
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#cc0000', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Salvar</button>
            <button type="button" onClick={() => setEditingUser(null)} style={{ padding: '0.5rem 1rem', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
          </form>
        </div>
      )}

      {}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: '#111', color: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: '#cc0000', color: 'black' }}>
            <th style={{ padding: '1rem' }}>ID</th>
            <th style={{ padding: '1rem' }}>Nome Completo</th>
            <th style={{ padding: '1rem' }}>Username</th>
            <th style={{ padding: '1rem' }}>E-mail</th>
            <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '1rem' }}>{user.id}</td>
              <td style={{ padding: '1rem' }}>{`${user.firstName} ${user.lastName}`}</td>
              <td style={{ padding: '1rem' }}>{user.username}</td>
              <td style={{ padding: '1rem' }}>{user.email}</td>
              <td style={{ padding: '1rem', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button 
                  onClick={() => startEdit(user)}
                  style={{ padding: '0.4rem 0.8rem', backgroundColor: '#333', color: '#ffcc00', border: '1px solid #ffcc00', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(user.id)}
                  style={{ padding: '0.4rem 0.8rem', backgroundColor: '#333', color: '#ff4444', border: '1px solid #ff4444', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}