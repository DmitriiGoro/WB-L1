// 1-ый способ
export const computeStorage = () => {
  window.localStorage.clear();

  function computeSize(string) {
    return new TextEncoder().encode(string).length;
  }

  // заполняем localStorage элементами с пустым значением
  try {
    for (let i = 0; i < 1000000; i++) {
      window.localStorage.setItem(i, "");
    }
  } catch (e) {
    console.log(e);
  }

  let size = 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    size += computeSize(window.localStorage.key(i));
  }

  console.log(
    `The size of local storage is ${size} bytes or ${(size / 1e6).toFixed(
      2
    )} megabytes`
  );
};
// 2-ой способ с использованием объекта Blob
function computeSizeUsingBlob() {
  const size = new Blob(Object.keys(window.localStorage)).size;

  return size;
}
