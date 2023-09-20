"use strict";

const db = require("../db");
const ExpressError = require("../expressError");
const {sqlForPartialUpdate} = require("../helper/sql")

class Bouquets {
    static async findAll(){
        let result = await db.query(`SELECT * FROM bouquets`);

        return result.rows;
    }

    static async create(data){
        const result= await db.query(`INSERT INTO bouquets (name,
            price,currency, description,image) 
            VALUES ($1,$2,$3,$4,$5) RETURNING id,name,price,currency,description,image`,
            [data.name,data.price,data.currency,data.image,data.description]);
            return result.rows[0];

    }
    static async getById(id){
        let result = await db.query(`SELECT * FROM bouquets WHERE id=$1`,[id]);
        const bouquet= result.rows[0];
        if(!bouquet) throw new ExpressError(`No Found bouquets:${id}`);
        return bouquet;
    }
    static async update(id,data){
        const {name,price,currency,description,image}=data
        // let query = await db.query(`
        // UPDATE bouquets SET name=$1,price=$2,currency=$3,description=$4,image=$5 
        // WHERE id=$6 
        // RETURNING id,name,price,currency,description,image`,
        // [name,price,currency,description,image,id]);
        // // let bouquets = query.rows;
        // if(query.rows.length===0){
        //     throw new ExpressError(`Cant Found`,404)
        // }
        // return query.rows[0]
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {});
        const idVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE bouquets 
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id, 
                                    name, 
                                    price, 
                                    currency,
                                    description
                                    image`;
        const result = await db.query(querySql, [...values, id]);
        const bouquet = result.rows[0];
    
        if (!bouquet) throw new NotFoundError(`No bouquet: ${id}`);
    
        return bouquet;

    }
    static async remove(id){
        let result = await db.query(`DELETE FROM bouquets WHERE id=$1 RETURNING id`,[id])
        if(result.rows.length ===0){
            throw new ExpressError(`No bouquets:${id}`);
        }
    }
}

module.exports =Bouquets;