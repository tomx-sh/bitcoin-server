"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rpc;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RPC_USERNAME = process.env.RPC_USERNAME;
const RPC_PASSWORD = process.env.RPC_PASSWORD;
const RPC_URL = process.env.RPC_URL;
async function rpc(method, params = []) {
    if (!RPC_USERNAME || !RPC_PASSWORD || !RPC_URL) {
        return { error: { code: -1, message: 'RPC credentials or URL not set' }, result: null, id: '' };
    }
    try {
        // RPC call payload
        const data = {
            jsonrpc: "1.0",
            id: "curltest",
            method: method,
            params: params
        };
        const response = await fetch(RPC_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': 'Basic ' + Buffer.from(`${RPC_USERNAME}:${RPC_PASSWORD}`).toString('base64')
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        const errorString = error.message || 'Unknown error';
        return { error: { code: -1, message: errorString }, result: null, id: '' };
    }
}
