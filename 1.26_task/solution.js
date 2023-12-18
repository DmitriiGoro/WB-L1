export const deepTraverse = (element) => {
  console.dir(element);

  for (const child of element.children) {
    deepTraverse(child);
  }
};
