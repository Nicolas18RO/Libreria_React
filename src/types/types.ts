
export interface apiResponse <T>{
    success: boolean;
    detail: string;
    data: T;
}