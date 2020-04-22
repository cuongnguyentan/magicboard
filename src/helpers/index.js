export const swapArrayElements = (a, ii, jj) => {
  let i = ii;
  let j = jj;
  if (ii > jj) {
    i = jj;
    j = ii;
  }

  if (!a[i] || !a[j]) return a;

  return [
    ...a.slice(0, i),
    a[j],
    ...a.slice(i + 1, j),
    a[i],
    ...a.slice(j + 1)
  ];
};

export default {};
