import express from 'express'
import cors from 'cors'
import { SETTINGS } from "./settings";
import { videoRouter } from "./videos";
import { setDB } from "./db/db";
import { testingRouter } from "./testing/router/testingRouter";

export const app = express()
app.use(express.json())
app.use(cors())

app.use(SETTINGS.PATH.VIDEOS, videoRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)

app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})
