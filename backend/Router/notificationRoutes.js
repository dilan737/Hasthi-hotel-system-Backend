// const express = require('express');
// const router = express.Router();
// const notificationModel = require('../Model/notificationModel')
// const notificationController = require('../Controlers/notificationController')

// router.post('/', notificationController.createNotification);
// router.get('/', notificationController.getAllNotifications);
// router.get('/:id', notificationController.getNotificationById);
// router.put('/:id', notificationController.updateNotification);
// router.delete('/:id', notificationController.deleteNotification);

// module.exports = router;

import { Router } from "express";
import notificationModel from "../Model/notificationModel.js";
import notificationController from "../Controllers/notificationController.js";

const router = Router();

router.post("/", notificationController.createNotification);
router.get("/", notificationController.getAllNotifications);
router.get("/:id", notificationController.getNotificationById);
router.put("/:id", notificationController.updateNotification);
router.delete("/:id", notificationController.deleteNotification);

export default router; // <-- default export

