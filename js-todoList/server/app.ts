import express,{Application} from 'express'
import bodyParse  from 'body-parser'
import {fileOperation, readFile} from './utils'

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
    rep.send(todoList)
})

app.post('/toggleTodo',(req,rep)=>{})

app.post('/removeTodo',(req,rep)=>{
    let id = req.body.id

    rep.send({
        code:'200',
        message:'删除成功'
    })

})

app.get('/addTodo',(req,rep)=>{})


app.listen(9000,()=>{
    console.log('监听9000');
    
})