import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import axios from '../../api/axios';

const OAuth2CallbackPage = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuthContext();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const response = await axios.get('/api/me');
        const userData = response.data;

        if (userData.authenticated) {
          setUser(userData);
          setIsAuthenticated(true);

          const role = userData.role || 
            (userData.roles && userData.roles[0]) || 'USER';

          if (role === 'ADMIN') {
            navigate('/admin/dashboard', { replace: true });
          } else {
            navigate('/dashboard', { replace: true });
          }
        } else {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('OAuth2 callback error:', error);
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, [navigate, setUser, setIsAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-slate-500 text-sm">
          Completing sign in...
        </p>
      </div>
    </div>
  );
};

export default OAuth2CallbackPage;
