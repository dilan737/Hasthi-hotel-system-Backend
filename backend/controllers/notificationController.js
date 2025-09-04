import Notification from "../Model/notificationModel.js";

// Create Notification
export async function createNotification(req, res) {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json({ success: true, data: notification });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get All Notifications
export async function getAllNotifications(req, res) {
    try {
        const notifications = await Notification.find().sort({ created_at: -1 });
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Notification by ID
export async function getNotificationById(req, res) {
    try {
        const notification = await Notification.findOne({ notification_id: req.params.id });
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Notification
export async function updateNotification(req, res) {
    try {
        const notification = await Notification.findOneAndUpdate(
            { notification_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete Notification
export async function deleteNotification(req, res) {
    try {
        const notification = await Notification.findOneAndDelete({ notification_id: req.params.id });
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }
        res.status(200).json({ success: true, message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};

