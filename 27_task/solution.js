export const addAnimation = (element) => {
  // id для значения setInterval, rotateDeg для значения css свойства rotate, scaleSize для значения css свойства scale
  let id;
  let rotateDeg = 0;
  let scaleSize = 1;

  function styling() {
    if (rotateDeg === 360 && scaleSize > 1) {
      // как только элемент перевернулся, отменяем setInterval и убираем inline свойства
      clearInterval(id);
      element.style.transform = ``;
    } else {
      rotateDeg++;

      if (scaleSize > 0.1 && rotateDeg < 180) scaleSize -= 0.9 / 180;
      else scaleSize += 0.9 / 180;

      element.style.transform = `rotate(${rotateDeg}deg) scale(${
        Math.round(scaleSize * 100) / 100
      })`;
    }
  }
  // создает setInterval для последовательного вызова функции styling
  id = setInterval(styling, 5);
};
