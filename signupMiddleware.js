const express = require('express');
const app = express();
const port = 8011;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Logs = require("./logModel")

const Joi = require("joi");
// const router = express.Router();
require('dotenv').config({ path: "./.env"})
app.use(express.json());
app.use(cookieParser());

mongoose
.connect(
       process.env.MONGO_URI,
        {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("Connected to MongoDB"));

const newRegistrationEntry = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
      .max(100)
      .required(),
      password: Joi.string()
      .min(8)
      .required()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    });
    
    function validateNewRegisterEntry(req, res, next) {
        const validation = newRegistrationEntry.validate(req.body);
  
    if (validation.error) {
      return res.status(400).json({
        message: "Error 400",
        description: validation.error.details[0].message,
      });
    }
    next();
}

const signUpMiddle = { validateNewRegisterEntry };
module.exports = signUpMiddle;