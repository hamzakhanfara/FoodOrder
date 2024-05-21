import express, {Request, Response, NextFunction} from "express";
import { CreateVandor } from "../controllers/AdminController";
const router = express.Router();

router.post('/vandor', CreateVandor)

router.get('/', (req: Request, res:Response, next: NextFunction) =>{
    res.json({message: "hello from Admin"})
})



export {router as AdminRoute}