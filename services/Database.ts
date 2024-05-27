import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URI } from "../config";
import path from 'path';

export default async () => {
    try{
        await mongoose.connect(MONGO_URI)

        console.log('DB Connected..')
    } catch(ex) {
        console.log(ex)
    }
}
