import mongoose from "mongoose";
import schemaType from "../../types/index.js";

const serviceDetailSchema = new mongoose.Schema(
  {
    userId: { type: schemaType.TypeObjectId ,ref:"user"},
    professsionalId: { type: schemaType.TypeObjectId,ref:"user" },
    bookServiceId: { type: schemaType.TypeObjectId,ref:"userBookServ" },
    proServiceId: { type: schemaType.TypeObjectId,ref:"proBookingService" },
    videoRoomName: { type: schemaType.TypeString },
    chatChannelName: { type: schemaType.TypeString },
    token: { type: schemaType.TypeString },
    created_date: {
      type: schemaType.TypeDate,
      default: Date.now,
    },
    status: {
      type: schemaType.TypeString,
      enum: ["Booked"],
      default: "Booked",
    },
  },
  { timestamps: true }
);

export default serviceDetailSchema;

