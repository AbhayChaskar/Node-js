const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const controller = require('../controller/empController')
const jwt = require("jsonwebtoken");
const jwtSecret = "wewr32vsdfgswfvwuyd32gdiu";
// import {fetch} from '../controller/empController'

// const fs=require('fs')
// router.use(db);
//end
const employeemodel = require('../db/EmployeeSchema')

function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)

    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token Not match" })
            }
            else {
                console.log("Token Matched")
                next();
            }
        })
    }
}

const { check, validationResult } = require('express-validator');

router.get("/get", (req, res) => {
    //  router.use(fetch);
    controller.getPost()
    res.send("get post called")
})
router.post("/login", [
    check('name').isLength({ min: 3 }),

    check('mobile').isNumeric()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let name = req.body.name;
    let mobile = req.body.mobile;


    let payload = {
        uid: name
    }
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
    res.send({ "err": 0, "msg": "Login Success", "token": token })
    controller.login(name, mobile)
    // res.send("ok")
})
router.post("/post", [
    check('name').isLength({ min: 3 }),

    check('mobile').isNumeric()
], (req, res) => {
    //  router.use(fetch);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let name = req.body.name;
    let mobile = req.body.mobile

    controller.postdata(name, mobile)
    res.send("Data Added")
})
router.put("/update/:id", [
    check('name').isLength({ min: 3 }),

    check('mobile').isNumeric()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let id = req.params.id
    let name = req.body.name

    controller.editdata(id, name)
    res.send("Data updated")
})
router.delete("/delete/:id", (req, res) => {
    //  router.use(fetch);
    let id = req.params.id
    controller.deletedata(id)
    res.send("Data deleted")
})


module.exports = router;