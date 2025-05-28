
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
  

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();
    //blocco il comportamento di submit standard del browser.

    if (!isValidEmail(email)) return setError('Email non valida');
    if (password.length < 6) return setError('Minimo 6 caratteri per la password');
    //validazione superficiale dei campi del form

    try {
      const res = await axios.post(
        'https://run.mocky.io/v3/8d1199c0-d333-482e-87c1-78ee85010b8e',
        { email, password }
      );
      const { token, refreshToken } = res.data;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      setError('');
      console.log(localStorage.getItem('accessToken'));
      console.log(localStorage.getItem('refreshToken'));
      navigate('/private');
    } catch {
      setError('Credenziali non valide');
    }
    //valorizzo i token all'interno di un try/catch per simulare l'immissione di credenziali errate, nel caso in cui la chiamata ai token fallisse.
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 300, margin: 'auto', display: 'flex', flexDirection: 'column'}}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength={6}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage
