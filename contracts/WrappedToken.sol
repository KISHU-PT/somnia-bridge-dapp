// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WrappedToken is ERC20 {
    address public vault;

    modifier onlyVault() {
        require(msg.sender == vault, "Only Vault can call this");
        _;
    }

    constructor(string memory name, string memory symbol, address _vault) ERC20(name, symbol) {
        vault = _vault;
    }

    // 🚀 Mint wrapped tokens (Vault only)
    function mint(address to, uint256 amount) external onlyVault {
        _mint(to, amount);
    }

    // 🔥 Burn wrapped tokens (Vault only)
    function burnFrom(address from, uint256 amount) external onlyVault {
        _burn(from, amount);
    }
}
