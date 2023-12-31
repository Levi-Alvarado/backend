import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import * as routes from './routes/index.js'

const PORT = process.env.PORT ?? 3_000
const app = express()

app.use(cors({
  origin: '*'
}))
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(routes.users)
app.use(routes.publications)
app.use(routes.comments)
app.listen(PORT, () => console.log(`SERVER UP in URL: http://localhost:${PORT}`))

/* get errors middleware */
app.use((err, req, res, next) => {
  console.log('🦄 -> file: index.js:59 -> err', err)
  res.status(500).send('Something broke!')
})

export default app
