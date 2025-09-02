// routes/BookingRoutes.js (or Routes/BookingRoutes.js)
import express from "express";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// import Booking from "../models/Booking.js"; // oyā DB model eke path eka add karapan

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// ---- LIST BOOKINGS (frontend getBookings() call karanawa) ----
router.get("/", async (req, res, next) => {
  try {
    const { from, to, page = 1, limit = 50, search = "" } = req.query;

    // TODO: oyāge DB query eken data ganna. Danata demo empty array ekak.
    const rows = []; // await Booking.find(...).populate('package').sort({createdAt:-1}).skip(...).limit(...)

    res.json({ rows });
  } catch (e) { next(e); }
});

// ---- ANALYTICS (frontend getAnalytics() call karanawa) ----
router.get("/analytics", async (req, res, next) => {
  try {
    const { period = "monthly", from, to } = req.query;

    // TODO: oyāge aggregation eka danna. Danata demo data:
    const data = [
      // { periodStart: new Date("2025-09-01"), count: 0, totalVisitors: 0, totalSales: 0 }
    ];

    res.json({ data });
  } catch (e) { next(e); }
});

// ---- REPORT PDF (frontend downloadReport() call karanawa) ----
router.get("/report", async (req, res, next) => {
  try {
    const { period = "monthly", from = "", to = "" } = req.query;

    // ensure reports dir
    const reportsDir = path.join(__dirname, "..", "reports");
    await fs.promises.mkdir(reportsDir, { recursive: true });

    const fileName = `report-${Date.now()}.pdf`;
    const filePath = path.join(reportsDir, fileName);

    // create pdf
    const doc = new PDFDocument({ size: "A4", margin: 36 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // header
    doc.fontSize(18).text("Bookings Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Period: ${period}`);
    doc.text(`From: ${from || "-"}`);
    doc.text(`To: ${to || "-"}`);
    doc.moveDown();

    // data rows — replace with real DB data
    // const rows = await Booking.find(...filter by from/to...).populate('package').sort({ createdAt: -1 }).limit(500);
    const rows = [];

    if (rows.length === 0) {
      doc.text("No bookings for selected period.");
    } else {
      rows.forEach((r) => {
        const date = new Date(r.createdAt).toISOString().slice(0, 10);
        const dest = r.package?.destination || "-";
        const price = Number(r.price || 0).toLocaleString();
        doc.text(`${date}  |  ${r.name}  |  ${dest}  |  Rs. ${price}`);
      });
    }

    doc.end();

    stream.on("finish", () => res.json({ url: `/reports/${fileName}` }));
    stream.on("error", next);
  } catch (e) { next(e); }
});

export default router;
