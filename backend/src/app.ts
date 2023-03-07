import express from "express";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT as string || 3001;

app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;