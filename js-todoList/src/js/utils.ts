export function findParentNode(target:HTMLElement,className:string):HTMLElement | undefined{
    // while 循环在每次循环之前，会先对条件表达式进行求值，如果条件表达式的结果为 true，则执行{ }中的代码，如果条件表达式的结果为 false，则退出 while 循环
    // 把点击的父节点赋给target
    while(target = target.parentNode as HTMLElement){
        // 当相等，证明是该项，可以完成或者删除
        if(target.className === className){
            return target
        }
    }
}