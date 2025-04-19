import { Navigate, Route, Routes,Link } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

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
    <div >
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />

        <Route path='/protected' element={<ProtectedPage />} />
      </Routes>
    </div>
  );
}

export default App;