// SPDX-License-Identifier: GPL-3.0
//formato(duracionDeLaSubastaEnSegundos, address1, address2)
// cualquiera puede llamar la funcion bid con el monto que desea aportar a la SUBASTA
// la terminar la duracionDeLaSubastaEnSegundos cualquiera puede llamar a la funcion aucitonEnd
// auctionEnd, divide la apuesta mas alta y la reparte entre la dos direcciones
// la funcion widthdraw la puede llamar cualquier address, pero solo le devolvera el dinero que tiene apostado si se le debe
pragma solidity >=0.7.0 <0.9.0;

contract cryptomuralsAuction {
    // parameters of the simple auction
    uint public auctionEndTime;
    
    //inserto aqui las addresses de los  dos artistas
    address payable public artista;
    address payable public motiondesigner;
    address payable public cause;
    address payable public cryptomurals;
    
    // current state of the auctionEndTime
    address public highestBidder;
    uint public highestBid;
    
    mapping(address => uint) public pendingReturns;
    
    bool ended = false;
    
    event HighestBidIncrease(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);
    
    constructor(uint _biddingTime, address payable _artista, address payable _motiondesigner, address payable _cause , address payable _cryptomurals){
         artista = _artista;
         motiondesigner = _motiondesigner;
        cause = _cause;
        cryptomurals = _cryptomurals;


        auctionEndTime = block.timestamp + _biddingTime;
    }
    
    /// THREE FUNCTIONS
    
    // 1- allows users to bid
    function bid()public payable{
        if(block.timestamp > auctionEndTime){
            revert("La SUBASTA YA HA TERMINADO");
        }
        
        // we want to make shure that whatever is being bid, is higher than the already highest bid we have
        if(msg.value <= highestBid){
            revert("YA HAY UNA APUESTA IGUAL O SUPERIOR!");
        }
        
        // add the current highestBidder y highestBid to this map. This way the funds of previous highest bidder 
        //will be stucked in here and he will be able to access them by calling the widthdraw function
        if(highestBid != 0){
            pendingReturns[highestBidder] += highestBid;
        }
        
        // if we pass this tests, now we can set our highestBidder
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncrease(msg.sender, msg.value);
    }
    
    // 2- allows users to widthdraw whatever they send that cannot be used for this
    function widthdraw() public returns(bool){
        uint amount = pendingReturns[msg.sender];
        if(amount > 0){
            pendingReturns[msg.sender] = 0;
            
            // in case the payment didnt go through, then his value inside of this mapping goes back to where it was
            if(!payable(msg.sender).send(amount)){
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
          return true;

    }
    
    // 3- just to actually end the auction when the time is done, and send the auction to the beneficiary
    function auctionEnd() public {
        if(block.timestamp < auctionEndTime){
            revert("LA SUBASTA TODAVIA NO HA TERMINADO");
        }
        
        // We want to make sure that our auction hasnt finished yet
        if(ended){
            revert("THE FUNCTION AuctionEnded HAS ALREADY BEEN CALLED");
        }        
        
        // if tests passed we set our value to true
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);
        
        //splits highestBid into 2
        uint splitedPrize = highestBid/4;
            
        //send the funds to each artist
        artista.transfer(splitedPrize);
        motiondesigner.transfer(splitedPrize);
        cause.transfer(splitedPrize);
        cryptomurals.transfer(splitedPrize);
    }
    
    
    
}

