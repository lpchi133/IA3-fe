// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './components/Register/index';
import Home from './components/Home/index';
import Login from './components/Login/index';
import { useState, useEffect } from 'react';
import Layout from './components/Layout'; // Nhập Layout component

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={import.meta.env.BASE_URL}>
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route 
              path="/" 
              element={<Home user={user} onLogout={handleLogout} />} 
            />
            <Route 
              path="/login" 
              element={<Login/>} 
            />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
