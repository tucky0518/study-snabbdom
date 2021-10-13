import { init } from 'snabbdom/init';
import { classModule } from 'snabbdom/modules/class';
import { propsModule } from 'snabbdom/modules/props';
import { styleModule } from 'snabbdom/modules/style';
import { eventListenersModule } from 'snabbdom/modules/eventlisteners';
import { h } from 'snabbdom/h';

// 创建patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
]);

// 创建虚拟节点
const vnode1 = h('ul', [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd')
]);
const vnode2 = h('ul', [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd'),
  h('li', { key: 'e' }, 'e')
]);
console.log(vnode1);

// 得到盒子和按钮
const container = document.getElementById('container');
const btn = document.getElementById('btn');

patch(container, vnode1);

// 点击按钮时,将vnode1变为vnode2
btn.onclick = function() {
  patch(vnode1, vnode2);
};

// ***********************************原版

// const patch = init([
//   // Init patch function with chosen modules
//   classModule, // makes it easy to toggle classes
//   propsModule, // for setting properties on DOM elements
//   styleModule, // handles styling on elements with support for animations
//   eventListenersModule // attaches event listeners
// ]);

// const container = document.getElementById('container');

// const vnode = h('div#container.two.classes', { on: { click: function() {} } }, [
//   h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
//   ' and this is just normal text',
//   h('a', { props: { href: '/foo' } }, "I'll take you places!")
// ]);
// // Patch into empty DOM element – this modifies the DOM as a side effect
// patch(container, vnode);

// const newVnode = h(
//   'div#container.two.classes',
//   { on: { click: function() {} } },
//   [
//     h(
//       'span',
//       { style: { fontWeight: 'normal', fontStyle: 'italic' } },
//       'This is now italic type'
//     ),
//     ' and this is still just normal text',
//     h('a', { props: { href: '/bar' } }, "I'll take you places!")
//   ]
// );
// // Second `patch` invocation
// patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
