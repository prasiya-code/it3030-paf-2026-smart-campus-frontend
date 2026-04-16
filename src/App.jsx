import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
<<<<<<< Updated upstream
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-green-400">
        Smart Campus Frontend 🚀
      </h1>
    </div>
=======
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
>>>>>>> Stashed changes
  );
}

export default App;