import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNftMetadata, getNftsOfOwner } from '../../utils/alchemy';
import './Choose.scss';

const contracts = require('../../config/nfts.json');

const Choose = ({setNft}) => {

    const [collections, setCollections] 
            = useState([
                <option value="" key={0}>NFT Collection</option>
            ])
    const [collection, setCollection] = useState('');
    const [tokenID, setTokenID] = useState('');
    const [collectionError, setCollectionError] = useState(false);
    const [tokenError, setTokenError] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        let newCollections = [...collections];

        for(let i in contracts) {
            const oneContract = contracts[i];

            newCollections.push(
                                <option 
                                    value={oneContract.contract} 
                                    key={oneContract.contract}
                                >
                                    {oneContract.name}
                                </option>
                            )
        }

        setCollections(newCollections)
    }, [] )

    const onVerify = async () => {

        if(!collection) {
            setCollectionError(true)
        } else if(!tokenID) {
            setTokenError(true)
        } else {
            const nftData = await getNftMetadata(collection, tokenID)
            if(!nftData) {
                alert('Loading NFT information failed')
            } else if(nftData.error) {
                alert('Token does not exist')
            } else {
                setNft(nftData);
                navigate('/checkout')
            }
        }
    }

    const onSelectCollection = (e) => {
        setCollection(e.target.value);

        if(e.target.value) {
            setCollectionError(false);
        } else {
            setCollectionError(true);
        }
    }

    const onSetTokenID = (e) => {
        setTokenID(e.target.value);

        if(e.target.value) {
            setTokenError(false);
        } else {
            setTokenError(true);
        }
    } 

    return (
        <div className="choose">
            <div className="choose-container">
                <div className="choose-title">NFT Prints</div>
                <div className="choose-content">
                    <div className="choose-nft-collection">
                        <select onChange={onSelectCollection}>
                            {collections}
                        </select>
                        <div 
                            style={{
                                display: collectionError ? 'block' : 'none'
                            }} 
                            className="choose-nft-collection-error"
                        >This field is required.</div>
                    </div>
                    <div className="choose-nft-individual">
                        <input type="text" value={tokenID} onChange={onSetTokenID} />
                        <div 
                            style={{
                                display: tokenError ? 'block' : 'none'
                            }}
                            className="choose-nft-individual-error"
                        >This field is required.</div>
                    </div>
                    <div className="choose-nft-verify" onClick={onVerify}>Verify Ownerships</div>
                </div>
            </div>
        </div>
    );
}

export default Choose;