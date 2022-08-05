import { ITodoData } from "./typing";

export default class TodoTemplate{
    // style='"text-decoration" : ${completed? 'line-through':'none'}'
    protected todoView({id,content,completed} :ITodoData):string{
      return `<input type='checkbox' data-id='${id}' ${completed ? 'checked' : ''} />
      <span style='text-decoration:${completed ? "line-through" : "none"}'>${content}</span>
      <button data-id='${ id }'>删除</button>
      `
    }
}