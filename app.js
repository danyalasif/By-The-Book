//Import all node modules
var express = require("express"),
    path = require("path"),
    favicon = require("serve-favicon"),
    logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//Import all database schemas
var seedDB = require("./seeds"),
    //User = require("./models/userSchema"),
    Book = require("./models/bookSchema"),
    Author = require("./models/authorSchema");

//Import all routes
var index = require("./routes/index"),
    book = require("./routes/book"),
    users = require("./routes/users");

var app = express();

mongoose.connect("mongodb://localhost/bythebook").then(
    () => {
        console.log("Mongoose Connection Successful");
    },
    err => {
        console.log(err);
    }
);

// seedDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/book", book);
app.use("/users", users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
