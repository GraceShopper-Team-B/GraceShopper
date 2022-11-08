"use strict";
// Change to this file!

const {
  db,
  models: { User, Product },
} = require("../server/db");

const products = [
  {
    name: "Ilana's Banana Muffins",
    type: "muffin",
    price: 5.0,
    description: "Banana, walnut, chocolate chip muffins.",
  },
  {
    name: "Naomi's Peanut Butter Cookies",
    type: "cookie",
    price: 3.0,
    description: "Tasty peanut butter cookie.",
  },
  {
    name: "Esther's Apple Pie",
    type: "pie",
    price: 30.0,
    description: "Reasonable priced pie.",
  },
  // {
  //   name: "Ilana's Mu"
  //   type:
  //   price:
  //   description:

  // },
  // {
  //   name: "Ilana's Muffins"
  //   type:
  //   price:
  //   description:

  // },
  // {
  //   name: "Ilana's Muffins"
  //   type:
  //   price:
  //   description:

  // }
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const product = await Promise.all(
    products.map((product) => {
      return Product.create(product);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
