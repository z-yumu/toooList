import { ITodoData } from "./js/typing";
import TodoEvent from "./js/TodoEvent";

// 立即执行函数
;((doc) => {
  // console.log(doc,'===========>外层括号传进来的参数');
  // !(后面的叹号)类型排除空
  const oInput: HTMLInputElement  = document.querySelector("input")!
  const oButton: HTMLButtonElement= document.querySelector("button")!
  const todoList: HTMLElement = document.querySelector(".list")!

  const todoData: Array<ITodoData> = [
    // {
    //   id: 1,
    //   content: "111",
    //   completed: false,
    // },
    // {
    //   id: 2,
    //   content: "222",
    //   completed: false,
    // },
    // {
    //   id: 1,
    //   content: "333",
    //   completed: true,
    // },
  ];

  // document.createDocumentFragment()是用来创建一个虚拟的节点对象

  const todoEvent: TodoEvent = new TodoEvent(todoData,todoList);

  const init = (): void => {
    bindEvent();
  };
    // 事件代理
  function bindEvent(): void {
    // 第三个参数 false - 事件在冒泡阶段执行，默认是false
    oButton.addEventListener("click", handleBtnClick, false);
    todoList.addEventListener("click", handleListClick, false);
  }

  function handleBtnClick(): void {
    const val:string = oInput.value.trim()
    if(val.length){
      const res = todoEvent.addTodo(<ITodoData>{
        id: new Date().getTime(),
        content:val,
        completed: false,
      });

    // 这里是引用，所以当TodoEvent的todoData改变时，这里的todoData也改变了
    // console.log(todoData);

      if(res && res === 1001){
        alert('已存在')
      }
    }

  }

  function handleListClick(e: MouseEvent): void {
    const tar = e.target as HTMLElement;
    const tarName= tar.tagName
    switch (tarName) {
      case "INPUT":
      todoEvent.changeCompleted(tar,(tar as HTMLInputElement)?.checked)
        break;
      case "BUTTON":
      // 删除
      todoEvent.removeTodo(tar,Number(tar?.dataset.id))
        break;
      default:
        break;
    }
  }

  init()

})(document);
