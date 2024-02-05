const mongoose = require("mongoose");

const { Schema } = mongoose;

const { listsSchema } = require("./listsModel");

const tasksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        required: true
    },
    list: {
        type: listsSchema,
        required: true
    },

}, {timestamps: true});

const tasksModel = mongoose.model("tasksModel", tasksSchema);

module.exports = {
    tasksModel,
    tasksSchema,
};