
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

      
  /*********************************************************************************************
 .) MINT UPDATER
//  https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft
**********************************************************************************************/


const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.nftport.xyz/v0/mints/customizable",
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "524a1fad-f13f-4317-8ad0-0e75e45d4b61"
    },
    "processData": false,
    "data": "{\n  \"chain\": \"polygon\",\n  \"contract_address\": \"0xC8D297D7b496f86673551c933815B47973FC4a0e\",\n  \"token_id\": \"1\",\n  \"metadata_uri\": \"ipfs://QmTz7dGHvXghNuh3V64QBwHPXva4chpMR7frpfxCaxvhd4\"\n}"
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });