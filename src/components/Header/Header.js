import './Header.scss';
import { Link } from 'react-router-dom';
import TogglerImage from '../../assets/images/toggler.png';

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
            <div className="collapse">
                <div className="collapse-link-icon">
                    <img src={TogglerImage} />
                </div>
                <div className="collapse-links">
                    <div className="collapse-link">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="collapse-link">
                        <Link to="/choose">Choose NFT</Link>
                    </div>
                    <div className="collapse-link">
                        <Link to="/checkout">Checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;