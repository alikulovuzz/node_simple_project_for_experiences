//  import { Request, Response } from "express";
// import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { DistrictModel, RegionModel,QuertertModel } from "../models/Index";

class RegionController {

    /**
     *  Add a new Country
     * @param req 
     * @param res 
     */
    createData = async (req, res) => {
        const data = {
            name_uz: req.body.name_uz,
            name_ru: req.body.name_ru,
            name_oz: req.body.name_oz,
            added_by: req.body.added_by
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                status: "Error",
                name_ru: 10022,
                message: {
                    en: "Something went wrong! Please try again!",
                    uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                    ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                },
                error: errors,
            });
        }
        try {
            const dataAdd = new RegionModel(data);
            await dataAdd
                .save()
                .then(async (obj) => {
                    // Return response
                    res.redirect("/data/regions");
                    // res.render("regions", {
                    //     success: true, 
                    //     message: "Ma'lumot: " + obj.name_uz + " yuklandi, Administratorlar tomonidan ko'rib chiqiladi!" 
                    // });
                    // res.status(200).json({
                    //     status: "Success",
                    //     data: obj
                    // });
                })
                .catch((reason) => {
                    if (reason.errors["name_uz"].message) {
                        res.status(500).json({
                            status: "Error",
                            name_ru: 10001,
                            message: {
                                en: reason.errors["name_uz"].message,
                                uz: "Номи талаб қилинади!",
                                ru: "Название обязательно",
                            },
                        });
                    }
                    else {
                        res.status(500).json({
                            status: "Error",
                            name_ru: 10000,
                            message: {
                                en: "Something went wrong! Please try again!",
                                uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                                ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                            },
                            error: error,
                        });
                    }
                });
        } catch (error) {
            res.status(500).json({
                status: "Error",
                name_ru: 10000,
                message: {
                    en: "Something went wrong! Please try again!",
                    uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                    ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                },
                error: error,
            });
        }
    };

    /**
     * Get Regions list
     * @param {*} req 
     * @param {*} res 
     */
    IndexData = async (req, res) => {

        RegionModel.find({
            // is_active: isActive,
        })
            .sort({ name_uz: 1 })
            .exec(function (err, data) {
                if (err) {
                    return res.status(404).json({
                        status: "Error",
                        name_ru: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Данные не найдены!",
                        },
                    });
                }
                return res.send(data);
                // return res.json({
                //     status: "Success",
                //     data: data
                // });
            });
    };
    IndexDistricts = async (req, res) => {

        DistrictModel.find({
            // is_active: isActive,
        })
            .sort({ name_uz: 1 })
            .exec(function (err, data) {
                if (err) {
                    return res.status(404).json({
                        status: "Error",
                        name_ru: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Данные не найдены!",
                        },
                    });
                }
                return res.send(data);
                // return res.json({
                //     status: "Success",
                //     data: data
                // });
            });
    };
    IndexQuarters = async (req, res) => {

        QuertertModel.find({
            // is_active: isActive,
        })
            .sort({ name_uz: 1 })
            .limit(100)
            .exec(function (err, data) {
                if (err) {
                    return res.status(404).json({
                        status: "Error",
                        name_ru: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Данные не найдены!",
                        },
                    });
                }
                return res.send(data);
                // return res.json({
                //     status: "Success",
                //     data: data
                // });
            });
    };
    IndexDistrictsbyID = async (req, res) => {
        DistrictModel.aggregate([
            {$match: { region_id: {$eq: req.params.id } } }
        ])
            .sort({ name_uz: 1 })
            .exec(function (err, data) {
                if (err) {
                    return res.status(404).json({
                        status: "Error",
                        name_ru: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Данные не найдены!",
                        },
                    });
                }
                return res.render("regions", { regions: data });
                //return res.send(data);

                // return res.json({
                //     status: "Success",
                //     data: data
                // });
            });
    };
    // IndexQuarters = async (req, res) => {
    //     QuertertModel.aggregate([
    //         {$match: { district_id: {$eq: req.params.id } } }
    //     ])
    //         .sort({ name_uz: 1 })
    //         .exec(function (err, data) {
    //             if (err) {
    //                 return res.status(404).json({
    //                     status: "Error",
    //                     name_ru: 10004,
    //                     message: {
    //                         en: "No information found!",
    //                         uz: "Маълумот топилмади!",
    //                         ru: "Данные не найдены!",
    //                     },
    //                 });
    //             }
    //             return res.render("regions", { regions: data });
    //             //return res.send(data);

    //             // return res.json({
    //             //     status: "Success",
    //             //     data: data
    //             // });
    //         });
    // };


    /**
     * PUT Update info
     * @param req 
     * @param res 
     */

    updateData = async (req, res) => {
        const id = req.params.id;
        // console.log(id);
        // console.log(req.body.name_uz);
        RegionModel.updateMany({
            "_id": id
        },{
            "name_oz":req.body.name_oz,
            "name_uz":req.body.name_uz,
            "name_ru":req.body.name_ru
        })
            .then((msg) => {
                if (!msg) {
                    // after all send a 204 - no content but accepted response
                    res.status(404).json({
                        status: "Error",
                        code: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Страна не найдена",
                        },
                    });
                }
                // after all send a 204 - no content but accepted response
                // Return response
                // console.log();
                res.redirect("/data/regions");
            })
            .catch((err) => {
                if (err) {
                    return res.status(500).json({
                        status: "Error",
                        code: 10000,
                        message: {
                            en: "Something went wrong! Please try again!",
                            uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                            ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                        },
                        error: err,
                    });
                }
            });
    };
    /**
     * Delete  info
     * @param req 
     * @param res 
     */

     deleteData = async (req, res) => {
        const id = req.params.id;
        console.log(id);
        RegionModel.findOneAndRemove({"_id": id}, { new: true, })
            .then((msg) => {
                if (!msg) {
                    // after all send a 204 - no content but accepted response
                    res.status(404).json({
                        status: "Error",
                        code: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Страна не найдена",
                        },
                    });
                }
                // after all send a 204 - no content but accepted response
                // Return response
                res.redirect("/");
            })
            .catch((err) => {
                if (err) {
                    return res.status(500).json({
                        status: "Error",
                        code: 10000,
                        message: {
                            en: "Something went wrong! Please try again!",
                            uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                            ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                        },
                        error: err,
                    });
                }
            });
    };    
}
export default RegionController;
