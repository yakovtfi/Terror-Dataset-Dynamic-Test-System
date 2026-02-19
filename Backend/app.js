import express from 'express';
import cors from 'cors';
import terrorRouter from './routes/terrorRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/terror', terrorRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
