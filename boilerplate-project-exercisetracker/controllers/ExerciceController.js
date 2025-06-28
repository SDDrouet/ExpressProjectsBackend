const ExerciseService = require('../services/ExerciceService');
const UserService = require('../services/UserService');

class ExerciseController {
    async createExercise(req, res) {
        const { description, duration, date } = req.body;
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(id);

            // asignar fecha si no se proporcionó
            const exerciseDate = date ? new Date(date) : new Date();

            const exercise = {
                description,
                duration: Number(duration),
                date: exerciseDate.toDateString(), // asegúrate del formato
                _id: user._id,
                username: user.username
            };

            await ExerciseService.createExercise(user.username, description, duration, exerciseDate);

            // luego:
            res.json(exercise);
        } catch (error) {
            console.error('Error creating exercise:', error);
            res.status(500).json({ error: 'Error creating exercise', details: error.message });
        }
    }

    async usersExercisesLogs(req, res) {
        const { id } = req.params;
        const { from, to, limit } = req.query;
        try {
            const user = await UserService.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const exercises = await ExerciseService.getExercisesByUserName(user.username, from, to, limit);
            const logs = exercises.map(e => ({
                description: e.description,
                duration: e.duration,
                date: e.date.toDateString()
                }));

                res.json({
                _id: user._id,
                username: user.username,
                count: logs.length,
                log: logs
                });
        } catch (error) {
            console.error('Error fetching user logs:', error);
            res.status(500).json({ error: 'Error fetching user logs', details: error.message });
        }
    }

}

module.exports = new ExerciseController();
