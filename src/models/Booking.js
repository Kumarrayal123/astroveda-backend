import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userName: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
            required: true
        },
        serviceType: {
            type: String,
            required: true,
            enum: ["Astrology", "Palmistry", "Numerology", "Vastu", "Tantra", "Horoscope"],
        },
        bookingDate: {
            type: Date,
            required: true,
        },
        bookingTime: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending",
        },
        fee: {
            type: Number,
            required: true
        },
        paymentId: {
            type: String, // Ideally from Payment Gateway
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Booking", bookingSchema);
