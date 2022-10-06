import 'reflect-metadata'
import express from 'express'
import createConnetion from './database'
import { router } from './routes'

createConnetion()
const app = express()

app.use(express.json())
app.use(router)

export { app }