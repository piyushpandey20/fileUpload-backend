const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})

//post middleware
fileSchema.post('save',async function(doc){
    try{
        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        })

        //send mail
        let info = await transporter.sendMail({
            from:`by Piyush`,
            to:doc.email,
            subject:"New File uploaded on cloudinary",
            html:`<h2>Hello Duniya</h2> <p>File uploaded</p>`
        })
    }
    catch(error){
        console.error(error);
    }
})

const File = mongoose.model("File",fileSchema);
module.exports = File;