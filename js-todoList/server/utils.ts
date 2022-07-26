
// sync为同步
import { readFileSync,writeFileSync } from 'fs'
import { resolve} from 'path'
import {ITodoData} from "../src/js/typing";

interface IFun<T = unknown>{
    (data:T[]):T[]
}

export function readFile(path:string):string{
    // resolve方法将路径或路径片段的序列解析为绝对路径。 
    // __dirname(获取当前文件所属目录的绝对路径)
    // console.log(__dirname,'__dirname')
    // console.log(resolve(__dirname,path),'resolve(__dirname,path)'); 
    return readFileSync(resolve(__dirname,path),'utf8')
}

export function writeFile<T>(path:string,data:T):void{
    writeFileSync(resolve(__dirname,path),JSON.stringify(data))
}

// IFun<ITodoData>
export function fileOperation(path:string,fn?:IFun<ITodoData>):void | string{

    let todoList:ITodoData[] = JSON.parse(readFile('todo.json') || '[]')

    if(!fn){
        return JSON.stringify(todoList)
    }

    todoList = fn(todoList)
    // console.log(todoList,'todoList')
    writeFile<ITodoData[]>('todo.json',todoList)

}