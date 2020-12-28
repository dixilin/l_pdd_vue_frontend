const throttle = (fn, delay, atleast) => {
  //节流函数
  let timer = null;
  let previous = null;
  return () => {
    let now = +new Date();
    if (!previous) previous = now;
    if (atleast && now - previous > atleast) {
      fn();
      previous = now;
      clearTimeout(timer);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
        previous = null;
      }, delay);
    }
  };
}
module.exports = throttle