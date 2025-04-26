import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import testRoute from './routes/test.route';
import authRoutes from './routes/auth.routes'
dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())

app.use('/', testRoute)
app.use('/api/auth', authRoutes)
app.get('/direct', (req, res) => {
  console.log('Direct route')
  res.send('Direct route works')
})

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
