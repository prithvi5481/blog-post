import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './appRoutes/AppRoutes';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <div>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
