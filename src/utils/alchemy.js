import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/DXKD8MZtAEoT508AiPj0rEocvhcwjy5P",
);

export const getNftMetadata = async (contractaddress, tokenid) => {
    return await web3.alchemy.getNftMetadata({
        contractAddress: contractaddress,
        tokenId: tokenid
    });
}

export const getNftsOfOwner = async (owneraddress) => {
    return await web3.alchemy.getNfts({
        owner: owneraddress
    });
}