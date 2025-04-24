import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import testRoute from './routes/test.route';

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

app.use('/', testRoute)
app.get('/direct', (req, res) => {
  console.log('Direct route')
  res.send('Direct route works')
})

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
