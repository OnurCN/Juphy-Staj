import _ from "lodash"

class WhatsappToken {
    static async getToken(){
        const code ="AQDLFQ6MjorWBjRfRhOUlTvpX80qhsAv6vNhi4fZBEduTgFb3AHyVFFir1xUzbgoqcQAkq1rmCr0vkTHq3gvcHW1DiXV1OiNxI18hckbEl-CSSHVFrFMJY-_zg4LXbMdGzhrR3WQtbGNRLJOQiAkxHvF8kzW2it8dqt8e23nEolkD737vfeHL7m0TePZ8tZTkhZXYusy707lUAa2pweAk2-gojGFiiOPSyrPU10meakZoszh6Lm_ATYlTqD8vbvnCzGMBhxpqZ6OfwugKmoXBU_tFVNu7q1jhLbg8ni-PoOFkqahyV5F8ei9D3covvOUcjhnZjo1MxjMK_Nx0BCmrBhPC0Ysk7lNn56NfUYvA7MYmF7CcGAa44Z7RRTj1l1JSCVBCuuZZekcbdzY3nQihf"
        
        const url =`https://graph.facebook.com/v14.0/oauth/access_token?&client_id=${Whatsapp.appId}&redirect_uri=${Whatsapp.redirectUri}&client_secret=${Whatsapp.clientSecret}&code=${code}`

        try {
            let tokenBody = await axios.get(url)
            return tokenBody.data.access_token
        } catch (error) {
            console.log(error.response)
        }
    }
   
    static async tokenDebug(token, accessToken){
        try {
            let wabas = await instance.get('/debug_token',{params:{
                input_token:token,
                access_token:"220505862059842|gqtcv0oAdC8Ei9jAtCu1ngiS4Ps"
               }})
                 let wabaIDs= _.chain(wabas).get('data.data.granular_scopes').defaultTo([]).find({scope:'whatsapp_business_messaging'}).get('target_ids').defaultTo([]).value()
                 _.map(wabaIDs,(wabaID)=>{
                    
                 })
                 return wabaIDs
        } catch (error) {
            console.log(error.response)
        }
       
    }
}

export default WhatsappToken