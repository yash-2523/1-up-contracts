// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract Vault {
    using ECDSA for bytes32;
    event BuyV1UpsDB(uint256 bV1Ups, address account, bytes signature);
    event SellV1UpsDB(uint256 sV1Ups, address account, bytes signature);
    address public token;
    address public admin;
    address public devaddress; //AdminContract Address where the token holds
    uint256 public fees = 5 * 1e18; // percentage fees should be in 18 decimals
    address private ownerAddress;
    bytes32 private buySecret;
    bytes32 private sellSecret;
    uint256 public exchangeRate = 1 * 1e18; // 1 1UP = 1 V1UP

    constructor(
        address _token,
        address _devAddress,
        string memory _buySecret,
        string memory _sellSecret
    ) {
        token = _token;
        admin = msg.sender;
        devaddress = _devAddress;
        ownerAddress = msg.sender;
        buySecret = stringToBytes32(_buySecret);
        sellSecret = stringToBytes32(_sellSecret);
    }

    modifier verify(
        bytes memory signature,
        address _user,
        uint256 _amount,
        uint256 _deadline,
        bytes32 _secret
    ) {
        bytes32 digest = keccak256(
            abi.encode(_user, _amount, _deadline, _secret)
        );
        digest = digest.toEthSignedMessageHash();
        address signer = ECDSA.recover(digest, signature);
        require(signer == ownerAddress, "Invalid signature");
        require(block.timestamp <= _deadline, "Signature expired");
        require(_user == msg.sender, "Invalid user");
        _;
    }

    // setFees
    function setFees(uint256 _fees) public onlyAdmin {
        fees = _fees;
    }

    function setExchangeRate(uint256 _exchangeRate) public onlyAdmin {
        exchangeRate = _exchangeRate;
    }

    function setBuySecret(string memory _buySecret) public onlyAdmin {
        buySecret = stringToBytes32(_buySecret);
    }

    function setSellSecret(string memory _sellSecret) public onlyAdmin {
        sellSecret = stringToBytes32(_sellSecret);
    }

    function setOwnerAddress(address _ownerAddress) public onlyAdmin {
        ownerAddress = _ownerAddress;
    }

    function BuyV1Up(
        bytes memory signature,
        address _user,
        uint256 _amount,
        uint256 _deadline
    ) external verify(signature, _user, _amount, _deadline, buySecret) {
        uint256 _feeAmount = (_amount * fees) / 100;
        _feeAmount = _feeAmount / 1e18;
        uint256 _amountToTransfer = _amount - _feeAmount;
        _amountToTransfer = (_amountToTransfer * exchangeRate) / 1e18;
        IERC20(token).transferFrom(_user, address(this), _amount);
        IERC20(token).transfer(devaddress, _feeAmount);
        emit BuyV1UpsDB(_amountToTransfer, _user, signature);
    }

    function setToken(address _token) public onlyAdmin {
        token = _token;
    }

    function setDevAddr(address _devAddr) public onlyAdmin {
        devaddress = _devAddr;
    }

    function updateAdmin(address newAdmin) external {
        require(msg.sender == admin, "only admin can access this contract");
        admin = newAdmin;
    }

    function SellV1Up(
        bytes memory signature,
        address _user,
        uint256 _amount,
        uint256 _deadline
    ) external verify(signature, _user, _amount, _deadline, sellSecret) {
        uint256 _amountToTransfer = (_amount * 1e18) / exchangeRate;
        IERC20(token).transfer(_user, _amountToTransfer);
        emit SellV1UpsDB(_amountToTransfer, _user, signature);
    }

    function stringToBytes32(string memory source)
        internal
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    // Modifier only admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }
}
