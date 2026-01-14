import { env } from '../env/index.js'

import open from 'open'
import { app } from './app.js'

const DOC_LINK = `http://localhost:${env.PORT}/docs`

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    if (env.NODE_ENV === 'dev') {
      console.log(`API docs open at ${DOC_LINK}`)
      open(DOC_LINK)
    }
    console.log(`Server is running on http://localhost:${env.PORT}`)
  })
