const jsonschema = require("jsonschema");

const express= require("express");
const router = express.Router();
const Bouquets = require("../models/bouquets");
const {BadRequestError} = require("../expressError");
const {ensureAdmin,ensureCorrectUserOrAdmin,ensureLoggedIn}= require("../middleware/auth");

const bouquetNewSchema = require("../schemas/bouqbouetNew.json");
const bouquetUpdate = require("../schemas/bouqouetUpdate.json");
const bouquetSearch = require("../schemas/bouquetSearch.json");



// const router= Router();

//get all bouquets route
router.get("/",async (req,res)=>{
    const q = req.query;
    // console.log('Recieved search term',q);

    try{
        const validator = jsonschema.validate(q,bouquetSearch)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
              
        }
        const bouquets= await Bouquets.findAll(q);
        return res.json({bouquets})
    }catch(e){
        return next(e);
    }
    
})
//post route (will add admin middleware secure later)
router.post("/", ensureAdmin,async function(req,res,next){
    try {
        const validator = jsonschema.validate(req.body, bouquetNewSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs);
        }
        const data = req.body;
        const newBouquet= await Bouquets.create(data)
        return res.status(201).json(newBouquet)
    }catch(e){
        return next(e);
    }
  
    })

// get id route. 
router.get("/:id",async function(req,res,next){
    const {id} = req.params;
    try{
        let bouquet = await Bouquets.getById(id)
        return res.json({bouquet});
    }catch(e){
        next(e)
    }

} )

//update route , require admin middleware authorization:admin
router.patch("/:id",ensureAdmin,async function(req,res,next){

   const {id}=(req.params);
   const data= req.body
//    let query = await db.query(`UPDATE bouquets SET name=$1,price=$2,currency=$3,description=$4,image=$5`,
//    [name,price,currency,description,image]);
//    return res.status(200).send(`UPDATE info`)
    try{
        const validator= jsonschema.validate(data,bouquetUpdate);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const bouquet = await Bouquets.update(id,data)
        return res.json({bouquet})
    }catch(e){
        next(e)
    }

})
//delete route admin middleware is required for this router
router.delete("/:id",ensureAdmin,async function(req,res,next){
    const {id}=req.params;

    try{
        await Bouquets.remove(id);
        return res.json({delete: +id})
        
        
    }catch(e){
        return next(e)
    }
})


module.exports=router;