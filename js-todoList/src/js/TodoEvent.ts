import TodoDom from "./TodoDom";
import { ITodoData } from "./typing";


class TodoEvent extends TodoDom {
  private todoData: Array<ITodoData>;

  constructor(todoData: ITodoData[],todoWrapper:HTMLElement) {
    super(todoWrapper)
    this.todoData = todoData;
  }

  addTodo(todo: ITodoData): number  {
    const _todo: null | ITodoData | undefined = this.todoData.find(
      (item: ITodoData) => item.content === todo.content
    );

    if (!_todo) {
        this.todoData.push(todo)
        this.addItem(todo)
        return 200
    }
    // 已存在
    return 1001
  }

  removeTodo(target:HTMLElement,id:number):void {
    // filter不会改变原数组
    this.todoData = this.todoData.filter((item:ITodoData)=> item.id !== id  )
    this.removeItem(target)
  }

  toggleComplete(target:HTMLElement,id:number) {
    // map 返回一个新数组
    this.todoData = this.todoData.map((item:ITodoData)=>{
      if(id === item.id){
        item.completed =  !item.completed 
        this.changeCompleted(target,item.completed)
      }
      return item
    })
  }
}

export default TodoEvent;
