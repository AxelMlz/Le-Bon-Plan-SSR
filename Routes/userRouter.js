const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config({ path: "../.env"})
app.use(express.json());
const mongoose = require("mongoose");
const Logs = require("./logModel")

// Handlebars config
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

// Middlewares
app.use(cookieParser());
// pour le css et le js dans le html
app.use(express.static(path.join(__dirname, "/public")));
// body du form de login
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect(
		process.env.MONGO_URI,
		{
			useNewUrlParser: true,
		}
	)
	.then(() => console.log("Connected to MongoDB"));

// Routes
app.get("/", (req, res) => {
	// renvoie un fichier html
	res.render("homepage", {
		isLoggedIn: false,
	});
});

app.get("/signup", (req, res) => {
	res.render("signup");
});
app.get("/login", (req, res) => {
	res.render("login");
});

// app.post("/login", (req, res) =>{
//     console.log(req.body);

//     const
// })



// Start server
app.listen(8001, () => console.log("Listening"));