import { ITodoData } from "./typing";

export default class TodoTemplate{
    
    protected todoView({id,content,completed} :ITodoData):string{
      return `<input type='checkbox' data-id='${ id }' ${completed?'checked':''}></input>
      <span style='${completed?'line-through':'none'}'>${content}</span>
      <button data-id='${ id }'>删除</button>
      `
    }
}