import './App.css';
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Checkout from './pages/Checkout/Checkout';
import Choose from './pages/Choose/Choose';
import Access from './pages/Access/Access';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import { useEffect, useState } from 'react';
import { database } from './config/firebase';

function App() {

  const [address, setAddress] = useState('');
  const [nft, setNft] = useState({});
  const [log, setLog] = useState({});
  const [databaseKey, setDatabaseKey] = useState('');
  const [blocking, setBlocking] = useState(false);

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
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+' '+time;
      const newRef = database.ref('log').push()
      newRef.set({ time: dateTime, wallet: address });

      setDatabaseKey(newRef.key);      
      setLog({ time: dateTime, wallet: address });
    }
  }

  const onSetNFT = (e) => {
    setNft(e);
  }

  const onChangeLog = (e) => {
    setLog(e);
  }

  const onChangeBlocking = (e) => {
    setBlocking(e)
  }

  return (
    <div className="App">
      <BlockUi tag="div" blocking={blocking}>
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
                  changeBlocking={e => onChangeBlocking(e)}
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
            <Route 
              path="/access"
              element={<Access />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </BlockUi>
    </div>
  );
}

export default App;
