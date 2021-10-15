# study-snabbdom

# 虚拟 dom 和 diff 算法

`webpack` : 模块化打包
`webpack-dev-server` : 热更新

`snabbdom` 是著名的虚拟 dom 库,是 diff 算法的鼻祖,vue 源码借鉴了 snabbdom

https://github.com/snabbdom/snabbdom

虚拟 dom : 用 js 对象描述 dom 的层次结构,dom 中的一切属性都在虚拟 dom 中有对应的属性

`diff` 是发生在虚拟 dom 上的

dom 如何变为虚拟 dom,属于模板编译原理范畴

h 函数用来产生虚拟节点(vnode)

只有同一个虚拟节点才进行精细化比较
同一个虚拟节点 : `选择器相同`且`key相同`
只进行同层比较,不会进行跨层比较

新创建的节点(`newVnode.children[i].elm`)插入到所有未处理的节点(`oldVnode.children[um].elm`)之前,而不是所有已处理节点之后

四种命中查找:(从上到下有顺序的)

① 新前与旧前
② 新后与旧后
③ 新后与旧前(此种情况发生了,涉及移动节点,那么新前指向的节点,移动到旧后之后)
④ 新前与旧后(此种情况发生了,涉及移动节点,那么新前指向的节点,移动到旧前之前)

`命中一种就不再命中判断了`
`如果都没有命中,就需要用循环来寻找了,移动到oldStartIdx之前`

while(`新前<=新后&&旧前<=旧后`){......}

如果是旧节点先循环完毕,说明新节点中有要插入的节点
如果新节点先循环完毕,如果老节点中还有剩余节点(旧前和新后指针中间的节点),说明它们是要被删除的节点

当 ③ 新后与旧前命中的时候,此时要移动节点,移动新前指向的这个节点到老节点的`旧后的后面`
当 ④ 新前与旧后命中的时候,此时要移动节点,移动新前指向的这个节点到老节点的`旧前的前面`

![Image text](https://github.com/tucky18/study-snabbdom/blob/main/img/vue%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90%E4%B9%8B%E8%99%9A%E6%8B%9Fdom%E5%92%8Cdiff%E7%AE%97%E6%B3%95.png)


