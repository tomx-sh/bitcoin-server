import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import rpc from './rpc'
import dotenv from 'dotenv';


dotenv.config();
const app = new Hono()


// Middleware to check for the API key in the headers
app.use(async (c, next) => {
    if (process.env.NODE_ENV === 'development') return await next();
    const apiKey = c.req.header('x-api-key');
    if (apiKey !== process.env.API_KEY) return c.json({ error: 'Unauthorized' }, 401);
    await next();
});



app.get('/', (c) => {
    return c.text('Hello World!')
})

app.get('/get-blockchain-info', async (c) => {
    const result = await rpc('getblockchaininfo');
    return c.json(result);
});

app.get('get-network-info', async (c) => {
    const result = await rpc('getnetworkinfo');
    return c.json(result);
})






const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
