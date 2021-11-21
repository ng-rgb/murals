/*****
MURALS
Murals is an NFT marketplace for artists related to murals...
Release under MIT License by Xunorus, 2021
http://xunorus.com
*****/

const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });
  
  const fixedToast = swal.mixin({
    toast: true,
    position: "top-left",
    showConfirmButton: false,
    showConfirmButton: true
  });
  
  


  
  
  
  ////////////////////////////////////////
// retriebe all nfts per contract
const NFTPORT_KEY = '524a1fad-f13f-4317-8ad0-0e75e45d4b61';
const TOKEN_CONTRACT_ADDRESS = "0x0dB4DF5E0FF20aCF2E3469d5756103A3e03cd1a1"; // creados desde nftport como erc721 en polygon pero los mintea en rinkeby
const CHAIN = "polygon"; // creados desde nftport como erc721 en polygon pero los mintea en rinkeby
const parent = document.getElementById("inventory");
const insideContent = document.getElementById("overlay");

// RETRIEVE NFTs
const settings = { "async": true, "crossDomain": true, "url": `https://api.nftport.xyz/v0/nfts/${TOKEN_CONTRACT_ADDRESS}?chain=${CHAIN}`, "method": "GET", "headers": { "Content-Type": "application/json", "Authorization": `${NFTPORT_KEY}` } };

$.ajax(settings).done(function (response) {
  console.log('TOTAL NFTs: ',response.nfts.length);
  for (var i = 0; i < response.nfts.length; i++) {
    let token = response.nfts[i].token_id,
      caddr = response.nfts[i].contract_address,
      chain = response.nfts[i].chain;

    // document.getElementById("main").innerHTML += "<p>" + token + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
    const settings = { "async": true, "crossDomain": true, "url": `https://api.nftport.xyz/v0/nfts/${caddr}/${token}?chain=${chain}`, "method": "GET", "headers": { "Content-Type": "application/json", "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61" } };

    $.ajax(settings).done(function (x) {
let name = x.nft.metadata.name;
let description = x.nft.metadata.description;
let image = x.nft.metadata.image;
let token = x.nft.token_id;
let contract = x.nft.contract_address;
let chain  = x.nft.chain;

console.log('name:', name);
console.log('description:', description);
console.log('image:', image);
console.log('token:', token );
console.log('contract:', contract );
console.log('chain:', chain );
console.log('x:', x );


      let htmlString =`
      <div class="box">
        <div class="box__shadow"></div>
        <img class="box__img" src="${image}" alt="Some image"/>
        <h3 class="box__title"><span class="box__title-inner" data-hover="${name}">${name}</span></h3>
        <h4 class="box__text"><span class="box__text-inner">${chain}</span></h4>
        <div class="box__deco">&#10032;</div> 
        <p class="box__content">${description} <br>
        </p>
      </div>
      `
      let col = document.createElement("a");
      col.className = "grid__item";
      col.href = "#preview-"+`${token}`;
      col.id = `${token}`;//truco poner el nftId en el id del item (a tag)
      col.innerHTML = htmlString;
      parent.appendChild(col);


       // OVERLAY
    let htmlStringOverlay =`
    <div class="box">
      <div class="box__shadow"></div>
      <img class="box__img box__img--original" src="${image}" alt="Some image"/>
      <h4 class="box__text box__text--bottom"><span class="box__text-inner box__text-inner--rotated1">${token}</span></h4>
      </div>
      
      <div  class="overlay__content">
      <h3 class="box__title box__title--straight box__title--bottom"><span class="box__title-inner">${name}</span></h3>
      <p >${description}</p>
      <p class="box__content">${description} <br>
      </p>
      </div>
      <div class="wrapper" onclick="initBuy();"> <a class="cta" href="#"> <span>BUY</span> <span> <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path> <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path> <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path> </g> </svg> </span> </a> 
      <div class='actions'>    
      <button onclick="initMinterModal();"  ><span>Mint</span></button>
      <button onclick="initTransferModal();" > <span>Transfer</span>  </button>
      <button onclick="initBurnerModal();" > <span>Burn</span>  </button>
      </div>
      </div>
      `
    let overlay = document.createElement("div");
    overlay.className = "overlay__item";
    overlay.id="preview-"+`${token}`;
    overlay.innerHTML = htmlStringOverlay;
    insideContent.appendChild(overlay);




    console.log('parece que cargo todo');
    iniciar();// starts demo.js

    });


  }

});

