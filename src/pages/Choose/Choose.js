import { useState, useEffect } from 'react';
import { getNftMetadata, getNftsOfOwner } from '../../utils/alchemy';
import './Choose.scss';

const contracts = require('../../config/nfts.json');

const Choose = () => {

    const [collections, setCollections] 
            = useState([
                <option value="" key={0}>NFT Collection</option>
            ])
    const [collection, setCollection] = useState('');
    const [tokenID, setTokenID] = useState('');

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
        const nftData = await getNftMetadata(collection, tokenID)


        console.log(nftData)
    }

    const onSelectCollection = (e) => {
        setCollection(e.target.value);
    }

    const onSetTokenID = (e) => {
        setTokenID(e.target.value);
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
                    </div>
                    <div className="choose-nft-individual">
                        <input type="text" value={tokenID} onChange={onSetTokenID} />
                    </div>
                    <div className="choose-nft-verify" onClick={onVerify}>Verify Ownerships</div>
                </div>
            </div>
        </div>
    );
}

export default Choose;