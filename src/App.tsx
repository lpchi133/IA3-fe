import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './components/Register/index';
import Home from './components/Home/index';
import Login from './components/Login/index';
import Layout from './components/Layout'; // Nhập Layout component

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={import.meta.env.BASE_URL}>
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route 
              path="/" 
              element={<Home/>} 
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
