import App from "./services/ExpressApp";
import express from 'express';
import DBConnection from "./services/Database";

const StartServer = async () => {
    const app = express()
    await DBConnection();
    await App(app);

    app.listen(8000, () => {
        console.log('Listening to port 8000')
    })
}
StartServer();