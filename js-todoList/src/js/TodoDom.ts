import TodoTemplate from "./TodoTemplate"
import { ITodoData } from "./typing"
import { findParentNode } from "./utils"

export default class TodoDom extends TodoTemplate{
    private todoWrapper:HTMLElement

    constructor(todoWrapper:HTMLElement){
        super()
        this.todoWrapper = todoWrapper
    }

    // protected 受保护的，可以被继承，在派生类中可以访问，子类、父类都不能实例访问
    protected addItem(todo:ITodoData){
        const oItem:HTMLElement = document.createElement('div')
        oItem.className = 'todo-item'
        oItem.innerHTML = this.todoView(todo)
        this.todoWrapper.appendChild(oItem)
    }

    protected removeItem(target:HTMLElement){
        const oParentNode:HTMLElement | undefined= findParentNode(target,'todo-item')
        oParentNode?.remove()
    }


    public changeCompleted(target:HTMLElement,completed:boolean){
        const oParentNode:HTMLElement  = findParentNode(target,'todo-item')!
        const oContent:HTMLElement  = oParentNode.getElementsByTagName('span')[0]
        oContent.style.textDecoration = completed ? 'line-through' : 'none'
    }
}