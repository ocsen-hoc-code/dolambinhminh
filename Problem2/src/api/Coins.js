import { PRICES_URL } from "../constants";

const getCoins = async () => {
  try {
    const response = await fetch(PRICES_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const filteredPrices = filterLatestPrices(data);
    const sortedPrices = sortByCurrency(filteredPrices);
    return sortedPrices;
  } catch (error) {
    console.error('Failed to fetch coins:', error);
    throw error;
  }
};

const filterLatestPrices = (data) => {
  const latestPrices = {};

  data.forEach((item) => {
    const { currency, date, price } = item;
    if (
      !latestPrices[currency] ||
      new Date(date) > new Date(latestPrices[currency].date)
    ) {
      latestPrices[currency] = { date, price };
    }
  });

  return Object.entries(latestPrices).map(([currency, { date, price }]) => ({
    currency,
    date,
    price,
  }));
};

const sortByCurrency = (prices) => {
  return prices.sort((a, b) => a.currency.localeCompare(b.currency));
};

export default getCoins;
