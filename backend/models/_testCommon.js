const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testBouquetIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM bouquets");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM users");


  const bouquet1 = await db.query(`
  INSERT INTO bouquets (name, price, currency, description,image)
  VALUES ('bouquet1,100,'USD','bouquet1.jpeg) RETURNING id`);

  const bouquet2 = await db.query(`
  INSERT INTO bouquets (name, price, currency, description,image)
  VALUES ('bouquet2,300,'USD','bouquet2.jpeg) RETURNING id`);

  testBouquetIds.push(bouquet1.rows[0].id,bouquet2.rows[0].id);

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);

  await db.query(`
        INSERT INTO transactions (user_id, bouquet_id,quantity,total_price)
        VALUES ('u1', $1,2,200),
        ('u1',$2,1,100)`,
      [testJobIds]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
};