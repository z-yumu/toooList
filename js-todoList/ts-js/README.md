# 面向对象，类的继承，很想切割程序——设计方案
1.程序进行分类
    外层:浏览器事件 -> 调用方法 -> 事件处理函数的绑定
    操作数据:addTodo removeTodo toggleComplete
    操作DMO: addItem removeItem changeCompleted
    管理模板: todoView -> 接收参数