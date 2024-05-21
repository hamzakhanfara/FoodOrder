import express from "express";
import { AdminRoute, VandorRoute } from "./routes";
const app = express();

app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);

app.listen(8000, () => {
    console.clear();
    console.log("App is listening to port 8000")
})