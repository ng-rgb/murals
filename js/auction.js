
   /*********************************************************************************************
   .) MORALIS (for loggin and other quickfixes)
   **********************************************************************************************/
     

  // 0. Check moralis
  const serverUrl = "https://hyorvrgxcdmm.usemoralis.com:2053/server";
  const appId = "Lx28OvD1jYsfl8Q52brKgUbJ1yGP9kWgffDg2hrU";
  Moralis.start({ serverUrl, appId });
 
   /*********************************************************************************************
   .) LOGIN stuff
   **********************************************************************************************/
     


    /** Add from here down */
    async function login() {
        console.log('login tryied');
        let user = Moralis.User.current();
        if (!user) {
          try {
           let user = await Moralis.authenticate({ signingMessage: "Hello from cryoptomurals!" })
            let userAddress =user.get('ethAddress');
            document.getElementById("logg").innerHTML = "<p>" + userAddress + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
            console.log('User address: ',userAddress)
      
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('user is already here...');
          Moralis.enableWeb3(); //if user has a sesion authenticate is not called so metamaks is not initiated, here we fix this
          let userAddress =user.get('ethAddress');
          document.getElementById("logg").innerHTML = "<p>" + userAddress + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
    
        }
      }
  
   
  
      async function logOut() {
        await Moralis.User.logOut();
        document.getElementById("logg").innerHTML = `<button  class="btn-grad"   onclick="login();">Connect</button>`
      
        console.log("logged out");
      }
  
      

// .................................
// AUCTION FUNCTIONS
// .................................

// let auctionBtn = document.getElementById("auctionBtn");
// auctionBtn.onclick = () => {
// function genQR (){
//     $('#test').qrcode({
//         width: 120,
//         height: 120,
//         text: "https://github.com/jeromeetienne/jquery-qrcode"});
//         // <div id="qrcode"></div>
//         // Then you add the qrcode in this container by
//         // jquery('#qrcode').qrcode("this plugin is great");
//         // You can set the height and width of the generated qrcode:
//         // jquery('#qrcode').qrcode({width: 64,height: 64,text: "size doesn't matter"});
// }

// GRAB SMART CONTRACT FROM URL
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
      m,
      key,
      value
    ) {
      vars[key] = value;
    });
    console.log('auction urlvars:',vars );
    return vars;
  }
  
