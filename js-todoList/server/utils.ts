
// sync为同步
import { readFileSync } from 'fs'
import { resolve} from 'path'

export function readFile(path:string):string{
    // resolve方法将路径或路径片段的序列解析为绝对路径。 
    // __dirname(获取当前文件所属目录的绝对路径)
    // console.log(__dirname,'__dirname')
    // console.log(resolve(__dirname,path),'resolve(__dirname,path)'); 
    return readFileSync(resolve(__dirname,path),'utf8')
}