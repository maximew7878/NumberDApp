// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage{
    uint a =10;
    function setter(uint _a)public{
        a = _a;
    } 
    function getter() public view returns(uint){
        return a;
    }
}