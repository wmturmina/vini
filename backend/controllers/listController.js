const { listsModel } = require("../models/listsModel");

const listController = {

    create: async(req, res) => {
        try {
            const list = {
                name: req.body.name,
            };

            const response = await listsModel.create(list);
            res.status(201).json({response, msg: "Lista criada com sucesso!"});

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor." });
        }
    },
    getAll: async(req, res) => {
        try {
            const lists = await listsModel.find();
            res.json(lists);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor." });
        }
    },
    get: async(req, res) => {
        try {
            const id = req.params.id;
            const list = await listsModel.findById(id);

            if(!list) {
                res.status(404).json({msg: "Lista não encontrada"});
                return;
            }

            res.json(list);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor." });
        }
    },
    delete: async(req, res) => {
        try {
            const id = req.params.id;
            const list = await listsModel.findById(id);

            if(!list) {
                res.status(404).json({msg: "Lista não encontrada"});
                return;
            }

            const deletedList = await listsModel.findByIdAndDelete(id);
            res.status(200).json({deletedList, msg: "Lista excluida com sucesso"});

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor." });
        }
    },
    update: async(req, res) => {
        try {
            const id = req.params.id;

            const list = {
                name: req.body.name,
            };
            
            const updatedList = await listsModel.findByIdAndUpdate(id, list);

            if(!updatedList) {
                res.status(404).json({msg: "Lista não encontrada"});
                return;
            }

            res.status(200).json({list, msg: "Lista atualizada com sucesso!"});

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno do servidor." });
        }
    }
};

module.exports = listController;