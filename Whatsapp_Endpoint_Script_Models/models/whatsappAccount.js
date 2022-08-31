import axios from 'axios'
import _ from 'lodash'
import Whatsapp from '../config.js'
const instance = axios.create({
    baseURL: 'https://graph.facebook.com/v14.0',
    timeout: 1000,
    headers: {
        'Authorization':`Bearer EAADIjIWUN0IBAEiQf0X5q36ztFQXtrsTinGYSgrFDJnJLZCKBn1TNzQGFkY9TCprQbGqyhv4hDLXPkgi3IU62i5U1cVa20OaKR4syWFKiZByHF0vuUx3tZAeMQ40ZAyZCAnaZBJgPVtQDyRIo8KsRxN09V8OrtD2cESIuhkF18NZCZAzfFZCAK6fikTIcn1YjFefmgZBQ42xqVBkNS1K3BQ1AZCbQKZCtZCrCZCXtMI9zRd09dfMFwhOGKvnZC8`,
        'Content-Type': 'application/json'
    }
  });

class WhatsappAccount {
    constructor(wabaID){
        this.wabaID = wabaID
    }
     async getPhoneIDs(){
        try {// _.map(wabaIDList, wabaId => instance.get(`/${wabaID}/phone_numbers`) )
            let phoneIDs = await Promise.all(_.map(this.wabaID, async function (wabaID) {
                let phoneLists = await instance.get(`/${wabaID}/phone_numbers`)
               	 let filter =_.chain(phoneLists).get('data.data').map('id').value()
                 return filter
              }))
        
              return phoneIDs

        } catch (error) {
            console.log(error.response)
        }  
     }
}
 
export default WhatsappAccount
