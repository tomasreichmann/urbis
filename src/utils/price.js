import range from "lodash/range";

export const getPrice = (
  marketGoods,
  exchangeAmount,
  priceRanges,
  priceBlockSize
) => {
  if (exchangeAmount === 0) {
    return 0;
  }
  console.log("marketGoods", marketGoods);
  const isSelling = exchangeAmount < 0;
  const buffer = marketGoods.amount + (isSelling ? -exchangeAmount : 0);
  const itemCosts = range(buffer).map(itemIndex => {
    // const priceRangeShift = isSelling ? 1 : 0;
    const priceRangeShift = 0;
    const priceRangeIndex = Math.min(
      Math.floor(itemIndex / priceBlockSize) + priceRangeShift,
      priceRanges.length - 1
    );
    const priceRange = priceRanges[priceRangeIndex];
    return marketGoods.price[priceRange];
  }, []);
  const itemsToExchange = itemCosts.slice(-Math.abs(exchangeAmount));
  return Math[isSelling ? "floor" : "ceil"](
    itemsToExchange.reduce((total, itemCost) => total + itemCost, 0)
  );
};

export const piecesInRange = (
  priceRange,
  priceRanges,
  marketGoods,
  exchangeAmount,
  priceBlockSize
) => {
  const priceRangesIndex = priceRanges.indexOf(priceRange);
  const amount = marketGoods.amount;
  const amountNext = amount - exchangeAmount;
  const amountBuffer = Math.max(amount, amountNext);

  const offset = priceRangesIndex * priceBlockSize;
  const limit = priceRangesIndex < 2 ? priceBlockSize : 99;
  return Math.max(Math.min(amountBuffer - offset, limit), 0);
};
