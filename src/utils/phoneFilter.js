module.exports = phone => {
  let phoneArr = [...phone];
  let str = "";
  phoneArr.map((item, index) => {
    if (index > 2 && index < 7) {
      str += "*";
    } else {
      str += item;
    }
  });
  return str;
}