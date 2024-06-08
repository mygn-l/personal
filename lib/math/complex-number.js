const Complex_number = class {
  constructor(real, imaginary) {
    this.re = real;
    this.im = imaginary;
  }
  get modulus() {
    return Math.sqrt(this.re ** 2 + this.im ** 2);
  }
  get argument() {
    if (this.re === 0 && this.im === 0) {
      return NaN;
    } else if (this.re > 0 && this.im === 0) {
      return 0;
    } else if (this.re < 0 && this.im === 0) {
      return Math.PI;
    } else if (this.re === 0 && this.im > 0) {
      return Math.PI / 2;
    } else if (this.re === 0 && this.im < 0) {
      return -Math.PI / 2;
    } else {
      let angle = Math.atan(this.im / this.re);
      if (this.re < 0) {
        angle += Math.PI / 2;
      }
      return angle;
    }
  }
  get conjugate() {
    return new Complex_number(this.re, -this.im);
  }
};
Complex_number.addition = function (z1, z2) {
  return new Complex_number(z1.re + z2.re, z1.im + z2.im);
};
Complex_number.substraction = function (z1, z2) {
  return new Complex_number(z1.re - z2.re, z1.im - z2.im);
};
Complex_number.multiplication = function (z1, z2) {
  return new Complex_number(z1.re * z2.re - z1.im * z2.im, z1.im * z2.re + z1.re * z2.im);
};
Complex_number.division = function (z1, z2) {
  return new Complex_number(
    (z1.re * z2.re + z1.im * z2.im) / z2.modulus,
    (z1.im * z2.re - z1.re * z2.im) / z2.modulus
  );
};
Complex_number.exp = function (z) {
  return new Complex_number();
}
Complex_number.exponentiation = function (z1, z2) {
  return new Complex_number()
};

export default Complex_number;
