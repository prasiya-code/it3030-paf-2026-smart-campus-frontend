import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResourceListPage from './pages/resources/ResourceListPage';
import ResourceCreatePage from './pages/resources/ResourceCreatePage';
import ResourceEditPage from './pages/resources/ResourceEditPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/resources" element={<ResourceListPage />} />
          <Route path="/resources/create" element={<ResourceCreatePage />} />
          <Route path="/resources/edit/:id" element={<ResourceEditPage />} />
          <Route path="/" element={<ResourceListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;