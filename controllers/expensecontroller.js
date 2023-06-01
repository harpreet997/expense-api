
const Expense = require('../models/expensemodal');
const asyncWrapper = require('../middleware/async')

const getAllExpenses = asyncWrapper(async (req, res) => {
    const Expenses = await Expense.find({}).sort({ createdAt: -1 })
    res.status(200).json({ Expenses })
})

const addExpense = asyncWrapper(async (req, res) => {
    try {
        var expensebody = new Expense({
            categoryName: req.body.categoryName,
            expenseName: req.body.expenseName,
            vendor: req.body.vendor,
            Amount: req.body.Amount,
            bill: `/uploads/${req.file.filename}`
        })

        const expense = await expensebody.save();
        if (!expense) {
            res.status(400).json({ msg: "Please fill all the fields" })
        }
        else {
            res.status(201).json({ expense, msg: "Expense Created successfully" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Expense Already Exists" });
    }
})


const editExpense = asyncWrapper(async (req, res, next) => {
    const { id: expenseID } = req.params
    if (req.file) {
        var expensebody = {
            categoryName: req.body.categoryName,
            expenseName: req.body.expenseName,
            vendor: req.body.vendor,
            Amount: req.body.Amount,
            bill: `/uploads/${req.file.filename}`
        }
    } else {
        var expensebody = {
            categoryName: req.body.categoryName,
            expenseName: req.body.expenseName,
            vendor: req.body.vendor,
            Amount: req.body.Amount,
        }
    }
    const expense = await Expense.findOneAndUpdate({ _id: expenseID }, expensebody, {
        new: true,
        runValidators: true,
    })
    if (!expense) {
        return next(createCustomError(`No Product with id : ${expenseID}`, 400))
    }
    else {
        res.status(200).json({ msg: "Expense Updated Successfully" })
    }
})


const deleteExpense = asyncWrapper(async (req, res) => {
    const { id: expenseID } = req.params
    const expense = await Expense.findOneAndDelete({ _id: expenseID })
    try {
        if (!expense) {
            res.status(400).json({ msg: `No Expense found with id: ${expenseID}` })
        }
        else {
            res.status(200).json({ msg: "Expense Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid expense id" })
    }
})


module.exports = {
    getAllExpenses,
    addExpense,
    deleteExpense,
    editExpense
}