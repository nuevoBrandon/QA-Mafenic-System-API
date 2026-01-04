export interface IResponse<T>{
    code: "000" | "001",
    message:string,
    data:T
}

export interface ITicket {
  estado?: string;
  prioridad?: string;
  tipo?: string;
  activo?: boolean; 
}