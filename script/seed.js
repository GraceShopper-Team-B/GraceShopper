"use strict";
// Change to this file!

const {
  db,
  models: { User, Product, Order },
} = require("../server/db");

const products = [
  //Cakes
  {
    name: "Ilana's Banana Muffins",
    type: "muffin",
    image:
      "https://natashaskitchen.com/wp-content/uploads/2019/04/Banana-Muffins-3.jpg",
    price: 5.0,
    description: "Banana, walnut, chocolate chip muffins.",

    name: "Dahlia's Vanilla Cake",
    type: "cake",
    image:
      "https://sugargeekshow.com/wp-content/uploads/2022/02/easy_vanilla_FEATURED.jpg",
    price: 25.0,
    description: "Sweet and delicious cake with fluffy white icing.",
    quantity: 100,
  },
  {
    name: " Grim’s Chocolate Cake",
    type: "cake",
    image: "https://static.toiimg.com/thumb/53096885.cms?width=1200&height=900",
    price: 25.0,
    description: "Sneaky good chocolate cake.",
    quantity: 100,
  },
  {
    name: " Siyun’s Funfetti Cake",
    type: "cake",
    image:
      "https://www.billyparisi.com/wp-content/uploads/2022/07/funfetti-cake-featured.jpg",
    price: 25.0,
    description: "Fun, flavorful and fluffy cake.",
    quantity: 100,
  },
  {
    name: "Lisa's Carrot Cake",
    type: "cake",
    image:
      "https://www.glorioustreats.com/wp-content/uploads/2014/05/best-carrot-cake-recipe-square.jpeg",
    price: 25.0,
    description: "Hoppingly delicious. Chef Hopper Specialty.",
    quantity: 100,
  },
  {
    name: " Irais’ Red Velvet Cake",
    type: "cake",
    image:
      "https://sallysbakingaddiction.com/wp-content/uploads/2019/02/red-velvet-cake-slice-2.jpg",
    price: 25.0,
    description: "Royally rich treat.",
    quantity: 100,
  },
  {
    name: " Nadia’s Coffee Cake",
    type: "cake",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACJWlj8hnV5iMPy84C-_TlksPOcQSvFLdLA&usqp=CAU",
    price: 25.0,
    description: "Tasty cake that will up your positivity.",
    quantity: 100,
  },
  {
    name: "Maya’s Cheesecake",
    type: "cake",
    image:
      "https://sugarspunrun.com/wp-content/uploads/2019/01/Best-Cheesecake-Recipe-2-1-of-1-4-500x500.jpg",
    price: 25.0,
    description: "New menu item. Feels right where it's supposed to be.",
    quantity: 100,
  },
  //Cookies
  {
    name: "Sean's Vanilla Cookies",
    type: "cookie",
    image:
      "https://food-fanatic-res.cloudinary.com/iu/s--O6rCQy7_--/t_xlarge_l/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1520987234/attachment/file-2-vanilla-cookies-with-vanilla-bean-glaze.jpg",
    price: 3.0,
    description: "Basically delicious.",
    quantity: 100,
  },
  {
    name: "Kate’s Chocolate Cookies",
    type: "cookie",
    image:
      "https://simplyhomecooked.com/wp-content/uploads/2021/06/double-chocolate-cookies.jpg",
    price: 3.0,
    description: "Rich and chocolaty. Worth taking the time to indulge.",
    quantity: 100,
  },
  {
    name: "Delilah’s Funfetti Cookies",
    type: "cookie",
    image:
      "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/Soft-Baked-Funfetti-Sugar-Cookies-12.jpg",
    price: 3.0,
    description: "Fun, tasty, an all around favorite.",
    quantity: 100,
  },
  {
    name: "Naomi's Peanut Butter Cookies",
    type: "cookie",
    image:
      "https://www.allrecipes.com/thmb/9xkpSRmdg9dd4DhSr0K3L81SfeY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3534210-super-easy-peanut-butter-cookies-Trusted-Brands-4x3-1-919351fc3ccd480695003de8a3fd3730.jpg",
    price: 3.0,
    description: "Tasty peanut butter cookie.",
    quantity: 100,
  },
  {
    name: "Hamsa’s Snickerdoodle Cookies",
    type: "cookie",
    image:
      "https://1.bp.blogspot.com/-lmhdDz-1SYc/XUBo-SiwmtI/AAAAAAAAtBE/8MwmrFEc-xg7S-xU6ZrI23v1Npw5XGJ2wCLcBGAs/s1600/Snickerdoodles-Stack-Image%2B1.JPG",
    price: 3.0,
    description: "So stinkin' good you'll tell a friend.",
    quantity: 100,
  },
  {
    name: "Michelle’s Chocolate Chip Cookies",
    type: "cookie",
    image:
      "https://www.shugarysweets.com/wp-content/uploads/2020/05/chocolate-chip-cookies-recipe.jpg",
    price: 3.0,
    description: "So fresh. Tasty like they were baked in your own kitchen.",
    quantity: 100,
  },
  {
    name: "Toad’s Oatmeal Raisin Cookies",
    type: "cookie",
    image:
      "https://www.twosisterscrafting.com/wp-content/uploads/2020/02/oatmeal-raisin-cookies-1200-featured.jpg",
    price: 3.0,
    description: "If you like raisins, these are your jam.",
    quantity: 100,
  },
  //Muffins
  {
    name: "Ilana's Banana Chip Muffins",
    type: "muffin",
    image:
      "https://natashaskitchen.com/wp-content/uploads/2019/04/Banana-Muffins-3.jpg",
    price: 5.0,
    description: "Banana, walnut, chocolate chip muffins.",
    quantity: 100,
  },
  {
    name: "Prince’s Corn Muffins",
    type: "muffin",
    image:
      "https://www.errenskitchen.com/wp-content/uploads/2018/03/corn-muffins01.jpg",
    price: 5.0,
    description: "Tasty corn. Everyone loves tasty corn.",
    quantity: 100,
  },
  {
    name: "Elissa's Pumpkin Cream Cheese Muffins",
    type: "muffin",
    image:
      "https://www.the-girl-who-ate-everything.com/wp-content/uploads/2011/10/pumpklin-cream-cheese-muffins-3-1-733x1024.jpg",
    price: 5.0,
    description: "Tasty fall favorite.",
    quantity: 100,
  },
  {
    name: "Alison’s Apple Cinnamon Muffins",
    type: "muffin",
    image:
      "https://images-gmi-pmc.edge-generalmills.com/ee09c106-9a1e-4ff5-9fcd-bd6fd942073d.jpg",
    price: 5.0,
    description: "Sweet and fruity apple muffin.",
    quantity: 100,
  },
  {
    name: "Christine’s Blueberry Muffins",
    type: "muffin",
    image:
      "https://sugarspunrun.com/wp-content/uploads/2021/05/Best-Blueberry-Muffins-Recipe-1-of-1.jpg",
    price: 5.0,
    description: "Rich and fruity blueberry muffin.",
    quantity: 100,
  },
  {
    name: "Jackie’s Chocolate Muffins",
    type: "muffin",
    image:
      "https://marshasbakingaddiction.com/wp-content/uploads/2016/01/nutella-stuffed-double-chocolate-muffins-7.jpg",
    price: 5.0,
    description: "Rich and bold chocolate muffin.",
    quantity: 100,
  },

  //Cupcakes
  {
    name: "Allie’s Vanilla Cupcakes",
    type: "cupcake",
    image:
      "https://i.pinimg.com/originals/1c/28/6b/1c286be04de2d8d2c3b5c29e27e17f33.jpg",
    price: 5.0,
    description: "Sweet and simple classic vanilla cupcake.",
    quantity: 100,
  },
  {
    name: "Lauren’s Chocolate Cupcakes",
    type: "cupcake",
    image:
      "https://www.lifeloveandsugar.com/wp-content/uploads/2017/05/Moist-Homemade-Chocolate-Cupcakes2.jpg",
    price: 5.0,
    description: "Rich and tasty chocolate cupcake.",
    quantity: 100,
  },
  {
    name: "Jane’s Funfetti Cupcakes",
    type: "cupcake",
    image:
      "https://prettysimplesweet.com/wp-content/uploads/2020/07/funfetti-cupcakes-recipe.jpg",
    price: 5.0,
    description: "Fun cupcake to perk up any day.",
    quantity: 100,
  },
  {
    name: "Sheyla’s Red Velvet Cupcakes",
    type: "cupcake",
    image:
      "https://therecipecritic.com/wp-content/uploads/2022/02/redvelvetcupcakes-1.jpg",
    price: 5.0,
    description: "Royally delicious cupcake.",
    quantity: 100,
  },
  {
    name: "Chief’s Peanut Butter Cupcakes",
    type: "cupcake",
    image:
      "https://www.justsotasty.com/wp-content/uploads/2018/03/Banana-Peanut-Butter-Cupcakes.jpg",
    price: 5.0,
    description: "Creamy peanut butter cupcake.",
    quantity: 100,
  },

  //Pies
  {
    name: "Esther's Apple Pie",
    type: "pie",
    image:
      "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Apple-Pie_EXPS_MRRA22_6086_E11_03_1b_v3.jpg",
    price: 30.0,
    description: "Fruity and fresh apple pie.",
    quantity: 100,
  },
  {
    name: "Samson’s Pumpkin",
    type: "pie",
    image:
      "https://tastesbetterfromscratch.com/wp-content/uploads/2022/10/PumpkinPie2-2-500x500.jpg",
    price: 30.0,
    description: "Tasty fall favorite.",
    quantity: 100,
  },
  {
    name: "Anahis’ Chocolate Cream",
    type: "pie",
    image:
      "https://static01.nyt.com/images/2018/08/09/dining/seneviratne_chocolateoreopie_horizontal/merlin_141910416_bf7098a9-7c73-4a7c-b632-4e99fd575356-articleLarge.jpg",
    price: 30.0,
    description: "Sweet and creamy chocolate pie.",
    quantity: 100,
  },
  {
    name: "Harrison’s Pecan Pie",
    type: "pie",
    image:
      "https://images-gmi-pmc.edge-generalmills.com/3151a587-0fca-4737-aa52-a803ddaa915b.jpg",
    price: 30.0,
    description: "New to the menu. Sweet as pie.",
    quantity: 100,
  },
  {
    name: "Lu’s Blueberry Pie",
    type: "pie",
    image:
      "https://www.lemonblossoms.com/wp-content/uploads/2021/08/Blueberry-Pie-Recipe-S2.jpg",
    price: 30.0,
    description: "Fun, fruity and flavorful blueberry pie.",
    quantity: 100,
  },
  {
    name: "Artemis’ Peanut Butter Pie",
    type: "pie",
    image:
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2022-09-Peanut-Butter-Pie%2FPB_pie_banana_pudding_pie-8",
    price: 30.0,
    description: "Creamy peanut butter pie.",
    quantity: 100,
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
      address: "123 Peppermint Tree",
    }),
    User.create({
      username: "murphy",
      password: "123",
      firstName: "Murphy",
      lastName: "Cat",
      email: "murphyy@gmail.com",
      phoneNumber: "123-123-1234",
      address: "123 Sesame Street",
    }),
    User.create({
      username: "lizzy",
      password: "123",
      firstName: "Lizzy",
      lastName: "Lizard",
      email: "lizzy@gmail.com",
      phoneNumber: "123-123-1234",
      address: "123 Coconut Circle",
      isAdmin: "TRUE",
    }),
  ]);

  const orders = await Promise.all([
    Order.create({
      address: "",
      pending: true,
      userId: 1,
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
