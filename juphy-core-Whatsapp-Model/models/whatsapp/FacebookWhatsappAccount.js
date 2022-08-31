import FacebookWhatsappAPI from './FacebookWhatsappAPI'
const FacebookWhatsappPhone = require('./FacebookWhatsappPhone')

const axios = require('axios')
const _ = require('lodash')
const WhatsappToken = require('./FacebookWhatsappToken')

class WhatsappAccount {
    constructor(account){
        Object.assign(this, account)
        
        WhatsappAccount.__proto__.getAPI = () => FacebookWhatsappAPI.from( axiosInstance )
    }

    async getPhoneNumbers(){
         try 
          {
             let phoneData = await this.getAPI().getPhoneData(this.account.waba_id)

             let phoneNumbers = _.chain(phoneData).get('data.data').map('id').value()

             return  _.chain(phoneNumbers).map( phone => new WhatsappPhone( phone ) ).value()

        } catch (error) {
            console.log(error.response)
        }  
     }
}
 
export default WhatsappAccount