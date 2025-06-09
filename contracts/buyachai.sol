// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract buyachai {
    address payable owner_contract;
    uint256 public minimum_amount;

    struct transaction_struct {
        string name;
        string message;
        uint timestamp;
        address from;
    }

    transaction_struct[] transactions_array;

    event transaction_successful(
        string name,
        string message,
        uint timestamp,
        address from
    );

    constructor() {
        owner_contract = payable(msg.sender);
        minimum_amount = 0.0001 ether;
    }

    function buyChai(
        string calldata name,
        string calldata message
    ) external payable {
        require(
            msg.value > minimum_amount,
            "Please pay more than 0.0001 ether"
        );
        owner_contract.transfer(msg.value);
        transactions_array.push(
            transaction_struct(name, message, block.timestamp, msg.sender)
        );
        emit transaction_successful(name, message, block.timestamp, msg.sender);
    }

    function getTransactions()
        public
        view
        returns (transaction_struct[] memory)
    {
        return transactions_array;
    }
}
