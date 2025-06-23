const Quiz = require("../models/Quiz");
const User = require("../models/User");

class QuizDAO {
    constructor() {
        this.model = Quiz;
    }

    async create(req, res) {
        try {
            const document = new this.model(req.body);
            await document.save();
            res.status(201).json(document);
        } catch (error) {
            res.status(500).json({ message: `Error creating document: ${error.message}` });
        }
    }

    async getAll(req, res) {
        try {
            // Obtener todos los quices ordenados por puntos descendente
            const quizzes = await this.model.find().sort({ points: -1 });

            // Obtener todos los UID únicos
            const userUIDs = [...new Set(quizzes.map(q => q.userID))];

            // Buscar usuarios relacionados por UID (que debe estar guardado en la DB)
            const users = await User.find({ uid: { $in: userUIDs } });

            // Crear un mapa de UID -> usuario
            const userMap = {};
            users.forEach(user => {
                userMap[user.uid] = user;
            });

            // Combinar la información de cada quiz con su usuario
            const result = quizzes.map(quiz => ({
                ...quiz.toObject(),
                user: userMap[quiz.userID] || null
            }));

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: `Error fetching documents: ${error.message}` });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await this.model.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedItem) {
                return res.status(404).json({ message: "Document not found" });
            }
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: `Error updating document: ${error.message}` });
        }
    }
}

module.exports = QuizDAO;
