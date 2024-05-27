import {Request, Response, NextFunction, request, response} from 'express'
import { EditVandorInputs, VandorLoginInputs } from '../dto/Vandor.dto'
import { FindVandor } from './AdminController';
import { GeneratePassword, GenerateSignature, ValidatePassword } from '../utility';
import { Food, Vandor } from "../models";
import { CreateFoodInputs } from '../dto/Food.dto';

export const VandorLogin = async (req: Request, res:Response, next:NextFunction) => {
    const { email, password } = req.body as VandorLoginInputs;
    const existingVandor = await FindVandor(undefined, email); // Attendre la promesse ici
    if(existingVandor !== null){
        // validation and give access
        const vandorPassword = await existingVandor.password as unknown as string;
        const vandorSalt = await existingVandor.salt as unknown as string;
        const vandorEmail = await existingVandor.email as unknown as string;
        const vandorName = await existingVandor.name as unknown as string;
        const vandorFoodType = await existingVandor.foodType as [unknown] as [string];
        console.log(vandorPassword, vandorSalt)
        const validation = await ValidatePassword(password, vandorPassword, vandorSalt);
        if(validation){
            const signature = await GenerateSignature({
                _id: existingVandor.id,
                email: vandorEmail,
                foodTypes: vandorFoodType,
                name: vandorName
            })
            
            return res.json(signature)
        }else{
            return res.json({"message":"Password is not valid"})
        }
    }
    return res.json({"message":"Login credentials not valid"})
}
export const GetVandorProfile = async (req: Request, res:Response, next: NextFunction) =>{
    const user = req.user;
    if(user){
        const existingVandor = await FindVandor(user._id)
        return res.json(existingVandor)
    }
    return res.json({"message": "Vandor information not found"})
}
export const UpdateVandorCoverImage = async (req: Request, res:Response, next: NextFunction) =>{
    const user = req.user;
    if(user){
        const vandor = await FindVandor(user._id)
        if(vandor !== null){

            const files = req.files as [Express.Multer.File]
            const images  = files.map((file: Express.Multer.File) => file.filename);
            vandor.coverImages.push(...images);
            const result = await vandor.save();
            return res.json(result);
        }
    }
    return res.json({"message": "Vandor information not found"})
}
export const UpdateVandorProfile = async (req: Request, res:Response, next: NextFunction) =>{
    const {foodTypes, name, address, phone} = <EditVandorInputs>req.body;
    const user = req.user;
    if(user){
        const existingVandor = await FindVandor(user._id)
        if(existingVandor !== null){
            existingVandor.name = name;
            existingVandor.address = address;
            existingVandor.phone = phone;
            existingVandor.foodType = foodTypes;
            const savedResult = await existingVandor.save()
            return res.json(savedResult);
        }
        return res.json(existingVandor)
    }
    return res.json({"message": "Vandor information not found"})
}
export const UpdateVandorService = async (req: Request, res:Response, next: NextFunction) =>{
    const user = req.user;
    if(user){
        const existingVandor = await FindVandor(user._id)
        if(existingVandor !== null){
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            const savedResult = await existingVandor.save()
            return res.json(savedResult);
        }
        return res.json(existingVandor)
    }
    return res.json({"message": "Vandor information not found"})
}
export const AddFood = async (req: Request, res:Response, next: NextFunction) =>{
    const user = req.user;
    if(user){
        const {name, description, category, foodType, readyTime, price } = <CreateFoodInputs>req.body;
        const vandor = await FindVandor(user._id)
        if(vandor !== null){

            const files = req.files as [Express.Multer.File]
            const images  = files.map((file: Express.Multer.File) => file.filename);
            const createdFood = await Food.create({
                vandorId: vandor._id,
                name: name,
                description: description,
                category: category,
                price: price,
                rating: 0,
                readyTime: readyTime,
                foodType: foodType,
                images: images,
                foods: []
            })
            vandor.foods.push(createdFood);
            const result = await vandor.save();
            return res.json(result);
        }
    }
    return res.json({"message": "Vandor information not found"})
}
export const GetFoods = async (req: Request, res:Response, next: NextFunction) =>{
    const user = req.user;
    if(user){
        const foods = await  Food.find({vandorId: user._id})
        if(foods !== null){
            return res.json(foods)
        }
    }
    return res.json({"message": "Vandor information not found"})
}