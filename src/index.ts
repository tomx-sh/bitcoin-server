import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';


dotenv.config();
const app = new Hono()

const RPC_USERNAME = process.env.RPC_USERNAME
const RPC_PASSWORD = process.env.RPC_PASSWORD
const RPC_URL = process.env.RPC_URL


app.get('/', (c) => {
    return c.text('Hello World!')
})

app.get('/get-blockchain-info', async (c) => {
    if (!RPC_USERNAME || !RPC_PASSWORD || !RPC_URL) {
        return c.json({ error: 'RPC credentials or URL not set' }, 500);
    }

    try {
        // Define the RPC call payload
        const data = {
            jsonrpc: "1.0",
            id: "curltest",
            method: "getblockchaininfo",
            params: []
        };

        // Make the request using fetch
        const response = await fetch(RPC_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': 'Basic ' + Buffer.from(`${RPC_USERNAME}:${RPC_PASSWORD}`).toString('base64')
            },
            body: JSON.stringify(data)
        });

        // Parse the response as JSON
        const result = await response.json();

        // Return the JSON response from the Bitcoin node
        return c.json(result);

    } catch (error) {
        // Handle any errors that occur during the request
        return c.json({ error: error }, 500);
    }
});








const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
