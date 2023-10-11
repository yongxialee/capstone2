"use strict";

const db = require("../db");
const bcrypt= require('bcrypt');
const {sqlForPartialUpdate} = require('../helper/sql')
const {NotFoundError,
BadRequestError,
UnauthorizedError} = require("../expressError");

const {BCRYPT_WORK_FACTOR} = require('../config');

class User {
    /**authorized user with username and password */
    //return {username,first_name, last_name,email,is_admin}
    //throw unauthorizedError if wrong paswword
    static async authenticate(username,password){
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name as "firstName",
                    last_name as "lastName",
                    email,
                    is_admin as "isAdmin"
             FROM users
             WHERE username=$1    
            `,
            [username]);
            const user = result.rows[0];
            if(user){
                //compare hased password to incoming password from input
                const isValid = await bcrypt.compare(password,user.password);
                if(isValid===true){
                    delete user.password;
                    return user;
                }
            }
            throw new UnauthorizedError("Invalid username/password")

    }
    static async register(
        {username,password,firstName,lastName,email,isAdmin}){
            const duplicateCheck = await db.query(
                `SELECT username
                FROM users
                WHERE username=$1`,
                [username]
            );
            if(duplicateCheck.rows[0]){
                throw new BadRequestError(`Duplicate username:${username}`);
            }
            const hashedPassoword = await bcrypt.hash(password,BCRYPT_WORK_FACTOR);

            const result = await db.query(
                `INSERT INTO users
                (username,
                    password,
                    first_name,
                    last_name,
                    email,
                    is_admin) 
                    VALUES ($1,$2,$3,$4,$5,$6)
                    RETURNING username,first_name as "firstName",
                    last_name as "lastName",email, is_admin as "isAdmin"`,
                    [username,hashedPassoword,firstName,lastName,email,isAdmin]);
                    
            const user = result.rows[0];
            return user;
        }

        static async findAll(){
            const results = await db.query(
                `SELECT username,
                first_name as "firstName",
                last_name as "lastName",
                email,
                is_admin as "isAdmin"
                FROM users ORDER BY username`
            );
            return results.rows;
        }
       
        
        static async get(username){
            const result =await db.query(`
            SELECT username,
                first_name as "firstName",
                last_name as "lastName",
                email,
                is_admin as "isAdmin" 
                FROM users 
                WHERE username=$1`,
                [username]);

             const user =result.rows[0];
             if(!user) throw new NotFoundError(`NO user:${username}`)
             return user;   
        }
        static async update(username,data){
            if(data.password){
                data.password= await bcrypt.hash(data.password,BCRYPT_WORK_FACTOR);
                               
            }
            const {setCols,values} = sqlForPartialUpdate(
                data,{
                    firstName:"first_name",
                    lastName:"last_name",
                    isAdmin:"is_admin"
                 })
            const usernameVarIdx = "$" + (values.length + 1);

            const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                is_admin AS "isAdmin"`;
            const result = await db.query(querySql, [...values, username]);
            const user = result.rows[0];

            if (!user) throw new NotFoundError(`No user: ${username}`);

                delete user.password;
            return user;
        }

        static async remove(username){
            const result = await db.query(
                `DELETE FROM users
                WHERE username =$1
                RETURNING username`, [username]
            );
            const user = result.rows[0];
            if(!user) throw new NotFoundError(`No user:${username}`)
        }
        static async addTransactions(username,transactionData){
            const {productId,quantity,totalPrice} = transactionData;
            const result = await db.query(`INSERT INTO transactions (user_id,bouquet_id,quantity,total_pirce)
            VALUES ($1,$2,$3,$4)
            RETURNING transactions_id,bouquet_id,quantity,total_price`,
            [username,productId,quantity,totalPrice]);

            return result.rows[0];
        }
        static async getTransactions(username){
            const result = await db.query(
                `SELECT t.transactions_id AS "transactionId",
              t.user_id AS "userId",
              t.bouquet_id AS "bouquetId",
              t.quantity,
              t.total_price AS "totalPrice",
              b.id,
              b.name,
              b.price,
              b.currency,
              b.description,
              b.image
                FROM transactions AS t
                JOIN bouquets AS b ON t.bouquet_id = b.id
                JOIN users AS u ON t.user_id = u.username
                WHERE u.username = $1`,
                [username]
            );
            return result.rows;
        }

   
}

module.exports =User;