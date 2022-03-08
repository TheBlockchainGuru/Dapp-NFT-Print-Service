import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <Link to="/">NFT Prints</Link>
            </div>
            <div className="links">
                <div className="link">
                    <Link to="/">Home</Link>
                </div>
                <div className="link">
                    <Link to="/choose">Choose NFT</Link>
                </div>
                <div className="link">
                    <Link to="/checkout">Checkout</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;