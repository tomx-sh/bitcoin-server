"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const rpc_1 = __importDefault(require("./rpc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new hono_1.Hono();
// Middleware to check for the API key in the headers
app.use(async (c, next) => {
    if (process.env.NODE_ENV === 'development')
        return await next();
    const apiKey = c.req.header('x-api-key');
    if (apiKey !== process.env.API_KEY)
        return c.json({ error: 'Unauthorized' }, 401);
    await next();
});
app.get('/', (c) => {
    return c.text('Hello World!');
});
app.get('/get-blockchain-info', async (c) => {
    const result = await (0, rpc_1.default)('getblockchaininfo');
    return c.json(result);
});
app.get('get-network-info', async (c) => {
    const result = await (0, rpc_1.default)('getnetworkinfo');
    return c.json(result);
});
app.get('/get-block-count', async (c) => {
    const result = await (0, rpc_1.default)('getblockcount');
    return c.json(result);
});
app.get('/get-block-hash', async (c) => {
    const param = c.req.query('blockHeight');
    if (!param)
        return c.json({ error: 'Block height is required' }, 400);
    const blockHeight = parseInt(param);
    const result = await (0, rpc_1.default)('getblockhash', [blockHeight]);
    return c.json(result);
});
app.get('/get-block', async (c) => {
    const param = c.req.query('blockHash');
    if (!param)
        return c.json({ error: 'Block hash is required' }, 400);
    const result = await (0, rpc_1.default)('getblock', [param]);
    return c.json(result);
});
app.get('/get-block-header', async (c) => {
    const param = c.req.query('blockHash');
    if (!param)
        return c.json({ error: 'Block hash is required' }, 400);
    const result = await (0, rpc_1.default)('getblockheader', [param]);
    return c.json(result);
});
app.get('/get-chain-tips', async (c) => {
    const result = await (0, rpc_1.default)('getchaintips');
    return c.json(result);
});
app.get('/get-difficulty', async (c) => {
    const result = await (0, rpc_1.default)('getdifficulty');
    return c.json(result);
});
app.get('/get-mempool-info', async (c) => {
    const result = await (0, rpc_1.default)('getmempoolinfo');
    return c.json(result);
});
app.get('/get-raw-mempool', async (c) => {
    const result = await (0, rpc_1.default)('getrawmempool');
    return c.json(result);
});
app.get('/get-mempool-entry', async (c) => {
    const param = c.req.query('txid');
    if (!param)
        return c.json({ error: 'Transaction ID is required' }, 400);
    const result = await (0, rpc_1.default)('getmempoolentry', [param]);
    return c.json(result);
});
app.get('/get-mempool-descendants', async (c) => {
    const param = c.req.query('txid');
    if (!param)
        return c.json({ error: 'Transaction ID is required' }, 400);
    const result = await (0, rpc_1.default)('getmempooldescendants', [param]);
    return c.json(result);
});
app.get('/get-mempool-ancestors', async (c) => {
    const param = c.req.query('txid');
    if (!param)
        return c.json({ error: 'Transaction ID is required' }, 400);
    const result = await (0, rpc_1.default)('getmempoolancestors', [param]);
    return c.json(result);
});
app.get('/get-tx-outset-info', async (c) => {
    const result = await (0, rpc_1.default)('gettxoutsetinfo');
    return c.json(result);
});
app.get('/get-best-block-hash', async (c) => {
    const result = await (0, rpc_1.default)('getbestblockhash');
    return c.json(result);
});
app.get('/get-raw-transaction', async (c) => {
    const param = c.req.query('txid');
    if (!param)
        return c.json({ error: 'Transaction ID is required' }, 400);
    const result = await (0, rpc_1.default)('getrawtransaction', [param]);
    return c.json(result);
});
app.get('/get-transaction', async (c) => {
    const param = c.req.query('txid');
    if (!param)
        return c.json({ error: 'Transaction ID is required' }, 400);
    const result = await (0, rpc_1.default)('gettransaction', [param]);
    return c.json(result);
});
app.get('/get-tx-out', async (c) => {
    const txid = c.req.query('txid');
    const n = c.req.query('n');
    if (!txid || !n)
        return c.json({ error: 'Transaction ID and n are required' }, 400);
    const result = await (0, rpc_1.default)('gettxout', [txid, parseInt(n)]);
    return c.json(result);
});
app.get('/decode-raw-transaction', async (c) => {
    const param = c.req.query('hex');
    if (!param)
        return c.json({ error: 'Hex is required' }, 400);
    const result = await (0, rpc_1.default)('decoderawtransaction', [param]);
    return c.json(result);
});
app.get('/get-connection-count', async (c) => {
    const result = await (0, rpc_1.default)('getconnectioncount');
    return c.json(result);
});
app.get('/get-peer-info', async (c) => {
    const result = await (0, rpc_1.default)('getpeerinfo');
    return c.json(result);
});
app.get('/estimate-smart-fee', async (c) => {
    const param = c.req.query('blocks');
    if (!param)
        return c.json({ error: 'Blocks is required' }, 400);
    const result = await (0, rpc_1.default)('estimatesmartfee', [parseInt(param)]);
    return c.json(result);
});
app.get('/get-mining-info', async (c) => {
    const result = await (0, rpc_1.default)('getmininginfo');
    return c.json(result);
});
app.get('/get-block-template', async (c) => {
    const result = await (0, rpc_1.default)('getblocktemplate');
    return c.json(result);
});
const port = 3000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
