// Ex:
import axios from "axios";

class DistrictsService {

    /**
     * Get Regions list
     * @param {*} req 
     * @param {*} res 
     */
    IndexService = async (req, res) => {
        axios.get("http://localhost:3003/district/list", { /** params: { id: req.query.id } */ })
            .then(function (data) {
                res.render("districts", { districts: data.data });
            })
            .catch(err => {
                res.send(err);
            });
    };
}
export default DistrictsService;
