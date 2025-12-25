import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const email = "admin@astroveda.com";
        const password = "admin123";
        const adminData = {
            fullName: "Super Admin",
            email,
            phone: "9999999999",
            dateOfBirth: new Date("1990-01-01"),
            placeOfBirth: "New Delhi",
            role: "admin",
            agreeToTerms: true,
        };

        const user = await User.findOne({ email });

        if (user) {
            user.role = "admin";
            await user.save();
            console.log("Existing user updated to Admin role.");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                ...adminData,
                password: hashedPassword,
            });
            console.log("Admin user created successfully.");
        }

        console.log(`\nDefault Admin Credentials:\nEmail: ${email}\nPassword: ${password}\n`);
        process.exit();
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
