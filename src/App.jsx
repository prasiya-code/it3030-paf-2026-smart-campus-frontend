<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
=======
import AppRoutes from './routes/AppRoutes';

function App() {
  return <AppRoutes />;
>>>>>>> origin/dev
}

export default App;