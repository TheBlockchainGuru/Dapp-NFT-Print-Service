import './App.css';
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Checkout from './pages/Checkout/Checkout';
import Choose from './pages/Choose/Choose';
import { useEffect, useState } from 'react';
import { database } from './config/firebase';

function App() {

  const [address, setAddress] = useState('');
  const [nft, setNft] = useState({});
  const [log, setLog] = useState({});
  const [databaseKey, setDatabaseKey] = useState('');

  useEffect(async () => {
    await onConnect();
  }, [] )

  const onConnect = async () => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
      const accounts = await window.web3.eth.getAccounts();
      setAddress(accounts[0])
      onSaveData(accounts[0])
    } else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      const accounts = await window.web3.eth.getAccounts();
      setAddress(accounts[0])
      onSaveData(accounts[0])
    } else {
        window.alert('Non-Ethereum browser detected. Your should consider trying MetaMask!')
    }
  }

  const onSaveData = (address) => {
    if(!databaseKey) {
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const newRef = database.ref('log').push()
      newRef.set({ time: time, wallet: address });

      setDatabaseKey(newRef.key);      
      setLog({ time: time, wallet: address });
    }
  }

  const onSetNFT = (e) => {
    setNft(e);
  }

  const onChangeLog = (e) => {
    setLog(e);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header 
          connect={onConnect} 
          address={address}
          changeLog={e => onChangeLog(e)}
        />
        <Routes>
          <Route 
            path="/" 
            element={ 
              <Home 
                databaseKey={databaseKey} 
                log={log} 
                changeLog={e => onChangeLog(e)}
              /> 
            }></Route>
          <Route 
            path="/checkout" 
            element={ 
              <Checkout 
                nft={nft}
                connect={onConnect} 
                address={address}
                setNft={e => onSetNFT(e)}
                log={log}
                databaseKey={databaseKey}
                changeLog={e => onChangeLog(e)}
              /> }>
          </Route>
          <Route 
            path="/choose" 
            element={ 
              <Choose 
                address={address}
                nft={nft}
                setNft={e => onSetNFT(e)}
                log={log}
                databaseKey={databaseKey}
                changeLog={e => onChangeLog(e)}
              /> }>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
