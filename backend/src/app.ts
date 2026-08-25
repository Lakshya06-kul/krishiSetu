import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth.routes';
import lotRoutes from './routes/lot.routes';

// Routes will be mounted here
app.use('/auth', authRoutes);
app.use('/lots', lotRoutes);

app.get('/', (req, res) => {
  res.send('AgriLink API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
