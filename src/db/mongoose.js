const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter a valid Email.");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(passcode) {
            if (passcode.toLowerCase().includes("password")) {
                throw new Error("Password cannot be the word 'Password'");
            }
        },
    },
    age: {
        type: Number,
        validate(age) {
            if (age < 0) {
                throw new Error("Age must be a number");
            }
        },
    },
});

const user = new User({
    name: "Michael",
    email: "XYZ400@gmail.com",
    password: "helloworld",
    age: 29,
});

user.save()
    .then((resolve) => {
        console.log(resolve);
    })
    .catch((error) => {
        console.log("Error: ", error);
    });

const Task = mongoose.model("Task", {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const task = new Task({
    description: "This is the dawn of a new age!",
});

task.save()
    .then(() => {
        console.log(task);
    })
    .catch((error) => {
        console.log("Error: ", error);
    });
