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
        $.get('http://localhost:9000/todoList').then((res:IResponse<ITodoData>)=>{
            if(!res){
                return
            }
            todoData = res.data
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
        // IResponse
        $.post('http://localhost:9000/removeTodo',{ id },(res:IResponse<null>)=>{
                _origin.call(this,target,id)
                if(res.code !== Code.Success){
                    alert("删除失败");
                    return
                }
        })
    }
}

// 装饰器尝试传参
export function  toggleCompleteDec(target:any,methodName:string,description:PropertyDescriptor):void{
    const _origin = description.value
    description.value = function (target:HTMLElement,id:number){
        // IResponse
        $.post('http://localhost:9000/toggleTodo',{ id },(res:IResponse<null>)=>{
            _origin.call(this,target,id)
            if(res.code !== Code.Success){
                alert("修改失败");
                return
            }
        })
    }
}

export  function addTodoDec(target:any,methodName:string,description:PropertyDescriptor){
    const _origin = description.value
    description.value = function (todo: ITodoData){
        // IResponse
        $.post('http://localhost:9000/addTodo',{ todo:JSON.stringify(todo) },(res:IResponse<null>)=>{
            _origin.call(this,todo)
            if(res.code === Code.Exist){
                alert("已存在");
            }else if(res.code !== Code.Success){
                alert("新增失败")
                return
            }
        })
    }
}