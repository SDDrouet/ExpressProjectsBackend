const Exercises = require('../models/Excercices');


class ExerciseService {
    async createExercise(username, description, duration, date) {
        const exercise = new Exercises({ username, description, duration, date });
        return await exercise.save();
    }

    async getExerciseById(exerciseId) {
        return await Exercises.findById(exerciseId);
    }

    async getAllExercises() {
        return await Exercises.find({});
    }

    async deleteExercise(exerciseId) {
        return await Exercises.findByIdAndDelete(exerciseId);
    }

    async getExercisesByUserName(username, from, to, limit) {
        const query = { username };
        if (from) {
            query.date = { ...query.date, $gte: new Date(from) };
        }
        if (to) {
            query.date = { ...query.date, $lte: new Date(to) };
        }
        return await Exercises.find(query).limit(limit);
    }
}

module.exports = new ExerciseService();
