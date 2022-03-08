import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Checkout from './pages/Checkout/Checkout';
import Choose from './pages/Choose/Choose';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={ <Home /> }></Route>
          <Route path="/checkout" element={ <Checkout /> }></Route>
          <Route path="/choose" element={ <Choose /> }></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
