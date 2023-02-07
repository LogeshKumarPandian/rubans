const express = require('express')
const { kpi, kpiValue } = require('../controllers/dashboardController.js')

const router = express.Router()

router.post("/kpi", kpi)
router.post("/kpiValue", kpiValue)

module.exports = router
