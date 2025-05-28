import type { JSX } from 'react';
import { Navigate } from 'react-router';

function ProtectedRoute ({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;