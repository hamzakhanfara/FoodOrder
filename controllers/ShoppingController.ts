import express, { Request, Response, NextFunction } from 'express';
import { FoodDoc, Vandor } from '../models';

export const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode;
    const result = await Vandor.find({ pincode: pincode, serviceAvailable: false})
}
export const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {
}


export const GetFoodsIn30Min = async (req: Request, res: Response, next: NextFunction) => {
}


export const SearchFoods = async (req: Request, res: Response, next: NextFunction) => {
}


export const RestaurantById = async (req: Request, res: Response, next: NextFunction) => {
}


export const GetAvailableOffers = async (req: Request, res: Response, next: NextFunction) => {
}