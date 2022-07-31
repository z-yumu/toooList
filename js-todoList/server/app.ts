import express,{Application} from 'express'
import bodyParse  from 'body-parser'
import { fileOperation } from './utils'
import {ITodoData} from "../src/js/typing";

const app:Application = express()
// body 的urlencoded字符，只支持uft-8的编码的字符.返回的对象是一个键值对，当extended 为false的时候，键值对中的值就为'String'或'Array'形式，
// 为true的时候，则可为任何数据类型。
app.use(bodyParse.urlencoded({extended:true}))
app.use(bodyParse.json())


// 设置跨域
app.all('*',(req,rep,next)=>{
    rep.header('Access-Control-Allow-Origin','*')
    rep.header('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS')
    next()
})

app.get('/todoList',(req,rep)=>{
    const todoList:string = fileOperation('todo.json') as string
    rep.send({
        code:200,
        message:'请求成功',
        data:JSON.parse(todoList) || []
    })
})

app.post('/toggleTodo',(req,rep)=>{
    let id = parseInt(req.body.id)
    fileOperation('todo.json',(todoData:ITodoData[])=>{
        // filter不会改变原数组
        return todoData.map((item:ITodoData) => {
            if (item.id === id){
                item.completed = ! item.completed
            }
            return item
        })
    })

    rep.send({
        code:200,
        message:'修改成功',
    })
})

app.post('/removeTodo',(req,rep)=>{
    // 使用Number()转换的时候，对于字符串而言，如果转换的字符串不是纯数字，包含字母或者其他，则直接返回NaN。
    // 使用parseInt()转换的时候，需要看情况。如果以数字开头，就会返回开头的合法数字部分，如果以非数字开头，则返回NaN。
    let id = parseInt(req.body.id)

    fileOperation('todo.json',(todoData:ITodoData[])=>{
        // filter不会改变原数组
        return todoData.filter((item:ITodoData) => item.id !== id)
    })

    rep.send({
        code:200,
        message:'删除成功',
    })

})

app.post('/addTodo',(req,rep)=>{
    // console.log(req.body,'req')
    req.body.id = parseInt(req.body.id)
    req.body.completed = Boolean(req.body.completed)
    const body:ITodoData = req.body
    let content:string = req.body.content
    fileOperation('todo.json',(todoData:ITodoData[])=>{
        // filter不会改变原数组
        const todo:ITodoData =  todoData.find((item:ITodoData) => item.content === content)
        console.log(todo,'todo')
        if(todo){
            rep.send({
                code:100,
                message:'已存在'
            })
            return
        }

        todoData.push(body)
        rep.send({
            code:200,
            message:'新增成功'
        })
        return todoData
    })

})


app.listen(9000,()=>{
    console.log('listen at port 9000');
})