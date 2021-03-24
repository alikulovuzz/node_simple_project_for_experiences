import mongoose from "mongoose";

mongoose.connect(
    //mongodb+srv://farm_users:3FvNdPsXgsw2HOod@cluster0.i6hrx.mongodb.net/test
    //"mongodb://localhost:27017/farmluxdatabase",
    "mongodb://localhost:27017/UzbekistanDB",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            throw Error(err);
        }
        console.log('connect DB')
    }
);