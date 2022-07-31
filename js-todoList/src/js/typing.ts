export interface ITodoData{
    id:number,
    content:string,
    completed:boolean
}

export interface  IResponse<T>{
    code:number,
    message:string,
    data?:T[]
}