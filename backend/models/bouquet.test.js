"use strict";

const {NotFoundError,BadRequestError} = require("../expressError");
const db = require("../db");
const Bouquets = require("./bouquets");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testBouquetIds
}=require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



/************************create */
describe("create", function(){
    let newBouquet = {
        name:"flower",
        price:50,
        currency:'USD',
        image:'test.jpeg',
    };

    test("works",async function(){
        let bouquet = await Bouquets.create(newBouquet);
        expect(bouquet).toEqual({...newBouquet, id:expect.any(Number)});
       
    });

});
/******************findAll */
describe("findAll",function (){
    test("work: no filter", async function (){
        let bouquets = await Bouquets.findAll();
        expect(bouquets.length).toEqual(2);
    })
})