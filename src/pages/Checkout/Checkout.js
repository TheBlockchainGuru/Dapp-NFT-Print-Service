import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.scss';

const Checkout = ({ connect, address }) => {

    const navigate = useNavigate(); 
    useEffect ( () => {
        
        if(!address) {
            navigate('/');
        }
    } )
    return (
        <div className="checkout">
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
                                <div className="checkout-form-submit">Pay Now</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;