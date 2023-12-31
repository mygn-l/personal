const uid = function (rounds = 2) {
  let id = new Date().getTime().toString();
  for (let i = 0; i < rounds; i++) {
    id += String(Math.round(Math.random() * 999999));
  }
  return id;
};

export default uid;