function auctionBtn() {
    // auction.style.display = "block";
    // document.getElementById("header").style.display = "none";
    // document.getElementById('auctionCancelBtn').style.display = 'none';
  }
  
  function auctionCancelBtn() {
    // document.getElementById('auction').style.display = 'none';
    auction.style.display = "none";
    document.getElementById("header").style.display = "flex";
  }
  async function auctionCreate() {
    if (addrA.value.length == 0) {
      alert("Please enter eth address of artist");
      return;
    } else if (addrB.value.length == 0) {
      alert("Please enter eth address of Motion designer");
      return;
    } else if (addrC.value.length == 0) {
        alert("Please enter eth address of CAUSE");
        return;
      } else if (addrD.value.length == 0) {
        alert("Please enter eth address of Cryptomurals");
        return;
      } else if (duration.value.length == 0) {
      alert("Please enter auction's duration");
      return;
    }
    // if (duration.value.length == 0) {
    //     alert("Please enter auction's duration");
    //     return;
    // }
  
    // console.log('estos son los parametros ingresados: ',[duration.value ,addrA.value, addrB.value] );
    // console.log('estos son los parametros ingresados: ',[duration.value ,addrA.value, addrB.value, addrC.value, addrD.value] );
    // console.log('auction json: ',auctionTruffleContractAbi);
    // const A = 120;// 2minutos
    // const B = '0x63b0afeed4f2C2c4ca0D4A98AEe93A303304dF41';
    // const C = '0x8Ab2A64D0767140ADc2886EAB4ac2e9a48fda03b';

    //artist = '0x1c87FDF8844cbEe5DC7f0F1681C44bF3c99A0e3d'; // unorus, mi wallet
    //motionDesigner = ''; ///addres nat
    // cause = '0x250317D3C001c68018ff333e75Bbdd9699fcE78E'; // la tengo en mi wallet
// cryptomurals ='0x9031FDE86c3c9115d302043316E97dD9ef5d3e66';
  
    window.web3 = await Moralis.Web3.enable();
    const userAddress = user.get('ethAddress');
    // const userAddress = currentUser;

    MyContract = new web3.eth.Contract(auctionContractAbi); // abi de remix
    await MyContract.deploy({
      data: auctionBitecode, //tomado de truffle
      // arguments: [duration.value, B, C]
      // arguments: [A, B, C]
      arguments: [duration.value, addrA.value, addrB.value]
      // }).send({from: userAddress });
    })
      .send({
        from: ethereum.selectedAddress
        // from: userAddress
      })
      .on("error", error => {
        console.log(error);
      })
      .on("transactionHash", transactionHash => {
        console.log("tx hash: ", transactionHash);
      })
      .on("receipt", receipt => {
        console.log(receipt);
        if (receipt.contractAddress) {
          console.log("contract Address: ", receipt.contractAddress);
          const AUCTION_CONTRACT_ADDRESS = receipt.contractAddress;
  
          Swal.fire(
            "Genial!",
            "El contrato " +
              '<strong style="font-size: 1.4rem">' +
              AUCTION_CONTRACT_ADDRESS +
              "</strong>" +
              " ha sido creado!. (La subasta comienza)",
            "success"
          );
  
          // ADD the contract to the URL
          window.history.replaceState(
            null,
            null,
            "?c=" + AUCTION_CONTRACT_ADDRESS
          );
  
          // ADDs the contract to the UI
          window.auctionContract = new web3.eth.Contract(
            auctionContractAbi,
            AUCTION_CONTRACT_ADDRESS
          );
          document.getElementById("auction").style.display = "none";
          document.getElementById("bidding").style.display = "block";
  
          // ADD share button at the right of the contract
          document.getElementById("contractInfo").innerHTML =
            "Current Contract: " +
            AUCTION_CONTRACT_ADDRESS +
            ' <i class="fas fa-share-alt"  id="shareContract" aria-hidden="true"></i>';
  
          let YOUR_TITLE = "Check out this aution! ";
          let YOUR_URL = window.location.href;
  
          document.getElementById("shareContract").onclick = function() {
            Swal.fire({
              title: "<strong>Share this auction</strong>",
              icon: "info",
              html:
                '<div id="social">' +
                '<a target="_blank" class="" href="https://twitter.com/intent/tweet?text=' +
                YOUR_TITLE +
                "&url=" +
                YOUR_URL +
                '&via=xunorus"><i class="fab fa-twitter" aria-hidden="true"></i></a>' +
                '<a target="_blank" class="" href="https://www.facebook.com/sharer/sharer.php?u=' +
                YOUR_URL +
                '"><i class="fab fa-facebook" aria-hidden="true"></i></a>' +
                '<a target="_blank" class="" href="https://telegram.me/share/url?url=' +
                YOUR_URL +
                "&text=" +
                YOUR_TITLE +
                '"><i class="fab fa-telegram" aria-hidden="true"></i></a>' +
                '<a class=" copytxt"><i class="fas fa-clipboard" aria-hidden="true"></i></a></div>',
              showCloseButton: true,
              showCancelButton: false,
              showConfirmButton: false
            });
          };
        }
      });
  
    // STARTS COUNTDOWN
    const ends = await auctionContract.methods.auctionEndTime().call();
    endOfAuction = ends * 1000;
    countToEpoc(endOfAuction);
  }
  
  async function auctionEndTime() {
    const res = await auctionContract.methods.auctionEndTime().call();
    console.log(res);
    var myDate = new Date(res * 1000);
    var auctionEnds = myDate.toLocaleString();
    Swal.fire(
      '<b style="font-size: 2.3rem">' + auctionEnds + "</b>",
      "Es la fecha de caducidad de este contrato",
      "info"
    );
  }
  
  async function artistA() {
    const res = await auctionContract.methods.artistA().call();
    console.log(res);
    Swal.fire(
      '<b style="font-size: 1.5rem">' + res + "</b>",
      "Es la address del artista A",
      "info"
    );
  }
  
  async function artistB() {
    const res = await auctionContract.methods.artistB().call();
    console.log(res);
    Swal.fire(
      '<b style="font-size: 1.5rem">' + res + "</b>",
      "Es la address del artista B",
      "info"
    );
  }
  
  async function highestBid() {
    const res = await auctionContract.methods.highestBid().call();
    console.log(res);
    const amountInEth = web3.utils.fromWei(res, "ether");
    // const amountInEth = web3.utils.fromWei(res.value, 'ether');
  
    Swal.fire(amountInEth + " ETH", "Es la apuesta mas alta", "info");
  }
  
  async function highestBidder() {
    const res = await auctionContract.methods.highestBidder().call();
    console.log(res);
    Swal.fire(
      '<b style="font-size: 1.5rem">' + res + "</b>",
      "Es la address con la apuesta mas alta",
      "info"
    );
  }
  
  async function auctionEnd() {
    //1- check if auction ended first!
    const ends = await auctionContract.methods.auctionEndTime().call();
    const timestamp = Date.now();
    endOfAuction = ends * 1000;
  
    if (timestamp > endOfAuction) {
      auctionContract.methods
        .auctionEnd()
        .send({
          from: ethereum.selectedAddress
          // from: userAddress
        })
        .on("receipt", function(receipt) {
          //the receipt is what we get back from the blockchain whenever a tx has been added into the block and we know the results of the tx
          console.log(receipt);
          console.log(receipt.events.AuctionEnded.returnValues.c);
  
          if (receipt.events.AuctionEnded.returnValues.winner) {
            //   alert('you won!');
            console.log(
              "winner:",
              receipt.events.AuctionEnded.returnValues.winner
            );
            Swal.fire(
              "Has terminado la subasta!",
              "Ganador:" + receipt.events.AuctionEnded.returnValues.winner,
              //  + '<br>Artista A:'+ receipt.events.AuctionEnded.returnValues.0,
              "success"
            );
            document.getElementById("auction").style.display = "block";
            document.getElementById("bidding").style.display = "none";
          } else {
            Swal.fire("Finalizado!", "Has terminado la subasta", "info");
          }
        });
    } else {
      Swal.fire("Aun continua!", "La subasta aun no ha terminado", "warning");
    }
  }
  
  async function bid() {
    if (!user) {
      // Check if user is no defined
      console.log("user is not defined");
      // user = await Moralis.Web3.authenticate();
      // document.getElementById('userInfo').style.display = 'block';
      login;
    }
    if (offer.value.length == 0) {
      alert("Please set an ETH amount for your bid");
      return;
    }
    let amount = document.getElementById("offer").value;
    let amountInEth = web3.utils.toWei(amount, "ether");
  
    const ends = await auctionContract.methods.auctionEndTime().call();
    const timestamp = Date.now();
    endOfAuction = ends * 1000;
    if (timestamp > endOfAuction) {
      //auction ended already
      Swal.fire("Ups!", "La subasta ya ha terminado", "warning");
    } else {
      //   auction is On!
      auctionContract.methods
        .bid()
        .send({
          value: amountInEth,
          from: ethereum.selectedAddress
          // from: userAddress
        })
        .on("receipt", function(receipt) {
          console.log(receipt);
          Swal.fire("Perfecto!", "Su apuesta esta en Juego", "success");
        });
    }
  }
  
  async function widthdraw() {
    auctionContract.methods
      .widthdraw()
      .send({
        from: ethereum.selectedAddress
      })
      .on("receipt", function(receipt) {
        //the receipt is what we get back from the blockchain whenever a tx has been added into the block and we know the results of the tx
        console.log(receipt);
      });
  }
  
  function countToEpoc(t) {
    const x = setInterval(function() {
      let timestamp = Date.now();
      let distance = t - timestamp;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("countdowner").innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      if (distance < 0) {
        clearInterval(x);
        // document.getElementById("countdowner").innerHTML = "EXPIRED";
        document.getElementById("countdowner").innerHTML =
          dictionary[globalLang]["expired"];
      }
    }, 1000);
  }
  // countToEpoc(1631128966000);
  
  // fin auction functions

document.getElementById("auctionStart").onclick = auctionCreate;

// autofill para testing/
// document.getElementById('input_tokenid').value = 'tokenid';
// document.getElementById('input_tokencontract').value = 'tokencontract';
document.getElementById('duration').value = '120';
document.getElementById('addrA').value = '0x1c87FDF8844cbEe5DC7f0F1681C44bF3c99A0e3d';
document.getElementById('addrB').value = '0x1c87FDF8844cbEe5DC7f0F1681C44bF3c99A0e3d';
document.getElementById('addrC').value = '0x250317D3C001c68018ff333e75Bbdd9699fcE78E';
document.getElementById('addrD').value = '0x9031FDE86c3c9115d302043316E97dD9ef5d3e66';



