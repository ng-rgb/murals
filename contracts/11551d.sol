// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract Murals is ERC1155, Ownable, ERC1155Burnable {

    uint256 public constant MURALS0 = 0;//ID
    uint256 public constant MURALS1 = 1;
    uint256 public constant MURALS2 = 2;
    uint256 public constant MURALS3 = 3;
    uint256 public constant MURALS4 = 4;    
    uint256 public constant MURALS5 = 5;
    uint256 public constant MURALS6 = 6;
    uint256 public constant MURALS7 = 7;



// this contructor is which will mint the initial versions of these NFTs
    constructor() ERC1155("https://hyorvrgxcdmm.usemoralis.com/{id}.json") {
        _mint(msg.sender, MURALS1, 21, "");// amount
        _mint(msg.sender, MURALS2, 2, "");
        _mint(msg.sender, MURALS3, 3, "");
        _mint(msg.sender, MURALS4, 4, "");
        _mint(msg.sender, MURALS5, 5, "");
        _mint(msg.sender, MURALS6, 6, "");
        _mint(msg.sender, MURALS7, 7, "");
    }

// the onlyOwner modifier makes that the mint function will only be accessible by the address that deployed the contract initially
function mint(address account, uint256 id, uint256 amount) 
    public 
    onlyOwner 
{
    // onlyOwner means that this function can only be executed by the creator of the contract
    _mint(account, id, amount, "");
}

function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    public
    onlyOwner
{
    _mintBatch(to, ids, amounts, data);
}
}