export interface IResponse<T>{
    code: "000" | "001",
    message:string,
    data:T
}