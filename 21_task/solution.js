function computeStackSize() {
  let i = 0;
  const func = () => {
    i++;
    func();
  };

  try {
    func();
  } catch (e) {
    console.log(`The callstack size is ${i}`);
  }

  let j = 0;
  const secondFunc = () => {
    let a = j + 1;
    let b = a + 1;
    let c = b + 1;
    let d = c + 1;
    let e = d + 1;
    j++;
  };

  try {
    secondFunc();
  } catch (e) {
    console.log(`The callstack size is ${j}`);
  }
}
