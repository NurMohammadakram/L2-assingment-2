import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/models/user/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routers
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('now deploying to versel');
});

export default app;
