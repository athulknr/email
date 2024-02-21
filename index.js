const express=require('express');
const app = express();
const port= process.env.PORT || 3000;

//create a middleware for the parssing requested bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//define the server that the static files are storerd inside the public
app.use(express.static('public'));

//defining the route for the home page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/send-email.html');
});

//configure node mailer
const  nodemailer=require('nodemailer');
const transporter= nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'athulk666@gmail.com',
        pass:'hhhm xgbx apiu alcz'
    }
});
//create the routefor the form
app.post('/send-email',(req,res)=>{
    const{to,subject,text}=req.body;
    const mailOptions={
        to,
        subject
    
    };
    
transporter.sendMail(mailOptions,(error,infor)=>{
    if(error){
        console.error(error);
        res.status(500).send('error in sending mail');
    } else{
        console.log('email sent:'+ infor.response);
        res.send('email sent successfully');
    }
});
});

//start the server with port
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});