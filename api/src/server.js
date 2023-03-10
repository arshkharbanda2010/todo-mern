const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	try {
		const result = await Todo.findByIdAndDelete(req.params.id);

		return res.json({ result });
	} catch (err) {
		console.log("delete", err)
		return res.status(400).json({
			message: 'something went wrong'
		})
	}
});

app.get('/todo/complete/:id', async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) return res.status(400).json({
			message: 'not found'
		})
		todo.complete = !todo.complete
		await todo.save();

		res.json(todo);
	} catch (err) {
		console.log('complete', err)
		return res.status(400).json({
			message: 'Something went wrong'
		})
	}
})

app.put('/todo/update/:id', async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);

		todo.text = req.body.text;

		await todo.save();

		res.json(todo);
	} catch (err) {
		console.log("update", err)
	}
});

app.listen(3001);