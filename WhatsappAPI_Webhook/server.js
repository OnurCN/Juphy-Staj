import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const app = express().use(bodyParser.json())
const userToken = "EAAKYgBJbZBMoBANlgMw6YkBE1U7JLTXCM0ceZCIIr3WmKN1H1e8cbAZAbBEiSf3wo7ChUy28n4gr5Q36hbAdtxMCXAf8lHd5PX1In1Igtpmi40xeqJuGQ0AFZBj3w2XMKHu3bNteaUojp4asgUT3X7RlZBTbGEFCevliUx8GMRVp2000I2OZBRadEtEokXs8eqKOYBwqcEgwJ1vbuMdPsZB"

app.listen(process.env.PORT || 5000, (req,res)=>{
    console.log('listening to 5000')

})
app.get("/",(req,res)=>{
    res.status(200).send('Its Working')
})

app.get("/webhook",(req,res)=>{
    let mode=req.query["hub.mode"];
    let challange=req.query["hub.challenge"];
    let token=req.query["hub.verify_token"];
 
 
     if(mode && token){
 
         if(mode==="subscribe" && token==='Onur'){
             res.status(200).send(challange);
         }else{
             res.status(403);
         }
 
     }
 
 });


app.post("/webhook",(req,res)=>{ 

    console.log(JSON.stringify(req.body,null,2));

    if(req.body.object){
        if(req.body.entry && 
            req.body.entry[0].changes && 
            req.body.entry[0].changes[0].value.messages && 
            req.body.entry[0].changes[0].value.messages[0]  
            ){
               let phoneID = req.body.entry[0].changes[0].value.metadata.phone_number_id;
               let from = req.body.entry[0].changes[0].value.messages[0].from; 
               let msgContent = req.body.entry[0].changes[0].value.messages[0].text.body;

               console.log(`phone number ${phoneID}`);
               console.log(`from ${from}`);
               console.log(`message ${msgContent}`);

               
                axios({
                    method:'POST',
                    url:`https://graph.facebook.com/v14.0/${phoneID}/messages`,
                    headers:{
                        'Authorization':`Bearer ${userToken}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        messaging_product:"whatsapp",
                        to:from,
                        text:{
                            body:"IT WORKED!!!"
                        }
                    }
                 }).then(res=>{
                    console.log(res.data)
                 }).catch(err=>{
                    console.log(err.response)
                 })
    
               res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }
    }
});