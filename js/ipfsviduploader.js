   /*********************************************************************************************
   .) TOAST
   **********************************************************************************************/
     

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
            // document.getElementById("logg").innerHTML = "<p>" + userAddress + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
            var x = userAddress;
            var shortAddr = x.substring(0, 8) + "...";
            document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + shortAddr + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
      

            console.log('User address: ',userAddress)
      
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('user is already here...');
          Moralis.enableWeb3(); //if user has a sesion authenticate is not called so metamaks is not initiated, here we fix this
          let userAddress =user.get('ethAddress');
          // document.getElementById("logg").innerHTML = "<p>" + userAddress + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
          var x = userAddress;
          var shortAddr = x.substring(0, 8) + "...";
          document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + shortAddr + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
  
          
        }
      }
  
   
  
      async function logOut() {
        await Moralis.User.logOut();
        document.getElementById("logg").innerHTML = `<button  class="btn-grad"   onclick="login();">Connect</button>`
      
        console.log("logged out");
      }
  
      
  /*********************************************************************************************
 .) INITIALIZE DAPP
**********************************************************************************************/

// initializeApp();
  
  async function initializeApp(){
    console.log("iniciar has benn triggered");

    // INICIA USUARIO
    if (typeof web3 !== "undefined") {
      console.log("1- web3 is enabled");
      
      document.getElementById("logg").innerHTML = 	`<button id="login" onclick="login();" class="btn-grad">CONNECT</button>`
      
      let user = Moralis.User.current();
      if (!user) {
       console.log(' user is not loggedbut we do nothing ;) ');
          
      } else {
        console.log('user is already here...');
        Moralis.enableWeb3(); //if user has a sesion authenticate is not called so metamaks is not initiated, here we fix this
        let userAddress =user.get('ethAddress');
        var x = userAddress;
        var shortAddr = x.substring(0, 8) + "...";
        document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + shortAddr + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
  
      }




    } else {
      console.log("web3 is not found");
      // noWeb3();
      Swal.fire({ title: "web3 is not found", icon: "info", html: 'A web3 enabled browser is needed to use Cryptomurals. ' + '.', showCloseButton: true, focusConfirm: false, confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK', confirmButtonAriaLabel: "Thumbs up, great!" });
    }
}


initializeApp();
  
  ///////////////////////////////////
  // UPLOAD IMG
  //////////////////////////////////
// const NFTPORT_KEY = '524a1fad-f13f-4317-8ad0-0e75e45d4b61';
// const CHAIN = "polygon"; 


uploadImg = async img => {

    // Save file input to IPFS
const data = input_image.files[0]
const file = new Moralis.File(data.name, data)
await file.saveIPFS();
// const nftFilePath = file.ipfs();
const imageHash = file.hash();
    // console.log("image uploaded to ipfs: ", nftFilePath);
    console.log('imageHash',imageHash);
// let ipfsLink =  "/ipfs/" + imageHash;
let ipfsLink =  "ipfs://" + imageHash;
// console.log('linkK: ',ipfsLink);

// SHOW OPERATION DETAILS;
document.querySelector('#success_message').innerHTML =`File uploaded to IPFS: ${imageHash} .<br> <a target="_blank" href="${ipfsLink}">view FILE</a>`;
document.querySelector('#success_message').style.display= 'block';

  };
  
  document.getElementById('submit_button').onclick = uploadImg;


  //   image uploaded to ipfs:  https://ipfs.moralis.io:2053/ipfs/QmUSVgjuatTzmVTgoj9zBeg5npFJR7kVKbuU2ZeThMRXEV