import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import LoginPage from './LoginPage';
import ProtectedPage from './ProtectedPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/private"
          element={
            <ProtectedRoute>
              <ProtectedPage />
            </ProtectedRoute>
          }
          //chiamo ProtectedRoute, che in caso di esito positivo, abilita la navigazione nell'elemento figlio, ovvero ProtectedPage.
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
