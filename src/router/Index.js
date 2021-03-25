import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
// import multer from "multer";

import {
    RegCtrl
} from "../app/controllers";
import RegionsService from "../services/RegionsService";
// import path from "path";

const createRoutes = (app) => {
    const RegionController = new RegCtrl();
    //Services
    const RegionService = new RegionsService();
    const options = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: true,
        //origin: "*",
        optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
        preflightContinue: false
    };
    // set view engine
    app.set('views', '../views');
    app.set('view engine', 'ejs');

    app.use(cors());
    //enable pre-flight
    app.options("*", cors(options));

    //Load files via URL
    // app.use( express.static( '/uploads' ) );
    //app.use(express.static(__dirname + '/public'));
    // app.use('/images', express.static(__dirname + '/public'));

    //console.log(path.join(__dirname, 'public'))
    // parse application/json
    app.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // parse the raw data
    app.use(bodyParser.raw());
    // parse text
    app.use(bodyParser.text());

    app.get("/a", (_, res) => {
        res.send("Hello, World!");
    });

    app.get("/", RegionService.IndexService);
    app.get("/rerere", RegionService.indexFirstpage);
    app.get("/districts", RegionService.IndexDistricts);
    app.get("/quarters", RegionService.IndexQuarters);
    
    //CRUD
    app.post("/regions/add", RegionController.createData);
    app.get("/regions/list", RegionController.IndexData);
    app.get("/districts/list", RegionController.IndexDistricts);
    app.get("/quarters/list", RegionController.IndexQuarters);
    app.get("/get/districts/:id", RegionController.IndexDistrictsbyID);
    app.get("/get/districts/quarters/:id", RegionController.IndexQuarters);
    app.post("/regions/update/:id", RegionController.updateData);
    app.post("/regions/update/:id", RegionController.deleteData);

    app.get("/data/regions", RegionService.IndexService);
    app.get("/data/register", RegionService.IndexService);
    app.get("/data/register", RegionService.IndexService);
    // app.post("/user/login", loginValidation, AuthController.login);
    // app.get("/user/me", RegionController.getMe);
    // app.get("/user/all", RegionController.getAll);
    // app.put("/user/update/:id", RegionController.updateMe);
    // app.put("/user/change-password/:id", PassChangeValidation, RegionController.updatePassword);
    // app.delete("/user/rm", AuthController.rm);
    // app.delete("/user/delete/:id", RegionController.deleteData);
    // app.post("/admin/user/add", RegValidation, AuthController.adminAddUser);
};
export default createRoutes;