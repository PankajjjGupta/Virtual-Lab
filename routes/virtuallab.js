const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/AppError");
const Code = require("../models/code");
const { isLoggedIn, validateCode, isAuthor} = require("../middleware");
const virtuallabs = require("../controllers/virtuallabs");



router.get("/", (req, res) => {
    // res.render("virtuallab/index")
    res.send("Welcome To Our Home Page!")
})

router.route("/new")
// This Route gives the form to create a code file with title
    .get(isLoggedIn, virtuallabs.renderNew)
// This Route create[Create[C] of CRUD] the document in the Database[DB] of Code File
// intializeCodeInDB - It creates a document in the db with the appropriated dummmy code of the selected langauge
    .post(isLoggedIn, validateCode, catchAsync(virtuallabs.createNewLab));

// This Route shows all the saved codes of the user in DATABASE and provides link to see the particular code file
router.get("/mycodes", virtuallabs.myCodes)


router.route("/:id")
// This Route shows[Read[R] of CRUD] the document in the Database[DB]
    .get(catchAsync(virtuallabs.viewCode))
// This Route shows[Update[U] the code by the user of CRUD] the document in the Database[DB]
    .put(isLoggedIn, isAuthor, virtuallabs.saveCode)
// This Route shows[Delete[D] of CRUD] the document in the Database[DB]
    .delete(isLoggedIn, isAuthor, catchAsync(virtuallabs.deleteCode))

module.exports = router