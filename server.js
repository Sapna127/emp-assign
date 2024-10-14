import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(cors({
    origin: ['https://emppp.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

  
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
