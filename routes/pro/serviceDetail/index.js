import express from "express";



import cancelledBooking from "./bookedServiceCancel.js";
import completedBookedService from "./bookedServiceCompleted.js";



const router = express.Router();





///--------On going cancelbooking Remove get (created,requested,accepted services)------///
router.put("/:id", cancelledBooking);

///--------On going cancelbooking Remove get (created,requested,accepted services)------///
router.put("/completed/:id", completedBookedService);




export default router;
