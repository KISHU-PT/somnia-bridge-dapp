// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

interface IWrappedToken {
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
}

contract Vault {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function lock(address token, uint256 amount, address wrappedToken) external {
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        IWrappedToken(wrappedToken).mint(msg.sender, amount);
    }

    function unlock(address token, uint256 amount, address wrappedToken) external {
        IWrappedToken(wrappedToken).burn(msg.sender, amount);
        require(IERC20(token).transfer(msg.sender, amount), "Transfer back failed");
    }
}