initializeApp();
  
  async function initializeApp(){
      console.log("iniciar has benn triggered");
  
      // INICIA USUARIO
      if (typeof web3 !== "undefined") {
        console.log("1- web3 is enabled");
      } else {
        console.log("web3 is not found");
        // noWeb3();
        Swal.fire({ title: "web3 is not found", icon: "info", html: 'A web3 enabled browser is needed to use Murals. ' + '.', showCloseButton: true, focusConfirm: false, confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK', confirmButtonAriaLabel: "Thumbs up, great!" });
      }
  }
  
  
  /** Add from here down */
  async function login() {
  //   document.getElementById("logg").innerHTML = "<p>"+userAddress +" <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logout()'></i> </p>";
  //   document.getElementById("logg").innerHTML = 	`<button id="login" onclick="login();" class="btn-grad">CONNECT YOUR WALLET</button>`
  }
  
  
   
  
  // ------------------------------------------------
  // BUY
  // buyItem = async item => {
  //   Swal.fire(
  //     'sorry!',
  //     'this is a work in progress... no buying just yet!',
  //     'success'
  //   )


  //   user = await Moralis.User.current();
  //   if (!user) {
  //     login();
  //     return;
  //   }
  
  //   console.log("buyItem: ", item, " tokenObjectId: ", item.tokenObjectId);
  //   itemBeingBought = item.tokenObjectId;
  //   await marketplaceContract.methods.buyitem(item.uid).send({
  //     from: user.get("ethAddress"),
  //     value: item.askingPrice
  //   });
  // };
  
    
   /*********************************************************************************************
   .) NAVBAR
   **********************************************************************************************/
   var navb = document.getElementById('button');
   var sideBar = document.getElementById('sideBar');
   var content= document.getElementById('main');
   navb.onclick = navbar;
   
   function navbar() {
     if (navb.classList.contains('is-active')) { // if user is no defined
         console.log('CIERRA');
         navb.classList.remove('is-active');
         sideBar.classList.remove('isOpen');
         content.classList.remove('isOpen');
   
         TweenMax.to(".nav", 0.5, { xPercent: -100, display: 'none', ease: Expo.easeOut });
         window.removeEventListener("click", listener, false);
   
     } else {
         console.log('ABRE');
         navb.classList.add('is-active');
         sideBar.classList.add('isOpen');
         content.classList.add('isOpen');
         TweenMax.fromTo(".nav", 0.5, { xPercent: -100 }, { xPercent: 0, display: 'block', ease: Expo.easeOut });
         TweenMax.staggerFrom('.nav li', 0.5, { opacity: 0, y: 20, ease: Power2.easeInOut }, 0.1);
         setTimeout(() => { window.addEventListener("click", listener, false); }, 100);
   
     }
   }
   
   function listener(e) {
     if (sideBar.contains(e.target)) {
         console.log("clicked A Inside" + e.target);
     } else {
         console.log("clicked B outside" + e.target);
         navb.classList.remove('is-active');
         sideBar.classList.remove('isOpen');
         content.classList.remove('isOpen');
         TweenMax.to(".nav", 0.5, { xPercent: -100, display: 'none', ease: Expo.easeOut });
         window.removeEventListener("click", listener, false);
     }
   }
  
      
   /*********************************************************************************************
   .) MODALS
   **********************************************************************************************/
     
  //////////////////////////
  // CLOSE MODAL
  let closeModal = document.getElementsByClassName("closeModal");
  for (i = 0; i < closeModal.length; i++) {
    closeModal[i].onclick = function() {
      minterModal.style.display = "none";
      transferModal.style.display = "none";
      burnerModal.style.display = "none";
      
    };
  }
  
  //////////////////////////
  // MINT
  function initMinterModal() {
    minterModal.style.display = "block";
    console.log('showing modal');
    const urlParams = new URLSearchParams(window.location.search);
      const nftId = urlParams.get("nftId");
      console.log('nftId:', nftId);
      document.getElementById("token_id_input").value = nftId;//populate input
      document.getElementById("address_input").value = accounts[0];//populate address
  }
  
  async function mint(){
    let tokenId = parseInt( document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount =  parseInt(document.getElementById("amount_input").value);
    //define contract
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractAbi,TOKEN_CONTRACT_ADDRESS );
    contract.methods.mint(address, tokenId,amount).send({from: accounts[0], value: 0})
    .on('receipt', function(receipt){
      Swal.fire(
        'Good job!',
        'Item minted!',
        'success'
      )
    })
  }
  
  document.getElementById('submit_mint').onclick = mint;
  
  //////////////////////////
  // TRANSFER
  function initTransferModal() {
    transferModal.style.display = "block";
    console.log('showing transfer modal');
    const urlParams = new URLSearchParams(window.location.search);
      const nftId = urlParams.get("nftId");
      console.log('nftId:', nftId);
      document.getElementById("transferToken_id_input").value = nftId;//populate input
  }
  
  async function transfer(){
    let tokenId = parseInt( document.getElementById("transferToken_id_input").value);
    let amount =  parseInt(document.getElementById("transferAmount_input").value);
    let address = document.getElementById("transferAddress_input").value;
  
    const options = {
    type: "erc1155",
    receiver: address,
    contractAddress: TOKEN_CONTRACT_ADDRESS,
    tokenId: tokenId,
    amount: amount,
    awaitReceipt: false // should be switched to false
  }
    
    let tx = await Moralis.transfer(options);
    console.log(tx);
  tx.on("transactionHash", (hash) => { 'transactionHash: ',hash })
    .on("receipt", (receipt) => { console.log('receipt: ',receipt) })
    .on("confirmation", (confirmationNumber, receipt) => { 'confirmation:', confirmationNumber, receipt })
    .on("error", (error) => { 'error: ', error });
  
  
  }
  
  document.getElementById('submit_transfer').onclick = transfer;
  
  //////////////////////////
  // BURN
  function initBurnerModal() {
    burnerModal.style.display = "block";
    console.log('showing burner modal');
    const urlParams = new URLSearchParams(window.location.search);
      const nftId = urlParams.get("nftId");
      console.log('nftId:', nftId);
      document.getElementById("burnerToken_id_input").value = nftId;//populate input
      document.getElementById("burnerAddress_input").value = accounts[0];//populate address
  
  }
  
  // burn(address account, uint256 id, uint256 value)
  async function burn(){
    let tokenId = parseInt( document.getElementById("burnerToken_id_input").value);
    let address = document.getElementById("burnerAddress_input").value;
    let amount =  parseInt(document.getElementById("burnerAmount_input").value);
    //define contract
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractAbi,TOKEN_CONTRACT_ADDRESS );
    contract.methods.burn(address, tokenId,amount).send({from: accounts[0], value: 0})
    .on('receipt', function(receipt){
      Swal.fire(
        'Good job!',
        'Item burned!',
        'success'
      )
    })
  }
  
  document.getElementById('submit_burn').onclick = burn;


    
  //////////////////////////
  // BUY
  function initBuy() {
    // burnerModal.style.display = "block";
    // console.log('showing burner modal');
    // const urlParams = new URLSearchParams(window.location.search);
    //   const nftId = urlParams.get("nftId");
    //   console.log('nftId:', nftId);
    //   document.getElementById("burnerToken_id_input").value = nftId;//populate input
    //   document.getElementById("burnerAddress_input").value = accounts[0];//populate address
  

      Swal.fire(
            'sorry!',
            'this is a work in progress... no buying just yet!',
            'success'
          )
  }
  
  
  
  // document.getElementById('submit_burn').onclick = burn;