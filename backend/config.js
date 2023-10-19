if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
const DB_URI=(process.env.NODE_ENV === 'test') 
? "postgresql:///flowers_test" 
: "postgres://mevgpwau:a9GKX7Lm6QbqMzcSA4MTKAijSR1sYiac@mahmud.db.elephantsql.com/mevgpwau";

const SECRET_KEY= process.env.SECRET_KEY || "secret";
const STRIPE_SECRET_KEY=process.env.STRIPE_SECRET_KEY;

const BCRYPT_WORK_FACTOR =12;

module.exports ={
    DB_URI,SECRET_KEY,BCRYPT_WORK_FACTOR, STRIPE_SECRET_KEY
}
