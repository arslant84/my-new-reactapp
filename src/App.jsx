import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';
import './App.css';
import './styles/Pages.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
