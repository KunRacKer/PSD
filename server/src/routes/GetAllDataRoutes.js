const express = require("express");
const Route = express.Router()
const GetAllDataController = require("../controller/GetAllDataController")

Route.get("/api/get/all/data",GetAllDataController.get)

module.exports = Route