const mongoose = require('mongoose')

const ExpenseListSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, 'must provide category name'],
        trim: true,
    },
    expenseName: {
        type: String,
        required: [true, 'must provide expense name'],
        trim: true,
        unique: true
    },
    vendor: {
        type: String,
        required: [true, 'must provide vendor email'],
        trim: true,
    },
    Amount: {
        type: Number,
        required: [true, 'must provide amount'],
        trim: true,
    },
    bill: {
        type: String,
        required: [true, 'must upload bill'],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('ExpenseListModal', ExpenseListSchema)