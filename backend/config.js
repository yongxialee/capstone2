if(process.env.NODE_ENV!=='producttion'){
    require('dotenv').config()
}
const DB_URI=(process.env.NODE_ENV === 'test') 
? "postgresql:///flowers_test" 
: "postgresql:///flowers";

const SECRET_KEY= process.env.SECRET_KEY || "secret";
const STRIPE_SECRET_KEY=process.env.STRIPE_SECRET_KEY;

const BCRYPT_WORK_FACTOR =12;

module.exports ={
    DB_URI,SECRET_KEY,BCRYPT_WORK_FACTOR, STRIPE_SECRET_KEY
}