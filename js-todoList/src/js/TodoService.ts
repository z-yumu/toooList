import $ from 'jquery'
import {IResponse, ITodoData} from './typing'
import {Code} from "./enum";







export function getTodoList(target:any,methodName:string,description:PropertyDescriptor):void{
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

export function  removeTodoDec(target:any,methodName:string,description:PropertyDescriptor):void{
    const _origin = description.value
    description.value = function (target:HTMLElement,id:number){
        $.post('http://localhost:9000/removeTodo',(res:IResponse)=>{
                _origin.call(this,target,id)
                if(res.code !== Code.Success){
                    alert("删除失败");
                    return
                }
        })
    }
}