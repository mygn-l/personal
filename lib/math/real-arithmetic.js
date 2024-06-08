const real_arithmetic = {};

real_arithmetic.division = function (a, b) {
  if (b !== 0) {
    return a / b;
  } else {
    return NaN;
  }
};

export default real_arithmetic;
