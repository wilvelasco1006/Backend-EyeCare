const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
    {
        points: { type: Number, required: true },
        correctAnswers: { type: Number, required: true },
        incorrectAnswers: { type: Number, required: true },
        userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},


    }, { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);