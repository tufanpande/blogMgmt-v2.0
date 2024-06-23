const events = require("events");

const eventEmitter = new events.EventEmitter();

// functions
const calculateTax = (totalAmt) => {
  const tax = 0.13 * +totalAmt;
  console.log(`You need to total of ${tax} amount inorder to pay 13% tax`);
  eventEmitter.emit("orderNow", tax, totalAmt);
};

const buyNow = async (cart) => {
  const totalAmt = cart.reduce((acc, current) => {
    return acc + current.price;
  }, 0);
  eventEmitter.emit("calculateTax", totalAmt);
};

const orderNow = async (tax, totalAmt) => {
  console.log(`Your total amount is ${tax + totalAmt}`);
};

// defining events
eventEmitter.on("calculateTax", (totalAmt) => {
  calculateTax(totalAmt);
});

eventEmitter.on("orderNow", (tax, totalAmt) => {
  orderNow(tax, totalAmt);
});

// User Interaction
const cart = [
  { name: "tv", price: 2000 },
  { name: "decor", price: 500 },
];
buyNow(cart);
