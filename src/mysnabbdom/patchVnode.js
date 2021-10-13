import createElement from './createElement.js';
import updateChildren from './updateChildren.js';

// 对比同一个虚拟节点
export default function patchVnode(oldVnode, newVnode) {
  // 判断新旧vnode是否是同一个对象
  if (oldVnode === newVnode) return;
  // 判断新vnode有没有text属性
  if (
    newVnode.text != undefined &&
    (newVnode.children == undefined || newVnode.children.length == 0)
  ) {
    console.log('新vnode有text属性');
    if (newVnode.text != oldVnode.text) {
      // 如果新虚拟节点中的text和老虚拟节点中的text不同,那么直接让新text写入老的elm中即可.如果老的elm中是children,那么也会立即消失
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新vnode没有text属性,有children
    console.log('新vnode没有text属性');
    // 判断老的有没有children
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      // 老的有children,新的也有children,此时就是最复杂的情况,新老都有children
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
      // // 所有未处理节点的开头
      // let un = 0;
      // for (let i = 0; i < newVnode.children.length; i++) {
      //   let ch = newVnode.children[i];
      //   // 再次遍历,看看oldVnode中有没有节点和他是same的
      //   let isExist = false;
      //   for (let j = 0; j < oldVnode.children.length; j++) {
      //     if (
      //       oldVnode.children[j].sel == ch.sel &&
      //       oldVnode.children[j].key == ch.key
      //     ) {
      //       isExist = true;
      //     }
      //   }
      //   if (!isExist) {
      //     console.log(ch, i);
      //     let dom = createElement(ch);
      //     ch.elm = dom;
      //     if (un < oldVnode.children.length) {
      //       oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm);
      //     } else {
      //       oldVnode.elm.appendChild(dom);
      //     }
      //   } else {
      //     // 让处理的指针下移
      //     un++;
      //     if (i != j) {
      //     }
      //   }
      // }
    } else {
      // 老的没有children,新的有children
      // 清空老节点的内容
      oldVnode.elm.innerHTML = '';
      // 遍历新vnode的子节点,创建dom,上树
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
