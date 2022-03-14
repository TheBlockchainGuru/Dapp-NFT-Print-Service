import './Header.scss';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TogglerImage from '../../assets/images/toggler.png';

const Header = ({ connect, address }) => {

    useEffect ( () => {
    }, [address] )

    const onConnectWallet = async () => {
        await connect();
    }

    return (
        <div className="header">
            <div className="logo">
                <Link to="/">NFT Prints</Link>
            </div>
            <div className="links">
                <div className="link">
                    NFT Prints are exclusive, high-quality, framed prints in about an inch passe-partout. 
                    It will elegantly display your piece of art alongside the collection name and token ID of your NFT. 
                    The official NFT Prints name on it will prove that you've own it at some point in time to all its gazers.
                    - By the NFT space, for the NFT space.
                </div>
                {/* <div className="link">
                    <Link to="/">Home</Link>
                </div>
                <div className="link">
                    <Link to="/choose">Choose NFT</Link>
                </div>
                <div className="link">
                    <Link to="/checkout">Checkout</Link>
                </div> */}
                <div className="link">
                    {address
                        ?   <div className="connect">{String(address).substring(0, 6) + "..." + String(address).substring(38)}</div>
                        :   <div className="connect" onClick={onConnectWallet}>Connect Wallet</div>
                    }
                </div>
            </div>
            <div className="collapse">
                <div className="collapse-link-icon">
                    <img src={TogglerImage} />
                </div>
                <div className="collapse-links">
                    {/* <div className="collapse-link">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="collapse-link">
                        <Link to="/choose">Choose NFT</Link>
                    </div>
                    <div className="collapse-link">
                        <Link to="/checkout">Checkout</Link>
                    </div> */}
                    <div className="collapse-link">
                        {address 
                        ?   <div className="connect">{String(address).substring(0, 6) + "..." + String(address).substring(38)}</div>
                        :   <div className="connect" onClick={onConnectWallet}>Connect Wallet</div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;