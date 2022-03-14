import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    return (
        <div className="home">
            <div className="home-container">
                <div className="home-title">NFT Prints</div>
                <div className="home-content">
                    <div className="home-nft-code">
                        <div className="home-nft-count">
                            <input type="text" />
                            <div className="home-nft-label">If you don't have a code: Click <Link to="/choose" className="home-nft-label-highlight">Here</Link></div>
                        </div>
                        <div className="home-nft-confirm">Enter</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;