import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // loop each item in the order'
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  // calc the total for that pizza
  // add that total to the running total

  return total;
}
