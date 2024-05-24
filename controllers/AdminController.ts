import express, {Request, Response, NextFunction} from "express";
import { CreateVandorInput } from "../dto/Vandor.dto";
import { Vandor } from "../models";
import { GenerateSalt, GeneratePassword } from "../utility";

export const FindVandor = async(id:string | undefined, email?: string) =>{
    if(email){
        const existingVandor= await Vandor.findOne({email: email});
        return existingVandor
    }else{
        const existingVandor= await Vandor.findById(id);
        return existingVandor
    }
}

export const CreateVandor = async (req:Request, res:Response, next:NextFunction) => {
    const {name, address, pincode, foodType,email,password,ownerName,phone} = <CreateVandorInput>req.body;
    
    const existingVandor= await FindVandor(undefined,email)
    
    if(existingVandor !== null ){
        return res.json({"message": "A Vandor is existing with this email ID"})
    }

    //generate a Salt
    // encrypt the passwod using the Salt
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt)

    const createdVandor = await Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password:userPassword,
        ownerName: ownerName,
        phone: phone,
        salt: salt,
        serviceAvailable: false,
        coverImages: [],
    })
    return res.json(createdVandor)
}
export const GetVandors = async (req:Request, res:Response, next:NextFunction) => {
    
    const vandors = await Vandor.find()
    if(vandors !== null){
        return res.json(vandors)
    }
    return res.json({"message": "Vandors data not available"})
}
export const GetVandorByID = async (req:Request, res:Response, next:NextFunction) => {
    
    const vandorId = req.params.id;
    const vandor = await FindVandor(vandorId)
    if(vandor !== null){
        return res.json(vandor)
    }
    return res.json({"message": "Vandor with this id do not exist"})
}