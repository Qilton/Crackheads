import { Navigate, Route, Routes,Link } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Profile from './pages/profile';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import Dashboard from './pages/dashboard';
import { CommunityProvider } from './provider/CommunityProvider';  

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    if (isAuthenticated) {
      return element; 
    } else {
    
      return (
        <div>
          <h2>You need to be logged in to access this page</h2>
          <p>Please choose one of the options below:</p>
          <Link to="/login">Login</Link> <br />
          <Link to="/signup">Signup</Link>
        </div>
      );
    }
  };
  const ProtectedPage = () => {
    return isAuthenticated ? (
      <div>
        <h2>You are logged in and can access this protected route.</h2>
      </div>
    ) : (
      <div>
        <h2>Only logged-in users have access to this page.</h2>
        <p>Please log in to view this content.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  };
  return (
      <CommunityProvider>
    <div >
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/profile' element={<PrivateRoute element={<Profile />} />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
      </CommunityProvider>
  );
}

export default App;