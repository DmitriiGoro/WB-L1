export const useTemplate = (purchaseText, container) => {
  const template = document.querySelector("#template");

  const item = template.content.cloneNode(true);
  const span = item.querySelector("span");
  span.textContent = purchaseText;

  container.append(item);
};
