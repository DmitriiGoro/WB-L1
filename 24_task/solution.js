export class SortableTable {
  page = 0; // значение текущей отображаемой страницы
  shift = 50; // значение смещения по данным
  subElements = {};

  constructor() {
    this.render();
  }

  sort = (event) => {
    const headerCell = event.target.closest(
      ".sortable-table__header .sortable-table__cell"
    );

    if (!headerCell) {
      return;
    }
    // получаем значения типа сортировки, имя сортируемого стобца и направление сортировки
    const sortType = headerCell.dataset.sortType;
    const name = headerCell.dataset.name;
    let sortDirection = headerCell.dataset.sortDirection;

    // если сортируем впервые или столбец уже отсортирован по убыванию, меняем значение сортировки на противоположный
    // и меняем/добавляем соответствующий атрибут
    if (!sortDirection || sortDirection === "desc") {
      sortDirection = "asc";
      headerCell.setAttribute("data-sort-direction", "asc");
    } else {
      // здесь делаем обратное действие
      sortDirection = "desc";
      headerCell.setAttribute("data-sort-direction", "desc");
    }
    // если сортировка уже происходила, значит, последний сортируемый элемент сохранен
    // проверяем наличие сохраненного сортируемого элемента и сравниваем его с текущим
    // если не совпадают, убираем соответствующий атрибут у предыдущего элемента
    if (
      this.subElements["lastSorted"] &&
      this.subElements["lastSorted"] !== headerCell
    ) {
      this.subElements["lastSorted"].removeAttribute("data-sort-direction");
    }
    // обновляем сохраненный сортируемый элемент
    this.subElements["lastSorted"] = headerCell;

    // считаем значения начала и конца отображаемых элементов
    const start = this.page * this.shift;
    const end = start + this.shift;

    const data = this.data.slice(start, end).sort((a, b) => {
      const sortMethods = {
        asc: 1,
        desc: -1,
      };

      // если тип сортируемого элемента строка, сортируем как строки, иначе как числа
      if (sortType === "string") {
        return sortMethods[sortDirection] * a[name].localeCompare(b[name]);
      } else {
        return sortMethods[sortDirection] * (a[name] - b[name]);
      }
    });

    this.subElements.body.innerHTML = this.bodyRowFill(data);
  };

  addEventListeners() {
    this.element.addEventListener("click", this.sort);
    this.element.addEventListener("click", (event) => {
      // проверяем нажатие на кнопку переключения страниц
      const button = event.target.closest(".sortable-table__button");

      if (!button) {
        return;
      }

      const shiftValues = {
        next: 1,
        prev: -1,
      };

      // проверяем какая именно была нажата кнопка и в какую сторону нужно смещать данные
      const whereToShift = button.dataset.button;

      this.page += shiftValues[whereToShift];
      // значение общего количества возможных страниц
      const totalPages = Math.ceil(this.data.length / this.shift);

      // если мы на последней странице, выключаем кнопку "next"
      if (this.page === totalPages - 1) {
        this.subElements.next.disabled = true;
      } else {
        // иначе включаем
        this.subElements.next.disabled = false;
      }
      // если мы на первой странице, выключаем кнопку "prev"
      if (this.page === 0) {
        this.subElements.prev.disabled = true;
      } else {
        this.subElements.prev.disabled = false;
      }
      // считаем значения начала и конца отображаемых элементов
      const start = this.page * this.shift;
      const end = start + this.shift;
      this.subElements.body.innerHTML = this.bodyRowFill(
        this.data.slice(start, end)
      );
    });
  }

  async render() {
    await this.loadData();

    this.getTemplateOfTable();
    this.makeHeaderConfig();
    this.makeHeader();
    this.makeBody();
    this.addEventListeners();
    document.body.append(this.element);
  }

  getTemplateOfTable() {
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
        <div class="sortable-table" data-element="table"></div>
        <div class="sortable-table__buttons-wrapper">
            <button class="sortable-table__button sortable-table__button-prev" ${
              this.page === 0 ? "disabled" : ""
            } data-button="prev"><<<</button>
            <button class="sortable-table__button sortable-table__button-next" data-button="next">>>></button>
        </div>
    </div>
    `;

    this.element = div.firstElementChild;

    // сохраняем элементы, к которым будем часто обращаться
    this.subElements.table = this.element.querySelector(
      "[data-element='table']"
    );
    this.subElements.prev = this.element.querySelector("[data-button='prev']");
    this.subElements.next = this.element.querySelector("[data-button='next']");
  }

  makeBody() {
    const body = document.createElement("div");

    body.classList.add("sortable-table__body");

    body.setAttribute("data-element", "body");

    this.subElements.body = body;

    if (this.data.length === 0) {
      this.subElements.body.innerHTML = `<div>Information was not found</div>`;
    } else {
      const start = this.page * this.shift;
      const end = start + this.shift;

      // заполняем "тело" таблицы
      this.subElements.body.innerHTML = this.bodyRowFill(
        this.data.slice(start, end)
      );
    }

    // вставлчем "тело" в таблицу
    this.subElements.table.append(body);
  }

  bodyRowFill(data) {
    // создаем строку таблицы
    return data
      .map((item) => {
        return `<div class="sortable-table__row">${this.bodyCellFill(
          item
        )}</div>`;
      })
      .join("");
  }

  bodyCellFill(item) {
    // создаем ячейку строки
    return Object.values(item)
      .map((value) => {
        return `<div class="sortable-table__cell">${value}</div>`;
      })
      .join("");
  }

  makeHeader() {
    this.makeHeaderConfig();

    const header = document.createElement("div");

    header.classList.add("sortable-table__header", "sortable-table__row");

    header.setAttribute("data-element", "header");

    header.innerHTML = Object.entries(this.headersConfig)
      .map(([name, value]) => {
        return `<div class="sortable-table__cell" data-sort-type=${value} data-name="${name}">
              <span>${name}</span>
        </div>`;
      })
      .join("");

    this.subElements.header = header;

    this.subElements.table.append(header);
  }

  async loadData() {
    try {
      const url = new URL(
        "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true"
      );

      const response = await fetch(url);

      const data = await response.json();

      this.data = data;
    } catch (e) {
      console.log(e);
    }
  }

  makeHeaderConfig() {
    const headersConfig = {};

    // т.к. все ключи полученных объектов одинаковы, для определения заголовков хедера используем первый объект в массиве данных
    for (const [key, value] of Object.entries(this.data[0])) {
      headersConfig[key] = isNaN(value) ? "string" : "number";
    }
    this.headersConfig = headersConfig;
  }
}
