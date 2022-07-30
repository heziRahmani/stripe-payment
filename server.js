const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51LJC06JZOZ9whYl8wvglcpVZnyocpeXW4heF1I8L14f2Ge5OxJ5mTprgddzKzbHLeVSNHO19QFDvKC8gx4iY3Wsw00IEfWQozv"
);

const app = express();
const router = express.Router();
const port = process.env.PORT || 2000;
//MIDDELWER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static("public"));

//products
const storeItems = new Map([
  [
    18746920,
    {
      title: "Playstation 5 Disc Version",
      info: "Explore uncharted virtual territories and slay dragons with this sleek Sony PlayStation 5 gaming console.",
      price: 959.99,
      img: "https://s.yimg.com/uu/api/res/1.2/mTypDYLF2WjwZ80z_Wz.3w--~B/Zmk9ZmlsbDtoPTQ1MDt3PTY3NTthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2020-11/6e8d7000-2e4b-11eb-99ff-3ec4709c6747.cf.jpg",
      rating: 5,
    },
  ],
  [
    35208509,
    {
      title: "Xbox Series S",
      info: "Introducing the Xbox Series S, the smallest, sleekest Xbox console ever.",
      price: 265.0,
      img: "https://images.indianexpress.com/2020/11/Xbox1200.jpg",
      rating: 3,
    },
  ],
  [
    74839276,
    {
      title:
        "Fender Player Stratocaster Electric Guitar - Maple Fingerboard - Polar White",
      info: "Respecting Fender's heritage while maintaining their innovative spirit.",
      price: 49.99,
      img: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/prod/439056.jpg",
      rating: 5,
    },
  ],
  [
    73654026,
    {
      title: "MOVSSOU E7 Active Noise Cancelling Headphones",
      info: "Enjoy a better wireless experience with E7 active noise cancelling headphones. Exclusive technology delivers deep, immersive sound at any volume.",
      price: 39.99,
      img: "https://manuals.plus/wp-content/uploads/2022/03/MOVSSOU-E7-Active-Noise-Cancelling-Headphones-Bluetooth-Headphones-Wireless-Headphones-featured.png",
      rating: 1,
    },
  ],
  [
    51653851,
    {
      title: "SAMSUNG 75-Inch",
      info: "Dive into our most brilliantly intense 4K experience, powered by Quantum Matrix Technology.",
      price: 3497.99,
      img: "https://m.media-amazon.com/images/I/91F3W7Ccw+L._AC_SX450_.jpg",
      rating: 4,
    },
  ],
  [
    54662801,
    {
      title: "Giantex 6' Surfboard Surfing",
      info: "this is the product info",
      price: 99.99,
      img: "https://m.media-amazon.com/images/I/41oTFiws1BL._SL500_.jpg",
      rating: 4,
    },
  ],
  [
    54309816,
    {
      title: "PS-game",
      info: "this is the product info",
      price: 50,
      img: "https://s.yimg.com/uu/api/res/1.2/mTypDYLF2WjwZ80z_Wz.3w--~B/Zmk9ZmlsbDtoPTQ1MDt3PTY3NTthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2020-11/6e8d7000-2e4b-11eb-99ff-3ec4709c6747.cf.jpg",
      rating: 2,
    },
  ],
  [
    65445656,
    {
      title: "titele check",
      info: "this is the product info",
      price: 505,
      img: "https://s.yimg.com/uu/api/res/1.2/mTypDYLF2WjwZ80z_Wz.3w--~B/Zmk9ZmlsbDtoPTQ1MDt3PTY3NTthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2020-11/6e8d7000-2e4b-11eb-99ff-3ec4709c6747.cf.jpg",
      rating: 4,
    },
  ],
]);

//routs
app.post("/payment", cors(), async (req, res) => {
  let { products, id } = req.body;
  const prodIds = [];

  products.forEach((prod) => {
    prodIds.push(storeItems.get(Number(prod.productId)).price);
  });
  console.table(prodIds);

  const amount = prodIds.reduce((acc, curr) => {
    return (acc += curr);
  }, 0);
  console.log(amount);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,

      currency: "USD",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    res.json({
      id: payment.id,
      message: "payment successfull",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "payment Unsuccessfull",
      success: false,
    });
  }
});
//end
app.listen(port, () => console.log(`server running on port ${port}`));
