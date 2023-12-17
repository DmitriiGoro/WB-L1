export class AddressInput {
  debounceTime = 500;

  constructor() {
    this.render();
  }

  render() {
    this.makeTemplate();
    this.addEventListener();
  }

  addEventListener() {
    document.addEventListener(
      "input",
      this.debounce(this.getAddress, this.debounceTime, event)
    );
  }

  makeTemplate() {
    const div = document.createElement("div");

    div.innerHTML = `<div id="map" class="map">
    <input class="map__input" type="text" name="" id="address" />
    <ul class="map__list"></ul>
  </div>`;

    this.element = div.firstElementChild;
  }

  //
  makeUl(suggestions) {
    const ul = this.element.querySelector(".map__list");
    ul.innerHTML = "";

    if (!suggestions) {
      return;
    }

    for (const suggest of suggestions) {
      const li = document.createElement("li");
      li.classList.add("map__list-element");

      const {
        title: { text },
      } = suggest;

      li.innerHTML = text;
      ul.append(li);
    }

    this.element.append(ul);
  }

  // функция-обертка для создания отложенной загрузки данных
  debounce = (func, ms) => {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
  };

  getAddress = async (event) => {
    // запрос API suggest
    const response = await fetch(
      `https://suggest-maps.yandex.ru/v1/suggest?apikey=d0b1991c-82ee-4526-a692-83340f9bbf4c&text=${event.target.value}`
    );

    const json = await response.json();
    const { results } = json;

    this.makeUl(results);
  };
}
