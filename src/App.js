import './App.css';
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Checkout from './pages/Checkout/Checkout';
import Choose from './pages/Choose/Choose';
import { useEffect, useState } from 'react';

function App() {

  const [address, setAddress] = useState('');
  const [nft, setNft] = useState({});

  useEffect(async () => {
    await onConnect();
  }, [] )

  const onConnect = async () => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
      const accounts = await window.web3.eth.getAccounts();
      setAddress(accounts[0])
    } else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      const accounts = await window.web3.eth.getAccounts();
      setAddress(accounts[0])
    } else {
        window.alert('Non-Ethereum browser detected. Your should consider trying MetaMask!')
    }
  }

  const onSetNFT = (e) => {
    setNft(e);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header connect={onConnect} address={address} />
        <Routes>
          <Route path="/" element={ <Home /> }></Route>
          <Route 
            path="/checkout" 
            element={ 
              <Checkout 
                nft={nft}
                connect={onConnect} 
                address={address}
                setNft={e => onSetNFT(e)}
              /> }>
          </Route>
          <Route 
            path="/choose" 
            element={ 
              <Choose 
                address={address}
                nft={nft}
                setNft={e => onSetNFT(e)}
              /> }>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
