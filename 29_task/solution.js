export const formSubmit = async (form) => {
  const json = {};

  // считываем даные формы и складываем их в объект
  for (const element of form.elements) {
    json[element.name] = element.value;
  }
  const stringifiedJson = JSON.stringify(json);

  try {
    // оправляем данные на сервер
    const response = await fetch(`https://httpbin.org/post`, {
      body: stringifiedJson,
      method: `POST`,
    });

    const responseJson = await response.json();
  } catch (e) {
    console.log(e);
  }
};
