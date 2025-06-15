const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
    {
        points: { type: Number, required: true },
        correctAnswers: { type: Number, required: true },
        incorrectAnswers: { type: Number, required: true },
        userID: {
            type: String, // <--- CAMBIO AQUÍ: de mongoose.Schema.Types.ObjectId a String
            required: true
        },


    }, { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);