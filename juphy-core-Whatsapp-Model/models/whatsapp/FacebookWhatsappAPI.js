const _ = require('lodash')
const Axios = require('axios')

class FacebookWhatsappAPI
{
    constructor({ baseURL, headers })
    {
        this.__proto__.getCredentials = () => ({ baseURL, headers })
        this.api = Axios.create({ baseURL, headers })
    }

    static from({ baseURL, headers })
    {
        const facebookWhatsappAPI = new FacebookWhatsappAPI({ baseURL, headers })

        return facebookWhatsappAPI
    }

      async getTokenData(url)
    {
        try
        {
            const response = await Axios.get(url)

            return response
        }
        catch (error)
        {
            throw error
        }
    }

    async debugToken(token)
    {
        try
        {
            const response = await this.api.get('/debug_token',{params:{
                input_token:token,
                access_token:"220505862059842|gqtcv0oAdC8Ei9jAtCu1ngiS4Ps"
               }})

               return response
        }
        catch (error)
        {
            throw error
        }
    } 

    async getPhoneData(wabaID)
    {
        try
        {
            const response = await this.api.get(`/${wabaID}/phone_numbers`)

            return response
        }
        catch (error)
        {
            throw error
        }
    }
}

module.exports = FacebookWhatsappAPI