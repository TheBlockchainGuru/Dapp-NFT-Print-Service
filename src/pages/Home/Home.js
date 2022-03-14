import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './Home.scss';
import RoadMapImage from '../../assets/images/Pop-up_window.png';

const customStyles = {
    content: {
        top: '0%',
        left: '0%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0px',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
    },
};

const Home = () => {
    const [showRoadMap, setShowRoadMap] = useState(true)

    // useEffect( () => {
    //     // if(showRoadMap) {
    //         onShowRoadMap();
    //     // }
    // }, [] )

    const onShowRoadMap = () => {
        setShowRoadMap(true)
    }

    const onHideRoadMap = () => {
        setShowRoadMap(false);
    }

    return (
        <div className="home">
            <Modal
                isOpen={showRoadMap}
                // onAfterOpen={afterOpenModal}
                onRequestClose={onHideRoadMap}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <div className="roadmap" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <div className="roadmap-close"
                        onClick={onHideRoadMap}
                        style={{ 
                            position: 'absolute',
                            width: '11vw',
                            height: '13vh',
                            right: '2vw',
                            cursor: 'pointer'
                        }}
                    ></div>
                    <img src={RoadMapImage} style={{ width: '100%', height: '100%' }} />
                </div>
            </Modal>
            <div className="home-container">
                <div className="home-title">NFT Prints</div>
                <div className="home-content">
                    <div className="home-nft-code">
                        <div className="home-nft-count">
                            <input type="text" />
                            <div className="home-nft-label">If you don't have a code: Click <Link to="/choose" className="home-nft-label-highlight">Here</Link></div>
                        </div>
                        <div className="home-nft-confirm"><Link to="/choose">Enter</Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;