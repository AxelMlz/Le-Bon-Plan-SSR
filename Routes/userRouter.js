const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config({ path: "../.env"})
app.use(express.json());
const mongoose = require("mongoose");
const {Logs} = require("../logModel")
const bcrypt = require("bcrypt");
const signUpMiddle = require("../signUpMiddle");
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

app.post("/signup",signUpMiddle, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
try {
regisId = await Logs.create({
email: req.body.email,
password: hashedPassword,
})
console.log(regisId)
;
res.status(201).json({
  message: `User with the email adress "${req.body.email}" created`
})
} catch (err) {
return res.status(400).json({
message: "email adress unavailable, pick a new one",
});
}})

app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	// 1 - Vérifier si le compte associé à l'email existe
	const log = await Logs.findOne({ email });

	if (!register) {
		return res.status(400).json({
			message: "Invalid email or password",
		});
	}

	// 2 - Comparer le mot de passe au hash qui est dans la DB
	const isPasswordValid = await bcrypt.compare(password, log.password);
    
    console.log(process.env.CLE)
	if (!isPasswordValid) {
		return res.status(400).json({
			message: "Invalid email or password",
		});
	}

	// 3 - Générer un token
	const token = jwt.sign({ id: log._id }, process.env.CLE);

	// 4 - On met le token dans un cookie
	res.cookie("jwt", token, { httpOnly: true, secure: false });

	// 5 - Envoyer le cookie au client
	res.json({
		message: "Here is your cookie",
	});
});

module.exports = Router