// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./WrappedToken.sol";

contract Vault {
    address public owner;

    // Mapping: original token => wrapped token
    mapping(address => address) public wrappedTokens;

    event Locked(address indexed user, address indexed token, uint256 amount);
    event Unlocked(address indexed user, address indexed token, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // 🧱 Deploy a wrapped token for a given original token
    function deployWrappedToken(address originalToken, string memory name, string memory symbol) external onlyOwner {
        require(wrappedTokens[originalToken] == address(0), "Already exists");
        WrappedToken wToken = new WrappedToken(name, symbol, address(this));
        wrappedTokens[originalToken] = address(wToken);
    }

    // 🔐 Lock original token and mint wrapped token
    function lock(address token, uint256 amount) external {
        require(wrappedTokens[token] != address(0), "No wrapped token for this");

        IERC20(token).transferFrom(msg.sender, address(this), amount);
        WrappedToken(wrappedTokens[token]).mint(msg.sender, amount);

        emit Locked(msg.sender, token, amount);
    }

    // 🔓 Burn wrapped token and unlock original token
    function unlock(address token, uint256 amount) external {
        require(wrappedTokens[token] != address(0), "No wrapped token for this");

        WrappedToken(wrappedTokens[token]).burnFrom(msg.sender, amount);
        IERC20(token).transfer(msg.sender, amount);

        emit Unlocked(msg.sender, token, amount);
    }
}
