import h from './mysnabbdom/h.js';
import patch from './mysnabbdom/patch';

const vnode1 = h('ul', {}, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd')
]);

const vnode2 = h('ul', {}, [
  h('li', { key: 'f' }, 'fff'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'd' }, 'd')
]);

const container = document.getElementById('container');
const btn = document.getElementById('btn');

patch(container, vnode1);

btn.onclick = function() {
  patch(vnode1, vnode2);
};
