import type { JSX } from 'react';
import { Navigate } from 'react-router';

function ProtectedRoute ({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" />;
  //controllo che i token siano salvati nel local storage. In caso positivo faccio procedere la navigazione, altrimenti rimando alla pagina di login.
};

export default ProtectedRoute;