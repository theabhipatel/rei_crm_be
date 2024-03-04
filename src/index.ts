import express from 'express'
import { errorHandler } from './middlewares/errorHandler'
import router from './routes'
import cors from 'cors'

const app = express()

/** ---> registering middlewares */
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


/** ---> handling home route. */
app.get('/', (req, res)=> {
res.status(200).json({success:true, message:"Welcome to REI-CRM home api."})
})

/** ---> handling all routes. */
app.use('/api/v1', router)

/** ---> handling not found page. */
app.use('*', (req, res ) => {
    res.status(404).json({success:false, message:"Route not found."})
})

/** ---> handling errors globally. */
app.use(errorHandler)

/** ---> listening server and making connection to database. */
app.listen(3000, ()=> {
    console.log(`server is runnig at http://127.0.0.1:3000`)
})