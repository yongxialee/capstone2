
const express = require('express');
const jsonschema = require("jsonschema");
const {BadrequestError} = require('../expressError');
const User = require('../models/user');

const{createToken} = require('../helper/tokens');

const {ensureLoggedIn,
    ensureAdmin,
    ensureCorrectUserOrAdmin,}= require("../middleware/auth")

const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();




/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

router.post('/',ensureAdmin,async function (req,res,next){
    try{
        const validator = jsonschema.validate(req.body,userNewSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadrequestError(errs);
        }
        const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({user,token});
    }catch(e){
        return next(e);
    }
    
})

/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/
router.get("/",ensureAdmin,async function (req,res,next){
    try{
        const users= await User.findAll();
        return res.json({users});
    }catch(e){
        return next(e)
    }
});
/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin, jobs }
 *   where jobs is { id, title, companyHandle, companyName, state }
 *
 * Authorization required: admin or same user-as-:username
 **/

router.get("/:username",async function (req,res,next){
    try{
        const user = await User.get(req.params.username);
        return res.json({user});
    }catch(e){
        return next(e);
    }
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/
router.patch("/:username",async function (req,res,next){
    try{
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadrequestError(errs);
        }
    
        const user = await User.update(req.params.username,req.body);
        return res.json({user});
    }catch(e){
        return next(e);
    }
   
    
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/
router.delete("/:username",ensureCorrectUserOrAdmin, async function (req,res,next){
    try{
        await User.remove(req.params.username);
        return res.json({deleted: req.params.username})
    }catch(e){
        next(e)
    }
});
router.post("/:username/transactions",async (req,res,next)=>{
    const {username} = req.params;
    const {transactionData}= req.body;
   const data = JSON.stringify(transactionData)
    // console.log(req.body);
    // res.json(req.body)
    try{
        const transactions = await User.addTransactions(username,req.body);
        return res.status(201).json({transactions});
    }catch(e){
        return next(e);
    }
})
router.get("/:username/transactions", async function(req,res,next){
    try{
        const {username} = req.params;
        const transactions = await  User.getTransactions(username);
        return res.json({transactions});
    }catch(e){
        return next(e);
    }
})


module.exports=router;