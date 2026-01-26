// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyMintableToken
 * @dev ERC20 Token có thể mint bởi owner
 */
contract MyMintableToken is ERC20, Ownable {
    constructor() ERC20("MyMintableToken", "MMT") Ownable(msg.sender) {
        // Constructor để khởi tạo token name và symbol
        // Không mint token tại đây, sẽ mint sau khi deploy
    }

    /**
     * @dev Hàm mint token, chỉ owner mới gọi được
     * @param to Địa chỉ nhận token
     * @param amount Số lượng token cần mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
