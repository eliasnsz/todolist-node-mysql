import express from "express";
import cors from 'cors';

const app = express();
const PORT = 3001;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());
app.listen(PORT, HOST, () => console.log(`Server listening on port ${PORT}`));

export default app;