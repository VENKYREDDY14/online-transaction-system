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
            const result = await db.run(sqlQuery, [gmail, username, number, hashedPassword, otp]);
            
            const userId = result.lastID;

            const balanceQuery = `INSERT INTO balance (user_id, balance) VALUES (?, ?)`;
            await db.run(balanceQuery, [userId, 0]);

            response.status(200).send({ message: "OTP sent, user details saved, and balance initialized." });
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
        response.status(200).send({ jwtToken,role:dbUser.ROLE,id:dbUser.ID,gmail:dbUser.GMAIL,user:dbUser.USERNAME});
      } else {
        response.status(400).send("Invalid Password");
      }
    }}
    catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
  });

  app.post('/balance', async (req, res) => {
    try {
      const { id,password } = req.body;
      const Id=parseInt(id);
      const selectUserQuery = `SELECT * FROM users WHERE id = ?`;
      const dbUser=await db.get(selectUserQuery,[Id]);
      const isPasswordMatched = await bcrypt.compare(password, dbUser.PASSWORD);
      
      if(isPasswordMatched){
        const sqlQuery = `SELECT * FROM balance WHERE USER_ID = ?`;
        const userBalance = await db.get(sqlQuery, [Id]);
        res.send({ userBalance});
      }
      else{
        res.status(400).send("Table doesn't exists");
      }  
    
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching balance.");
    }
  });
  
  app.get('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const Id = parseInt(id);
  
    const sqlQuery = `
      SELECT *
      FROM users 
      WHERE users.ID = ?
    `;
  
    try {
      const response = await db.get(sqlQuery, [Id]);
      if (response) {
        res.send(response);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database query failed" });
    }
  });
  
  app.put('/reset-number', async (req, res) => {
    const { gmail, number } = req.body;
    const sqlQuery = `UPDATE users SET PHONE = ? WHERE gmail = ?`; 

    const result=await db.run(sqlQuery, [number, gmail] );
    if(result.changes===1){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(400);
    }
});

app.post('/deposit', async (req, res) => {
    const { senderGmail, role, rgmail, amount, note, password } = req.body;
    
    if (senderGmail === rgmail) {
        return res.status(400).send("Cannot deposit to sender's own account.");
    }
    
    try {
        const selectUserQuery = `SELECT * FROM users WHERE GMAIL = ?`;
        const dbUser = await db.get(selectUserQuery, [senderGmail]);
        
        if (!dbUser) {
            return res.status(404).send("Sender not found");
        }
        
        const isPasswordMatched = await bcrypt.compare(password, dbUser.PASSWORD);
        if (!isPasswordMatched) {
            return res.status(400).send("Invalid Password");
        }
        
        const recipientUserQuery = `SELECT * FROM users WHERE GMAIL = ?`;
        const recipientUser = await db.get(recipientUserQuery, [rgmail]);
        
        if (!recipientUser) {
            return res.status(404).send("Recipient not found");
        }
        
        const userBalanceQuery = `SELECT * FROM balance WHERE USER_ID = ?`;
        const userBalanceDetails = await db.get(userBalanceQuery, [recipientUser.ID]);
        
        const updatedBalance = parseInt(userBalanceDetails.BALANCE) + parseInt(amount);
        const updateBalanceQuery = `UPDATE balance SET BALANCE = ? WHERE USER_ID = ?`;
        await db.run(updateBalanceQuery, [updatedBalance, recipientUser.ID]);
        const currentDate = new Date();
        const offsetDate = new Date(currentDate.getTime() + (5.5 * 60 * 60 * 1000));
        const status="Completed";
        const transferQuery = `INSERT INTO transfer (DATE,SENDER_MAIL, R_MAIL, AMOUNT,STATUS,NOTE) VALUES (?, ?, ?, ?,?,?)`;
        await db.run(transferQuery, [offsetDate,senderGmail, rgmail, amount,status,note]);
        
        res.status(200).send("Transfer successful");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/transfer', async (req, res) => {
    const { senderMail, recipientMail, amount, note, password } = req.body;
    if (senderMail === recipientMail) {
        return res.status(400).json({ error: "Cannot deposit to sender's own account." });
    }
    if (amount <= 0) {
        return res.status(400).json({ error: "Transfer amount must be positive." });
    }
    try {
        const selectUserQuery = `SELECT * FROM users WHERE GMAIL = ?`;
        const dbUser = await db.get(selectUserQuery, [senderMail]);

        if (!dbUser) {
            return res.status(404).json({ error: "Sender not found" });
        }
        const isPasswordMatched = await bcrypt.compare(password, dbUser.PASSWORD);
        if (!isPasswordMatched) {
            return res.status(400).json({ error: "Invalid Password" });
        }
        const recipientUserQuery = `SELECT * FROM users WHERE GMAIL = ?`;
        const recipientUser = await db.get(recipientUserQuery, [recipientMail]);

        if (!recipientUser) {
            return res.status(404).json({ error: "Recipient not found" });
        }

        const senderBalanceQuery = `SELECT * FROM balance WHERE USER_ID = ?`;
        const senderBalanceDetails = await db.get(senderBalanceQuery, [dbUser.ID]);

        if (parseInt(senderBalanceDetails.BALANCE) < parseInt(amount)) {
            return res.status(400).json({ error: "Insufficient funds" });
        }

        const removeBalance = parseInt(senderBalanceDetails.BALANCE) - parseInt(amount);
        const removeBalanceQuery = `UPDATE balance SET BALANCE = ? WHERE USER_ID = ?`;
        await db.run(removeBalanceQuery, [removeBalance, dbUser.ID]);

        const userBalanceQuery = `SELECT * FROM balance WHERE USER_ID = ?`;
        const userBalanceDetails = await db.get(userBalanceQuery, [recipientUser.ID]);
        const updatedBalance = parseInt(userBalanceDetails.BALANCE) + parseInt(amount);
        const updateBalanceQuery = `UPDATE balance SET BALANCE = ? WHERE USER_ID = ?`;
        await db.run(updateBalanceQuery, [updatedBalance, recipientUser.ID]);

        const currentDate = new Date();
        const status = "Completed";
        const transferQuery = `INSERT INTO transfer (DATE, SENDER_MAIL, R_MAIL, AMOUNT, STATUS, NOTE) VALUES (?, ?, ?, ?, ?, ?)`;
        await db.run(transferQuery, [currentDate, senderMail, recipientMail, amount, status, note]);

        res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/history/debit/:userMail',async(req,res)=>{
    const {userMail}=req.params;
    try{
        const sqlQuery=`SELECT * FROM transfer WHERE SENDER_MAIL= ?`;
        const response=await db.all(sqlQuery,[userMail]);
        res.send(response);
    }catch(e){
        res.status(500).json({ error: "Internal Server Error" });
    }
})
app.get('/history/credit/:userMail',async(req,res)=>{
    const {userMail}=req.params;
    try{
        const sqlQuery=`SELECT * FROM transfer WHERE R_MAIL= ?`;
        const response=await db.all(sqlQuery,[userMail]);
        res.send(response);
    }catch(e){
        res.status(500).json({ error: "Internal Server Error" });
    }
})