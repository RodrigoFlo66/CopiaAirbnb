const { Router } = require("express");
const pool = require("../db");
const router = Router();

const { 
    getAllResid,
    deleteResid,
    getResid,
    getImgResid,
    createResid,
    getServ,
    updateResid,
    uploadImg, 
    getResidUsr
} = require("../controllers/resid.controller");
const { 
    getrent,
    getevalu,
    createRent,
    createEvalu,
    createUsuario,
    getUsuario,
    getrentUser,
    getrentResid,
    getEvaUser,
    createEvaluUser,
    updateRent
} = require("../controllers/rent.controller");

router.post('/api/upload', uploadImg);

router.get("/resid", getAllResid);
router.get("/resid/usuario/:codUsuario", getResidUsr);
router.get("/resid/:idResid", getResid);
router.delete("/resid/:idResid", deleteResid);
router.post('/resid/:codUsuario', createResid);
router.put('/resid/:idResid', updateResid);

router.get("/serv/:idResid", getServ);
router.get("/image/:idResid", getImgResid);

router.get("/resid/rent/:codUsuario", getrentResid); //para tabla de Richard
router.get("/resid/rent/user/:codUsuario", getrent); //para historial de reservas de un usuario
router.get("/rent/user/:idResid", getrentUser); //para controlar fechas
router.post("/rent/:idResid/:codUsuario", createRent);
router.put("/rent/:idRent/:idResid", updateRent);

router.get("/evalu/:idResid", getevalu);
router.post("/evalu/:idResid/:codUsuario/:idRent", createEvalu);

router.get("/usr/:codUsuario", getUsuario);
router.post("/usr", createUsuario);

router.get("/user/evalu/:codUsuario", getEvaUser);
router.post("/user/evalu/:codUsuario", createEvaluUser);
module.exports = router;