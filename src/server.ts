import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import paginate from "express-paginate";
import passport from "passport";
import { connect } from "mongoose";
import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;


dotenv.config();

const limit = Number(process.env.LIMIT);
const max_limit = Number(process.env.MAX_LIMIT);
const dbUrl = String(process.env.MONGO_DB)

const app: express.Application = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(paginate.middleware(limit, max_limit));

app.get("/kevin", async function (req: Request, res: Response) {
    res.send("This is server")
});

const runApp = async () => {
    try {
        await connect(dbUrl, {
            //useFindAndModify: false,
            //useUnifiedTopology: true,
            //useNewUrlParser: true,
            //useCreateIndex: true
        });
        console.log(`successfully connected to database ${process.env.MONGO_DB}`);
        app.listen(process.env.PORT, () => {
            console.log(`Server started successfulyy on PORT ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error)
        runApp();
    }
};

runApp()

