import vnode from './vnode.js';
import createElement from './createElement.js';
import patchVnode from './patchVnode.js';

export default function(oldVnode, newVnode) {
  // 判断传入的第一个参数,是dom节点还是虚拟节点
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    // 传入的第一个参数是dom节点,此时要包装为虚拟节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }
  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key) {
    console.log('是同一个节点');
    patchVnode(oldVnode, newVnode);
  } else {
    console.log('不是同一个节点,暴力插入新的,删除旧的');
    let newVnodeElm = createElement(newVnode);
    // 插入到老节点之前
    if (oldVnode.elm && newVnode) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}
