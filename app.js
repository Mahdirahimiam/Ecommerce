import express from 'express'
import cors from 'cors'
import {fileURLToPath} from 'url'
import path, { dirname } from 'path'
import morgan from 'morgan'
const app =express()
const __filename=fileURLToPath(import.meta.url)
export const __dirname=path.dirname(__filename)
app.use(express.json())
app.use(express.static('Public'))
app.use(cors())
app.use(morgan('dev'))









export default app