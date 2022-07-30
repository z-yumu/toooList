import $ from 'jquery'
import { ITodoData } from './typing'


export function getTodoList(target:any,methodName:string,description:PropertyDescriptor){
    // target === TodoEvent.Prototype ===  t.__proto__ (new t = TodoEvent()) 
    // console.log(target,'target')
    // 这里是init(调用它的方法)
    // console.log(methodName,'methodName')
    // console.log(description,'description')

    // 保存原有的init方法
    const _origin = description.value
    // 重写(这里改变了this)
    description.value = function(todoData:ITodoData[]){
        $.get('http://localhost:9000/todoList').then((res:string)=>{
            if(!res){
                return
            }
            todoData = JSON.parse(res)
        }).then(()=>{
            // 重新绑定this 这里this是TodoEvent
            // console.log(this,'getTodoList========>');
            _origin.call(this,todoData)
        })
    }
    
}