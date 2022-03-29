import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { config } from '../../config/config';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { database } from '../../config/firebase';
import './Checkout.scss';
import 'react-notifications/lib/notifications.css';

const Checkout = ({ connect, address, setNft, nft, log, databaseKey, changeLog, changeBlocking }) => {

    const navigate = useNavigate(); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');

    useEffect ( () => {
        if(!address || !nft || Object.keys(nft).length === 0) {
            navigate('/');
        }
    } )

    const onChangeCity = (e) => {
        setCity(e.target.value);
    }

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    }

    const onChangeZipCode = (e) => {
        setZipCode(e.target.value);
    }

    const onChangeStreetAddress = (e) => {
        setStreetAddress(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const onPayNow = async (event) => {
        event.preventDefault();
        if(!nft) return;
        let web3 = window.web3;

        const nonce = await web3.eth.getTransactionCount(address, 'latest'); // nonce starts counting from 0
        const gas   = await web3.eth.estimateGas({
            from: address,
            to: config.receiver_address,
            nonce: nonce
        })
        const gasPrice  = await web3.eth.getGasPrice();
        const value     = ethers.BigNumber.from(config.value);
        web3.eth.defaultChain = config.chain_id;

        web3.eth.sendTransaction({
            from: address,
            to: config.receiver_address,
            nonce: nonce,
            gas: gas,
            value: value,
        })
        .once('transactionHash', function(hash){ 
            changeBlocking(true);
        })
        .once('confirmation', (e) => {
            NotificationManager.success('Sent', '', 5000);
            setNft({});
            log.pay = parseInt(config.value) / 1000000000000000000;
            log.firstName = firstName;
            log.lastName = lastName;
            log.email = email;
            log.streetAddress = streetAddress;
            log.city = city;
            log.zipCode = zipCode;
            log.country = country;

            database.ref('log/' + databaseKey)
                    .update(log)

            changeLog({});
            changeBlocking(false);
            navigate('/');
        })
        .once('error', (e) => {
            NotificationManager.error(e.message, '', 10000);
            setTimeout( () => {
                changeLog({});
                changeBlocking(false);
                navigate('/');
            }, 10000)
        })
    }

    return (
        <div className="checkout">
            <NotificationContainer/>
            <div className="checkout-container">
                <div className="checkout-title">NFT Prints</div>
                <div className="checkout-price">
                    <div className="checkout-price-main">Price: 0.099Ξ</div>
                    <div className="checkout-price-ship">Shipping: 0.005Ξ</div>
                </div>
                <div className="checkout-content">
                    <form className="checkout-form" onSubmit={onPayNow}>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>First Name</label>
                                <input type="text" value={firstName} onChange={onChangeFirstName} required/>
                            </div>
                            <div className="checkout-form-column">
                                <label>Last Name</label>
                                <input type="text" value={lastName} onChange={onChangeLastName} required />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>Email</label>
                                <input type="email" value={email} onChange={onChangeEmail} required />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>Street Address</label>
                                <input type="text" value={streetAddress} onChange={onChangeStreetAddress} required />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>City</label>
                                <input type="text" value={city} onChange={onChangeCity} required />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>Postal / Zip code</label>
                                <input type="text" value={zipCode} onChange={onChangeZipCode} required />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <label>Country</label>
                                <input type="text" value={country} onChange={onChangeCountry} required />
                            </div>
                        </div>
                        <div className="checkout-form-row">
                            <div className="checkout-form-column">
                                <button className="checkout-form-submit" type="submit">Pay Now</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Checkout;