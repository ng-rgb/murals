//TOAST
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
  
  
  
  
  // 0. Check moralis
  const serverUrl = "https://hyorvrgxcdmm.usemoralis.com:2053/server";
  const appId = "Lx28OvD1jYsfl8Q52brKgUbJ1yGP9kWgffDg2hrU";
  Moralis.start({ serverUrl, appId });
  const TOKEN_CONTRACT_ADDRESS = "0xf1CCd9b401cb1b37eEd0fEC58752b0E07bd9A1D7"; // murals1155-v1d.sol 21-2-3-4-5-6-7
  const token_contract_address = TOKEN_CONTRACT_ADDRESS.toLowerCase();
  console.log(token_contract_address);
  let currentChain = 'rinkeby';
  
  
  /** Add from here down */
  async function login() {
    console.log('login tryied');
    let user = Moralis.User.current();
    if (!user) {
      try {
       let user = await Moralis.authenticate({ signingMessage: "Hello from murals!" })
        let userAddress =user.get('ethAddress');
        document.getElementById("logger").innerHTML = "<p>" + userAddress + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
        console.log('User address: ',userAddress)
  
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('user is already here...');
      Moralis.enableWeb3(); //if user has a sesion authenticate is not called so metamaks is not initiated, here we fix this
    }
  }
  
  
  
  async function logOut() {
    await Moralis.User.logOut();
    document.getElementById("logger").innerHTML = `<button  class="btn-grad"   onclick="login();">Connect your wallet</button>`
  
    console.log("logged out");
  }
  
  ///////////////////////////////////
  // initApp
  //////////////////////////////////
  async function initApp() {
    document.querySelector('#app').style.display = 'block';
  
     // CHEQUEA WEB
     if (typeof web3 !== "undefined") {
      console.log("1- web3 is enabled. we continue... ");
    } else {
      console.log("web3 is not found");
      Swal.fire({ title: "web3 is not found", icon: "info", html: 'A web3 enabled browser is needed to use Murals. ' + '.', showCloseButton: true, focusConfirm: false, confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK', confirmButtonAriaLabel: "Thumbs up, great!" });
    }
  
     // INICIA USUARIO
    let user =  Moralis.User.current();
    web3 = await Moralis.Web3.enable();
  
    if (!user || user === null){ 
      document.getElementById("logger").innerHTML = 	`<button id="login" onclick="login();" class="btn-grad">CONNECT WALLET</button>`
  
    } else{
      let userAddress = user.get("ethAddress");
      document.getElementById("logger").innerHTML = "<p>"+userAddress +" <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
      console.log("user has already signed in");
      Toast.fire( " Great!", "  You are already logged in", "success" );
    }
    
  
  }
  
  ///////////////////////////////////
  // SUBMIT
  //////////////////////////////////
  async function submit() {
    console.log('submit clicked');
  
    //get image data
    const input = document.querySelector('#input_image');
    let data = input.files[0];
  
    // upload image to ipfs
    const imageFile = new Moralis.File(data.name, data);
    await imageFile.saveIPFS();
    let imageHash = imageFile.hash();
    console.log(imageHash);
    console.log(imageFile.ipfs());
  
    //create metadata with image hash and data
    let metadata = {
      name: document.querySelector('#input_name').value,
      description: document.querySelector('#input_description').value,
      image: "/ipfs/" + imageHash
    }
  
    // upload metadata to ipfs
    const jsonFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata))
    });
    await jsonFile.saveIPFS();
    let metadataHash = jsonFile.hash();
    console.log(metadataHash);
  
    //upload to rarible (plugin)
    let user = Moralis.User.current();
    let res = await Moralis.Plugins.rarible.lazyMint({
      chain: 'rinkeby',
      userAddress: user.get("ethAddress"),
      tokenType: 'ERC721',
      tokenUri: "/ipfs/" + metadataHash,
      royaltiesAmount: 500, // 50 % royalty
    })
    console.log(res);
    let token_address = res.data.result.tokenAddress;
    let token_id = res.data.result.tokenId;
    console.log(token_address,token_id);
    let url = `https://rinkeby.rarible.com/token/${token_address}:${token_id}`
    console.log(url);
    document.querySelector('#success_message').innerHTML =`NFT minted. <a target="_blank" href="${url}">view NFT</a>`;
    document.querySelector('#success_message').style.display= 'block';
    setTimeout(() => {
      document.querySelector('#success_message').style.display= 'none';
    }, 20000);
  
  }
  
  
  
  document.getElementById("btn-login").onclick = login;
  document.getElementById("btn-logout").onclick = logOut;
  document.getElementById("submit_button").onclick = submit;
  initApp();
  