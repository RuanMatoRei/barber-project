// backend/src/server.ts
import { app } from './app.js'

const port = Number(process.env.PORT) || 3333;

app.listen({ port }).then(() => {
    console.log(`Server is running on http://localhost:${port}`);
});