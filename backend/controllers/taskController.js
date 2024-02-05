const { tasksModel } = require("../models/tasksModel");
const { listsModel, listsSchema } = require("../models/listsModel");

const taskController = {

    create: async(req, res) => {
        try {
            const listName = req.body.list.name;
            const existingList = await listsModel.findOne({ name: listName });

            if (!existingList) {
                return res.status(400).json({ msg: "A lista especificada não existe." });
            }

            const task = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                list: existingList,
            };

            const response = await tasksModel.create(task);
            res.status(201).json({response, msg: "Tarefa criada com sucesso!"});

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor." });
        }
    },
    getAll: async(req, res) => {
        try {
            const tasks = await tasksModel.find();
            res.json(tasks);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor." });
        }
    },
    get: async(req, res) => {
        try {
            const id = req.params.id;
            const task = await tasksModel.findById(id);

            if(!task) {
                res.status(404).json({msg: "Tarefa não encontrada"});
                return;
            }

            res.json(task);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor." });
        }
    },
    delete: async(req, res) => {
        try {
            const id = req.params.id;
            const task = await tasksModel.findById(id);

            if(!task) {
                res.status(404).json({msg: "Tarefa não encontrada"});
                return;
            }

            const deletedTask = await tasksModel.findByIdAndDelete(id);
            res.status(200).json({deletedTask, msg: "Tarefa excluida com sucesso"});

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor." });
        }
    },
    update: async(req, res) => {
        try {
            const id = req.params.id;

            const task = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
            };
            
            const updatedTask = await tasksModel.findByIdAndUpdate(id, task);

            if(!updatedTask) {
                res.status(404).json({msg: "Tarefa não encontrada"});
                return;
            }

            res.status(200).json({task, msg: "Tarefa atualizada com sucesso!"});

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor." });
        }
    }
};

module.exports = taskController;