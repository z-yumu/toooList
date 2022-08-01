export interface ITodoData{
    id:number,
    content:string,
    completed:boolean
}

export interface  IResponse<T = unknown>{
    code:number,
    message:string,
    data?:T[] 
}