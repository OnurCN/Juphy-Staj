import axios from 'axios'
import _ from 'lodash'
// Get Whatsapp Business ID
const wabaID = 106309038768955
const phoneID = 108367448560459
const businessId = 184030684071430
const systemUserToken = "EAAKYgBJbZBMoBAKoBP6uBWINZB3dsw41g1APJ7H2Ip6jvbjLNOstprvUZCEDEWKu9ZB8enGEJYZBrFnvJjZAo0Gr3ZBrKvUQctnU7kPZBSCagWERxQ7IfixUZCCnvnEOfXfRUm39wnySeqBFrraOwG5C4kCpbnO3QiZALXZCDy2mvQWLE2vVS0kMAmVXPB8XH8qIb3PbwIzxmCykQZDZD"
const code ="AQDLFQ6MjorWBjRfRhOUlTvpX80qhsAv6vNhi4fZBEduTgFb3AHyVFFir1xUzbgoqcQAkq1rmCr0vkTHq3gvcHW1DiXV1OiNxI18hckbEl-CSSHVFrFMJY-_zg4LXbMdGzhrR3WQtbGNRLJOQiAkxHvF8kzW2it8dqt8e23nEolkD737vfeHL7m0TePZ8tZTkhZXYusy707lUAa2pweAk2-gojGFiiOPSyrPU10meakZoszh6Lm_ATYlTqD8vbvnCzGMBhxpqZ6OfwugKmoXBU_tFVNu7q1jhLbg8ni-PoOFkqahyV5F8ei9D3covvOUcjhnZjo1MxjMK_Nx0BCmrBhPC0Ysk7lNn56NfUYvA7MYmF7CcGAa44Z7RRTj1l1JSCVBCuuZZekcbdzY3nQihf"
let accessToken = "EAADIjIWUN0IBADyNjO1t80e4ASZCZCVCbsg4H8yVoYgDPWgbWG9ESvXfWwCLASaJdvzQOqu1R5xJF03XFiYrlbZBErjkcxIKmsDjQBO3pvVloZA3yMHU8ZBnSJ1KEHJKEXAzyB68WODMheGOXicluPW6SFnKmOTGTuNpqEVOPoPCr5H2U9qwJ2BDfjVwud8Sipd4cjVRVPFlESqZBJW5aMKjJTORRdBhoZAisZCb7tR5RlWBtPxZBspyh"
 let token = "EAADIjIWUN0IBAEiQf0X5q36ztFQXtrsTinGYSgrFDJnJLZCKBn1TNzQGFkY9TCprQbGqyhv4hDLXPkgi3IU62i5U1cVa20OaKR4syWFKiZByHF0vuUx3tZAeMQ40ZAyZCAnaZBJgPVtQDyRIo8KsRxN09V8OrtD2cESIuhkF18NZCZAzfFZCAK6fikTIcn1YjFefmgZBQ42xqVBkNS1K3BQ1AZCbQKZCtZCrCZCXtMI9zRd09dfMFwhOGKvnZC8"


const appId =220505862059842
const redirectUri ="https://webhook.site/#!/a2c26a54-fc01-4321-aae2-b0a60c6595db"
const clientSecret ="f5d840b4d2eb12493577476aec67604c"
 
  /*  async function getUserToken() {
    try {
        const url =`https://graph.facebook.com/v14.0/oauth/access_token?&client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`
        const response = await axios.get(url)
       
        return response.data.access_token
    } catch (error) {
        throw error
    }
 }
  getUserToken().then(token =>{
    console.log(token)
 }).catch(err =>{
    console.log(err.response)
 })  */


  async function getWaba(token){ // you can get multiple wabas related to the token
    axios.get('https://graph.facebook.com/v14.0/debug_token',{
        params:{
         input_token:token,
         access_token:"220505862059842|gqtcv0oAdC8Ei9jAtCu1ngiS4Ps"
    }}).then(res=>{
        console.log(res.data.data.granular_scopes)
    }) .catch((error) => {
        console.log(error.response);
      });
}
  //  getWaba(token) 
 



 //Get Phone Number ID
  function getPhoneId(wabaID,token){
    axios.get(`https://graph.facebook.com/v14.0/${wabaID}/phone_numbers`,{params:{
        access_token:token
    }}).then(res=>{
        console.log(res.data)
        res.data.data.forEach(element => {
            console.log(element.id, element.display_phone_number)
          });
    }) .catch((error) => {
        console.log(error.message);
      });
}
   // getPhoneId(wabaID,token) 



//Get List of Shared WABAs The client_whatsapp_business_accounts endpoint retrieves
// a list of all the WhatsApp business accounts assigned to/shared with
// your Business Manager account once the embedded signup flow is completed.
function getSharedWabas(businessId,systemUserToken){
    axios.get(`https://graph.facebook.com/v14.0/${businessId}/client_whatsapp_business_accounts`,{params:{
        access_token:systemUserToken
    }}).then(res=>{
        console.log(res.data.data)
    }) .catch((error) => {
        console.log(error.response);
      });
}
// getSharedWabas(businessId,systemUserToken)




// send message
function postMessage(phoneID,token){
     axios({
        method: 'POST',
        url: `https://graph.facebook.com/v14.0/${phoneID}/messages`,
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: {
            "messaging_product": "whatsapp", "to":"905394955472",
            "type":"template","template":{"name":"Hello_world",
            "language":{"code":"en_US"}
             }
        }
     }).then(res =>{
        console.log(res.data)
     }).catch(err =>{
        console.log(err.response)
     })
}
 // postMessage(phoneID,token)



// reply message
function replyMessage(phoneId,token){
    axios({
        method: 'GET',
        url: 'https://graph.facebook.com/v14.0/FROM_PHONE_NUMBER_ID/messages',
        headers:{
            'Authorization':'Bearer ACCESS_TOKEN',
            'Content-Type': 'application/json'
        },
        data: {
            messaging_product:"whatsapp",
            to:905394955472,
            text:{
                body:"Hello_world"
            }
        }
     }).then(res =>{
        console.log(res.data)
     }).catch(err =>{
        console.log(err.response)
     })
}
replyMessage(phoneID,token)


// Get List of Owned WhatsApp Business Accounts (list of waba our business owns)
function getOwnedWabas(systemUserToken,businessId){
    axios.get(`https://graph.facebook.com/v14.0/${businessId}/owned_whatsapp_business_accounts`,{params:{
        access_token: systemUserToken
    }}).then(res=>{
        console.log(res.data.data)
    }) .catch((error) => {
        console.log(error.response);
      });
}
 // getOwnedWabas(systemUserToken,businessId)



// get single waba info
  function getWabainfo(token,wabaID){
    axios.get(`https://graph.facebook.com/v14.0/${wabaID}`,{params:{
        access_token: token
    }}).then(res=>{
        console.log(res.data)
    }) .catch((error) => {
        console.log(error.response);
      });
}
  // getWabainfo(token,wabaID) 


 
// GET A SINGLE PHONE NUMBER
  function getAPhoneNum(token,phoneId){
    axios.get(`https://graph.facebook.com/v14.0/${phoneId}`,{params:{
        access_token:token
    }}).then(res=>{
        console.log(res.data)
    }) .catch((error) => {
        console.log(error.response);
      });
}
 // getAPhoneNum(token,phoneID) 

 