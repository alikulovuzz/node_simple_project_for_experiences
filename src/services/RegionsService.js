// Ex:
import axios from "axios";

class RegionsService {

    /**
     * Get Regions list
     * @param {*} req 
     * @param {*} res 
     */
    IndexService = async (req, res) => {
        axios.get("http://localhost:3003/regions/list", { /** params: { id: req.query.id } */ })
            .then(function (data) {
                res.render("regions", { regions: data.data });
            })
            .catch(err => {
                res.send(err);
            });
    };
    IndexDistricts = async (req, res) => {
        axios.get("http://localhost:3003/districts/list", { /** params: { id: req.query.id } */ })
            .then(function (data) {
                    res.render("district", { district: data.data });
                })
            .catch(err => {
                res.send(err);
            });
    };
}
export default RegionsService;
