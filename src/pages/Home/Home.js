import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { database } from '../../config/firebase';
import './Home.scss';
import RoadMapImage from '../../assets/images/Pop-up_window.png';

const customStyles = {
    content: {
        top: '0%',
        left: '0%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0px',
        padding: '0px',
        left: 'calc(50% - 386px)',
        top: 'calc(50% - 325px)',
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
    },
};

const Home = ({databaseKey, log, changeLog}) => {
    const [showRoadMap, setShowRoadMap] = useState(true)
    const [code, setCode] = useState('');
    const navigate = useNavigate();

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

    const onEnter = () => {
        const newRef = database.ref('log/' + databaseKey);
        log.code = code

        newRef.update(log)
        changeLog(log)
        navigate('/choose')
    }

    const onChangeCode = (e) => {
        setCode(e.target.value)
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
                            right: '13px',
                            top: '3px',
                            width: '90px',
                            height: '90px',
                            cursor: 'pointer'
                        }}
                    ></div>
                    <img src={RoadMapImage} style={{ width: '772px', height: '697px' }} />
                </div>
            </Modal>
            <div className="home-container">
                <div className="home-title">NFT Prints</div>
                <div className="home-content">
                    <div className="home-nft-code">
                        <div className="home-nft-count">
                            <input type="text" value={code} onChange={onChangeCode} />
                            <div className="home-nft-label">If you don't have a code: Click <Link to="/choose" className="home-nft-label-highlight">Here</Link></div>
                        </div>
                        <div className="home-nft-confirm" onClick={onEnter}>Enter</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;