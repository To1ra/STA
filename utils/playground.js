let ori = {
  a: 1,
  b: 2,
};

const C = [ori.a, ori.b];

console.log(C);

ori.a = 3;

console.log(C, ori.a);
