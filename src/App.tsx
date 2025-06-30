import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import FindDoctors from './pages/FindDoctors';
import MedicalRecords from './pages/MedicalRecords';
import SignIn from './pages/SignIn';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/signin" element={<SignIn />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Home />} />
            <Route path="booking" element={<Booking />} />
            <Route path="doctors" element={<FindDoctors />} />
            <Route path="medical-records" element={<MedicalRecords />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;