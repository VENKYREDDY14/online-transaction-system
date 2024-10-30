const express=require('express');
const path=require('path');
const app=express();
const sqlite3=require('sqlite3');
const {open}=require('sqlite');
const cors=require('cors');
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());
let db=null;
const initializeDBAndServer=async()=>{
    try{
        db=await open({
            filename:path.join(__dirname,'transaction.db'),
            driver:sqlite3.Database,
        })
        app.listen(3001,()=>{
            console.log('Server started at https://localhost/3001/')
        })
    }
    catch(error){
        console.log(`DB Error:${error.message}`)
        process.exit(1)
    }
}
initializeDBAndServer()
const generateOtp=()=>{
    return Math.floor(10000+Math.random()*900000);
}
const sendOtpEmail=async(email,otp,name)=>{
    const transporter=nodemailer.createTransport({service:"Gmail",
        auth:{
            user:'venkyreddy2031@gmail.com',
            pass:'xlrl lhxl xusg pkxz'
        }
    });
    const mailOptions={
        from:'venkyreddy2031@gmail.com',
        to:email,
        subject:"Your OTP code",
        text:`Hi ${name} ! ! Greetings from the online banking,here is your otp code is:${otp}`
    };
    await transporter.sendMail(mailOptions);
}


app.post("/users/", async (request, response) => {
    const { username, number, gmail, password } = request.body; 
    const selectUserQuery = `SELECT * FROM users WHERE GMAIL = ?`;

    try {
        const dbUser = await db.get(selectUserQuery, [gmail]);
        const hashedPassword = await bcrypt.hash(password, 10); 

        if (dbUser === undefined) {
            const otp = generateOtp();
            await sendOtpEmail(gmail, otp, username);

            const sqlQuery = `INSERT INTO users (GMAIL, USERNAME, PHONE, PASSWORD, OTP) VALUES (?, ?, ?, ?, ?)`;
            await db.run(sqlQuery, [gmail, username, number, hashedPassword, otp]);

            response.status(200).send({ message: "OTP sent and user details saved successfully." });
        } else {
            response.status(400).send({ message: "User already exists" });
        }
    } catch (e) {
        console.error(`Error: ${e.message}`);
        response.status(500).send({ error: "Failed to send OTP or save user details." });
    }
});





app.post('/validate',async (req,res)=>{
    const {otp,gmail}=req.body;
    const sqlQuery=`SELECT OTP FROM users WHERE GMAIL='${gmail}'`;
    const result=await db.get(sqlQuery);
    if(result.OTP===parseInt(otp)){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(401);
    }
})


app.delete("/users/:gmail", async (request, response) => {
    const { gmail } = request.params;
    const deleteUserQuery = `DELETE FROM users WHERE GMAIL = ?`;

    try {
        await db.run(deleteUserQuery, [gmail]);
        response.status(200).send({ message: "User details removed due to invalid OTP." });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        response.status(500).send({ error: "Failed to remove user details." });
    }
})

app.put('/resetotp', async (req, res) => {
    try {
        const { gmail } = req.body;
        const selectUserQuery = `SELECT * FROM users WHERE gmail = ?`;
        const dbUser = await db.get(selectUserQuery, [gmail]);

        if (dbUser) {
            const otp = generateOtp();
            await sendOtpEmail(gmail, otp);

            const sqlQuery = `UPDATE users SET OTP = ? WHERE gmail = ?`;
            await db.run(sqlQuery, [otp, gmail]);

            res.status(200).send({ message: "OTP sent." });
        } else {
            res.status(400).send({ error: "User not found." });
        }
    } catch (e) {
        console.error(`Error: ${e.message}`);
        res.status(500).send({ error: "Failed to send OTP." });
    }
});

app.post('/verify-reset-otp',async (req,res)=>{
    const {otp,gmail}=req.body;
    const sqlQuery=`SELECT OTP from users WHERE GMAIL=?`;
    const dbOtp=await db.get(sqlQuery,[gmail]);
    if(dbOtp.OTP===parseInt(otp)){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(401);
    }
})

app.put('/reset-password', async (req, res) => {
    const { gmail, password } = req.body;
    const sqlQuery = `UPDATE users SET password = ? WHERE gmail = ?`;
    const hashedPassword=await bcrypt.hash(password, 10); 

    const result=await db.run(sqlQuery, [hashedPassword, gmail] );
    if(result.changes===1){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(400);
    }
});

app.post("/login", async (request, response) => {
    const { gmail, password } = request.body;
    const selectUserQuery = `SELECT * FROM users WHERE GMAIL = ?`;
    try{
    const dbUser = await db.get(selectUserQuery,[gmail]);
    if (dbUser === undefined) {
      response.status(400).send("Invalid Gmail");
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.PASSWORD);
      if (isPasswordMatched === true) {
        const payload = {
          GMAIL: gmail,
        };
        const jwtToken = jwt.sign(payload, '1');
        response.status(200).send({ jwtToken });
      } else {
        response.status(400).send("Invalid Password");
      }
    }}
    catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
  });