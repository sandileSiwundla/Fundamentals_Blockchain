// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

//nft standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//access controller
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TicketMarketplace is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    uint256 public MAX_SUPPLY = 1000;
    constructor() ERC721 ("TicketMarketplace", "TM") Ownable(msg.sender) {}
    function mint(address to, string memory tokenURI) public onlyOwner{
        //check nft supply
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");

        //increment token ID
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        _safeMint(to, tokenId);

        _setTokenURI(tokenId, tokenURI);

    }  
}

