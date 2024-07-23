import * as express from "express"
import { Request, Response } from "express"
import { User } from "./user.entity.ts"
import { myDataSource } from "./databaseConnection.ts"
import helmet from "helmet"
const { body, validationResult } = require("express-validator");



const corsOpts = {
    origin: '*',
  
    methods: [
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
 
// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(helmet())
app.use(cors(corsOpts));

app.post("/api/userRegistration",
    
        [
          body("firstName").notEmpty().trim(),
          body("lastName").notEmpty().trim(),
          body("postCode").notEmpty().trim(),
          body("phoneNumber").notEmpty().trim(),
          body("email").isEmail().trim(),
        ],
        async (req, res) => {
            const errors = validationResult(req);
        
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
              }
              const user = await myDataSource.getRepository(User).create(req.body)
              const results = await myDataSource.getRepository(User).save(user)
              return res.status(200).json(results)
          }
        )


// start express server
app.listen(3000)

