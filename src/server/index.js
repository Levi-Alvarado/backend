import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import * as routes from './routes/index.js'

const PORT = process.env.PORT ?? 3_000
const app = express()

app.use(cors({
  origin: '*'
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(routes.users)
app.use(routes.publications)
app.use(routes.comments)
app.listen(PORT, () => console.log(`SERVER UP in URL: http://localhost:${PORT}`))

export default app
