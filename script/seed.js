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
    image:
      "https://natashaskitchen.com/wp-content/uploads/2019/04/Banana-Muffins-3.jpg",
    price: 5.0,
    description: "Banana, walnut, chocolate chip muffins.",
  },
  {
    name: "Naomi's Peanut Butter Cookies",
    type: "cookie",
    image:
      "https://www.allrecipes.com/thmb/9xkpSRmdg9dd4DhSr0K3L81SfeY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3534210-super-easy-peanut-butter-cookies-Trusted-Brands-4x3-1-919351fc3ccd480695003de8a3fd3730.jpg",
    price: 3.0,
    description: "Tasty peanut butter cookie.",
  },
  {
    name: "Esther's Apple Pie",
    type: "pie",
    image:
      "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Apple-Pie_EXPS_MRRA22_6086_E11_03_1b_v3.jpg",
    price: 30.0,
    description: "Reasonable priced pie.",
  },
  {
    name: "Elissa's Pumpkin Cream Cheese Muffins",
    type: "muffin",
    image:
      "https://www.the-girl-who-ate-everything.com/wp-content/uploads/2011/10/pumpklin-cream-cheese-muffins-3-1-733x1024.jpg",
    price: 5.0,
    description: "Tasty fall favorite.",
  },
  {
    name: "Lisa's Carrot Cake",
    type: "cake",
    image:
      "https://www.glorioustreats.com/wp-content/uploads/2014/05/best-carrot-cake-recipe-square.jpeg",
    price: 5.0,
    description: "Hoppingly delicious. Chef Hopper Specialty.",
  },
  {
    name: "Sean's Vanilla Cookie",
    type: "cookie",
    image:
      "https://food-fanatic-res.cloudinary.com/iu/s--O6rCQy7_--/t_xlarge_l/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1520987234/attachment/file-2-vanilla-cookies-with-vanilla-bean-glaze.jpg",
    price: 3.0,
    description: "Basically delicious.",
  },
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
    User.create({
      username: "cody",
      password: "123",
      firstName: "Cody",
      lastName: "Pug",
      email: "cody@gmail.com",
      phoneNumber: "123-123-1234",
    }),
    User.create({
      username: "murphy",
      password: "123",
      firstName: "Murphy",
      lastName: "Cat",
      email: "murphyy@gmail.com",
      phoneNumber: "123-123-1234",
    }),
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
