
// sync为同步
import { readFileSync } from 'fs'
import { resolve} from 'path'
import {ITodoData} from "../src/js/typing";

export function readFile(path:string):string{
    // resolve方法将路径或路径片段的序列解析为绝对路径。 
    // __dirname(获取当前文件所属目录的绝对路径)
    // console.log(__dirname,'__dirname')
    // console.log(resolve(__dirname,path),'resolve(__dirname,path)'); 
    return readFileSync(resolve(__dirname,path),'utf8')
}

export function fileOperation(path:string,fn?:any):void | string{

    let todoList:ITodoData[] = JSON.parse(readFile('todo.json') || '[]')

    if(!fn){
        return JSON.stringify(todoList)
    }

}