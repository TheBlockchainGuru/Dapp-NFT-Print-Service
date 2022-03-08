import './Choose.scss';

const Choose = () => {
    return (
        <div className="choose">
            <div className="choose-title">NFT Prints</div>
            <div class="choose-content">
                <div className="choose-nft-collection">
                    <select>
                        <option value="">NFT Collection</option>
                    </select>
                </div>
                <div className="choose-nft-individual">
                    <input type="text" />
                </div>
                <div className="choose-nft-verify">Verify Ownerships</div>
            </div>
        </div>
    );
}

export default Choose;