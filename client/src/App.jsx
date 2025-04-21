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
import { ToastContainer } from 'react-toastify';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    if (isAuthenticated) {
      return element;
    } else {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Access Denied
            </h2>
            <p className="mb-6 text-gray-700">
              You need to be logged in to access this page. Please choose one of
              the options below:
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Signup
              </Link>
            </div>
          </div>
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
        <ToastContainer/>
    <div >
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/profile' element={<PrivateRoute element={<Profile />} />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>} />
      </Routes>
    </div>
      </CommunityProvider>
  );
}

export default App;