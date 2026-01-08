export const create = (elem, { attributes = {}, children = {} } = {}) => {
  if (typeof elem == "string") {
    const node = document.createTextNode(elem);
    return node;
  }
  const node = document.createElement(elem);
  for (const [key, value] of Object.entries(children)) {
    const subNode = create(key, value);
    node.appendChild(subNode);
  }
  return node;
};
