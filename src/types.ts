export interface RpcResponse<T> {
    result: T | null;
    error: RpcError | null;
    id: string | number;
}

interface RpcError {
    code: number;
    message: string;
}