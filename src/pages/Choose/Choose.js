import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNftMetadata, getNftsOfOwner } from '../../utils/alchemy';
import { getSingleContract } from '../../utils/opensea';
import { useMoralisWeb3Api } from "react-moralis";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './Choose.scss';
import 'react-notifications/lib/notifications.css';

const contracts = require('../../config/nfts.json');

const Choose = ({address, setNft}) => {
    const Web3Api = useMoralisWeb3Api();
    const colRef = useRef(null);
    const [collections, setCollections] 
            = useState([
                { name: 'NFT Collection', value:"" }
            ])
    const [collection, setCollection] = useState('');
    const [tokenID, setTokenID] = useState('');
    const [collectionError, setCollectionError] = useState(false);
    const [tokenError, setTokenError] = useState(false);
    const [contract, setContract] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect( () => {
        let newCollections = [...collections];

        for(let i in contracts) {
            const oneContract = contracts[i];

            newCollections
                .push(
                    { name: oneContract.name, value: oneContract.contract }
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
            // const ownedNfts = await getNftsOfOwner(address);
            const ownedNfts = await getNftsOfOwner('0x9ab5a9572db323c70a94a1b043759b3490f6f51d');
            const nftData   = await getNftMetadata(collection, tokenID);

            if(!ownedNfts.ownedNfts.length) {
                NotificationManager.error('You don\' have any NFT', 'Error message', 5000);
            } else {
                if(!nftData) {
                    NotificationManager.error('Loading NFT information failed', 'Error message', 5000);
                } else if(nftData.error) {
                    NotificationManager.error('NFT does not exist', 'Error message', 5000);
                } else {
                    const nftIndex = ownedNfts.ownedNfts.findIndex(ele => 
                        ele.contract.address == nftData.contract.address &&
                        ele.id.tokenId == nftData.id.tokenId
                    );
                    if(nftIndex <= -1) {
                        NotificationManager.error('That\' not your NFT', 'Error message', 5000);
                    } else {
                        setNft(nftData);
                        navigate('/checkout')
                    }
                }    
            }
        }
    }

    const onSelectCollection = (e) => {
        setCollection(e.target.value);
        setContract(e.target.value);
    }

    const onSetTokenID = (e) => {
        setTokenID(e.target.value);
    } 

    const onChangeContract = async (e) => {
        const selContract = e.target.value;
        setContract(selContract)

        const metaData = await getSingleContract(selContract);

        if(Object.keys(metaData).length !== 0) {
            const isExist = collections.findIndex( e => e.value == selContract )
            if(isExist < 0) {
                let newCollections = [...collections];
                newCollections.push({name: metaData.data.collection.name, value: selContract})
                setCollections(newCollections)
            }

            colRef.current.value = selContract;
            setCollection(selContract);

        } else {
            NotificationManager.error('NFT collection does not exist or something failed', 'Error message', 5000);
        }
        // const options = {
        //     address: selContract,
        //     chain: "eth",
        // }
    
        // const metaData = await Web3Api.token.getNFTMetadata(options);
        // if(Object.keys(metaData).length !== 0) { 
        //     const isExist = collections.findIndex( e => e.value == selContract )
        //     if(isExist < 0) {
        //         let newCollections = [...collections];
        //         newCollections.push({name: metaData.name, value: selContract})
        //         setCollections(newCollections)
        //     }

        //     colRef.current.value = selContract;
        //     setCollection(selContract);
        // }
    }

    return (
        <div className="choose">
            <NotificationContainer/>
            <div className="choose-container">
                <div className="choose-title">NFT Prints</div>
                <div className="choose-content">
                    <div className="choose-nft-collection">
                        <select onChange={onSelectCollection} ref={colRef}>
                        {collections.map ( e => 
                            <option 
                                value={e.value}
                                key={e.value}
                            >{e.name}</option>
                        )}
                        </select>
                        <div 
                            style={{
                                display: collectionError ? 'block' : 'none'
                            }} 
                            className="choose-nft-collection-error"
                        >This field is required.</div>
                    </div>
                    <div className="choose-nft-wallet">
                        <input type="text" placeholder="Enter wallet address" value={contract} onChange={onChangeContract} />
                    </div>
                    <div className="choose-nft-individual">
                        <input type="text" placeholder="Token ID" onChange={onSetTokenID} value={tokenID} />
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