import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Goals from './pages/Goals';
import Habits from './pages/Habits';
import Tasks from './pages/Tasks';
import Focus from './pages/Focus';
import Stress from './pages/Stress';
import AIAssistant from './pages/AIAssistant';
import Career from './pages/Career';
import Finance from './pages/Finance';
import Hobbies from './pages/Hobbies';
import Reflection from './pages/Reflection';

// Auth0 configuration
const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN!,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID!,
  authorizationParams: {
    redirect_uri: window.location.origin
  }
};

function App() {
  return (
    <Auth0Provider {...auth0Config}>
      <Router>
        <div className="App">
          <Navigation />
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/focus" element={<Focus />} />
              <Route path="/stress" element={<Stress />} />
              <Route path="/ai" element={<AIAssistant />} />
              <Route path="/career" element={<Career />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/hobbies" element={<Hobbies />} />
              <Route path="/reflection" element={<Reflection />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;