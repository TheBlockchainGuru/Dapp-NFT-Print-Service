import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { config } from '../../config/config';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './Checkout.scss';
import 'react-notifications/lib/notifications.css';

const Checkout = ({ connect, address, setNft, nft }) => {

    const navigate = useNavigate(); 
    useEffect ( () => {
        
        if(!address || !nft || Object.keys(nft).length === 0) {
            navigate('/');
        }
    } )

    const onPayNow = async () => {
        if(!nft) return;
        const web3 = window.web3;

        const nonce = await web3.eth.getTransactionCount(address, 'latest'); // nonce starts counting from 0
        const gas   = await web3.eth.estimateGas({
            from: address,
            to: config.receiver_address,
            nonce: nonce
        })
        const gasPrice  = await web3.eth.getGasPrice();
        const value     = ethers.BigNumber.from(config.value);
        web3.eth.sendTransaction({
            from: address,
            to: config.receiver_address,
            nonce: nonce,
            gas: gas,
            value: value,
            chainId: config.chain_id, 
        })
        .once('confirmation', (e) => {
            NotificationManager.success('Sent', '', 5000);
            setNft({});
            navigate('/choose');
        })
        .once('send', (e) => {
            NotificationManager.info('Send', '', 5000);
        })
        .once('sending', (e) => {
            NotificationManager.info('Sending now', '', 5000);
        })
        .once('error', (e) => {
            NotificationManager.error('Transaction failed', '', 5000);
        })
    }

    return (
        <div className="checkout">
            <NotificationContainer/>
            <div className="checkout-container">
                <div className="checkout-title">NFT Prints</div>
                <div className="checkout-content">
                    <div className="checkout-form">
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>First Name</label>
                                <input type="text" />
                            </div>
                            <div className="checkout-form-column">
                                <label>Last Name</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>Email</label>
                                <input type="email" />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>Street Address</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>City</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>Postal / Zip code</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>Country</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <div className="checkout-form-submit" onClick={onPayNow}>Pay Now</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;