function render(vnode, container) {
  // const jsx = <div>1</div>;
  // console.log(jsx)
  console.log(vnode, "vnode");
  const node = createNode(vnode);

  container.appendChild(node);
}

function isStringOrNumber(sth) {
  return typeof sth === "string" || typeof sth === "number";
}

function createNode(vnode) {
  let node;
  const { type } = vnode;
  if (typeof type === "string") {
    node = updateHostComponent(vnode);
  } else if (isStringOrNumber(vnode)) {
    node = updateTextComponent(vnode);
  } else if (typeof type === "function") {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = updateFragmentComponent(vnode)
  }
  return node;
}

function updateNode(node, nextval) {
  Object.keys(nextval)
    .filter((k) => k !== "children")
    .forEach((k) => {
      node[k] = nextval[k];
    });
}

// !原生标签节点
function updateHostComponent(vnode) {
  const { type, props } = vnode;
  const node = document.createElement(type);
  updateNode(node, props);
  reconcileChildren(node, props.children);
  return node;
}

// !文本节点
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// !Funciton Component组件
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const child = type(props);
  const node = createNode(child)
  return node;
}

// !Class Component组件
function updateClassComponent(vnode) {
  const { type, props } = vnode;
  const instance = new type(props);
  const child = instance.render();
  const node = createNode(child)
  return node;
}

// !Fragment Component组件
function updateFragmentComponent(vnode){
  const node = document.createDocumentFragment()
  reconcileChildren(node, vnode.props.children)
  return node;
}

function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children];
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    render(child, parentNode);
  }
}

export default { render };
