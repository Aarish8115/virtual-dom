const response = await fetch("./main.json");
const json2 = await response.json();
// console.log(json);

const createJson = (count) => {
  return {
    type: "div",
    attributes: {
      id: "app",
      style: "padding:40px; font-family:system-ui, sans-serif;",
    },
    children: [
      {
        type: "p",
        attributes: {
          style: "font-size:24px; margin-bottom:16px;",
        },
        children: [{ type: "#text", value: String(count) }],
      },
      {
        type: "input",
        attributes: {
          style: "padding:8px; font-size:16px;",
        },
        children: [],
      },
    ],
  };
};
const newJson = {
  type: "div",
  attributes: {
    id: "app",
    style:
      "min-height:100vh; display:flex; flex-direction:column; font-family:system-ui, sans-serif; background:#f6f7f9; color:#222;",
  },
  children: [
    {
      type: "header",
      attributes: {
        style:
          "background:#fff; border-bottom:1px solid #e5e7eb; padding:24px 32px;",
      },
      children: [
        {
          type: "h1",
          attributes: {
            style: "font-size:32px; font-weight:700; letter-spacing:-0.5px;",
          },
          children: [{ type: "#text", value: "Virtual DOM Playground" }],
        },
        {
          type: "nav",
          attributes: {
            style: "margin-top:16px; display:flex; gap:24px;",
          },
          children: [
            {
              type: "a",
              attributes: {
                href: "/",
                style:
                  "text-decoration:none; color:#111; font-weight:600; border-bottom:2px solid #111; padding-bottom:4px;",
              },
              children: [{ type: "#text", value: "Home" }],
            },
            {
              type: "a",
              attributes: {
                href: "/docs",
                style: "text-decoration:none; color:#555; font-weight:500;",
              },
              children: [{ type: "#text", value: "Docs" }],
            },
          ],
        },
      ],
    },
    {
      type: "main",
      attributes: {
        style:
          "flex:1; max-width:900px; width:100%; margin:0 auto; padding:48px 32px;",
      },
      children: [
        {
          type: "p",
          attributes: { id: "count" },
          children: [{ type: "#text", value: 1 }],
        },
        {
          type: "section",
          attributes: {
            style: "margin-bottom:40px;",
          },
          children: [
            {
              type: "p",
              attributes: {
                style: "font-size:16px; line-height:1.6; color:#555;",
              },
              children: [
                {
                  type: "#text",
                  value:
                    "This UI is fully driven by a JSON-based Virtual DOM with inline styles.",
                },
              ],
            },
          ],
        },
        {
          type: "ul",
          attributes: {
            style: "list-style:none; padding:0; display:grid; gap:12px;",
          },
          children: [
            {
              type: "li",
              attributes: {
                style:
                  "background:#fff; padding:16px; border:1px solid #e5e7eb; border-radius:8px;",
              },
              children: [{ type: "#text", value: "Efficient diffing" }],
            },
            {
              type: "li",
              attributes: {
                style:
                  "background:#fff; padding:16px; border:1px solid #e5e7eb; border-radius:8px;",
              },
              children: [{ type: "#text", value: "Efficient diffing" }],
            },
            {
              type: "li",
              attributes: {
                style:
                  "background:#fff; padding:16px; border:1px solid #e5e7eb; border-radius:8px;",
              },
              children: [{ type: "#text", value: "Minimal re-rendering" }],
            },
            {
              type: "input",
              attributes: {
                style:
                  "background:#fff; padding:16px; border:1px solid #e5e7eb; border-radius:8px;",
              },
              children: [],
            },
          ],
        },
      ],
    },
    {
      type: "footer",
      attributes: {
        style:
          "background:#fff; border-top:1px solid #e5e7eb; padding:16px 32px; text-align:center;",
      },
      children: [
        {
          type: "p",
          attributes: {
            style: "font-size:14px; color:#666;",
          },
          children: [{ type: "#text", value: "© 2026 Virtual DOM Inc." }],
        },
      ],
    },
  ],
};

const createNode = (type, attributes, children) => {
  // console.log(type);
  const node = document.createElement(type);
  for (const [key, value] of Object.entries(attributes)) {
    node.setAttribute(key, value);
  }
  for (const child of children) {
    if (child.type == "#text") {
      const textNode = document.createTextNode(child.value);
      node.appendChild(textNode);
    } else {
      const childNode = createNode(
        child.type,
        child.attributes,
        child.children
      );
      node.appendChild(childNode);
    }
  }
  return node;
};

const diff = (oldNode, newNode) => {
  if (!oldNode && newNode) {
    return { type: "CREATE", newNode };
  }
  if (oldNode && !newNode) {
    return { type: "DELETE" };
  }
  if (oldNode.type !== newNode.type) {
    return { type: "REPLACE", newNode };
  }
  const patchAttributes = [];
  if (oldNode.type == "#text") {
    if (oldNode.value !== newNode.value) {
      return { type: "CHANGE_TEXT", newNode };
    }
  }
  const max = Math.max(
    oldNode.children?.length || 0,
    newNode.children?.length || 0
  );

  const childrenPatches = [];
  // console.log("Max", max);
  for (let i = 0; i < max; i++) {
    childrenPatches.push(diff(oldNode.children[i], newNode.children[i]));
  }
  return {
    type: "UPDATE",
    attributes: patchAttributes,
    children: childrenPatches,
  };
};
const diffAttributes = (oldAttributes, newAttributes) => {
  return;
};

const applyPatch = (parent, patch, index) => {
  if (!patch) return;

  const element = parent.childNodes[index];
  if (!element) return;
  // console.log(
  //   patch.type,
  //   patch.children[0].type,
  //   "parent",
  //   parent,
  //   "elem",
  //   element,
  //   "nodes",
  //   parent.childNodes
  // );
  // if(patch.children)
  switch (patch.type) {
    case "CREATE":
      parent.appendChild(
        createNode(
          patch.newNode.type,
          patch.newNode.attributes,
          patch.newNode.children
        )
      );
      break;
    case "DELETE":
      if (element) {
        parent.removeChild(element);
      }
      break;
    case "REPLACE":
      parent.replaceChild(
        createNode(
          patch.newNode.type,
          patch.newNode.attributes,
          patch.newNode.children
        ),
        element
      );
      break;
    case "UPDATE":
      patch.children?.forEach((p, index) => {
        if (p.type == "CHANGE_TEXT") {
          console.log("parent", parent.innerHTML, "elem", element, "patch", p);
          parent.innerHTML = p.newNode.value;
          return;
        }
        applyPatch(element, p, index);
      });
      break;
  }
};

const render = (node) => {
  const main = document.getElementById("app");
  main.replaceWith(node);
};
let count = 0;
let json = createJson(count);
let main = document.getElementById("app");
console.log(main);
let app = createNode(json.type, json.attributes, json.children);
render(app);

main = document.getElementById("app");
console.log(main);

setInterval(() => {
  let old = json;
  count++;
  json = createJson(count);
  main = document.getElementById("app");
  // console.log(main);
  const patch = diff(old, json);
  console.log(patch);
  applyPatch(main, patch, 0);
}, 1000);
// setTimeout(() => {
//   let old = json;
//   count++;
//   json = createJson(count);
//   main = document.getElementById("app");
//   // console.log(main);
//   const patch = diff(old, json);
//   console.log(patch);
//   applyPatch(main, patch, 0);
// }, 2000);

render(app);

// setTimeout(() => {
//   // console.log(diff(json, jsonnew).children);
//   main = document.getElementById("app");
//   applyPatch(main, diff(json, newJson), 0);
// }, 2000);
