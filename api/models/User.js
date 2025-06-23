const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true, unique: true }, // UID de Firebase
        displayName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
