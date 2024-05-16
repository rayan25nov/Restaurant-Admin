function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const sales = days.map((day) => ({
  name: day,
  value: getRandomInt(1000, 5000), // generate a random value between 1000 and 5000
}));

const orders = days.map((day) => ({
  name: day,
  count: getRandomInt(5, 30), // generate a random count between 5 and 30
}));

const data = { sales, orders };

console.log(data);
