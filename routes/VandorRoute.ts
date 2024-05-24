import express, {Request, Response, NextFunction} from "express";
import { AddFood, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } from "../controllers";
import { Authenticate } from "../middlewares/CommonAuth";
const router = express.Router();

router.post('/login', VandorLogin);
router.use(Authenticate);
router.get('/profile', GetVandorProfile);
router.patch('/profile',UpdateVandorProfile);
router.patch('/service', UpdateVandorService);

router.post('/food', AddFood);
router.get('/foods');

router.get('/', (req: Request, res:Response, next: NextFunction) =>{
    res.json({message: "hello from Vandor"})
})


export {router as VandorRoute}