const formatPrice = (p) => {
  const price = p / 100 + "";
  if (price.indexOf(".") === -1) {
    return price;
  } else {
    const count = price.length - price.indexOf(".") + 1;
    if (count <= 2) {
      return price;
    }
    return (price * 1).toFixed(2);
  }
}

module.exports = formatPrice