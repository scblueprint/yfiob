import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Slide1 from './components/pages/slide1'
import Slide2 from './components/pages/slide2'
import Slide3 from './components/pages/slide3'
import Login from './components/login/login'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Slide1 />} />
        <Route path='/slide2' element={<Slide2 />} />
        <Route path='/slide3' element={<Slide3 />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
