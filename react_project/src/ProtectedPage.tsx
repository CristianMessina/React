import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

function ProtectedPage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('https://run.mocky.io/v3/20ec8886-ab6e-4141-b8ff-a05d93b0d44e');
        setUser(res.data);
      } catch {
        console.error('Errore nel recupero dati utente');
      }
    };

    fetchUser();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Benvenuto nella pagina protetta</h1>
      <button onClick={logout}>Logout</button>

      {user ? (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h2>Dati utente:</h2>
          <div style={{ lineHeight: '1.8'}}>
            <strong>ID:</strong> {user.id} <br />
            <strong>Nome:</strong> {user.name} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Password:</strong> {user.password}
          </div>
        </div>
      ) : (
        <p>Caricamento dati...</p>
      )}
    </div>
  );
};

export default ProtectedPage;
