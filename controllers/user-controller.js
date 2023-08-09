const HttpError = require("../models/http-error");
const { uuid } = require("uuidv4");

const DUMMY_USER = [];

const checkUserFoundAlready = (email) =>
  DUMMY_USER.some((r) => r.email == email);

const checkUserFoundById = (id) => DUMMY_USER.some((r) => r.userId == id);

const getIndexOfUser = (email) => DUMMY_USER.findIndex(r => r.email === email);

const getAllUsers = (req, res, next) => {
  if (DUMMY_USER.length == 0) {
    return next(new HttpError(`No User Found`, 404));
  } else {
    res.json({ data: DUMMY_USER });
  }
};

const signUpUser = (req, res, next) => {
  let { firstName, lastName, email, password } = req.body;
  if (checkUserFoundAlready(email)) {
    return next(new HttpError(`User already found with this email`, 404));
  }
  let user = {
    firstName,
    lastName,
    email,
    password,
    userId: uuid(),
  };
  DUMMY_USER.push(user);
  res.status(200);
  res.json({ message: "User has been Created" });
};

const login = (req, res, next) => {
  let { email, password } = req.body;
  if (!checkUserFoundAlready(email)) {
    return next(
      new HttpError(`User Not Found!!! Let's Create an account...`, 404)
    );
  }
  let isValidUser = DUMMY_USER.some(
    (r) => r.email === email && r.password === password
  );
  if (!isValidUser) {
    return next(new HttpError("Username or password is incorrect", 404));
  }
  res.status(200);
  res.json({ message: "Successfully Logged in!!!" });
};

const updateUserPassword = (req, res, next) => {
  let { id } = req.params;
  let { email, password } = req.body;
  if (!checkUserFoundById(id)) {
    return next(new HttpError(`No User found to update password`, 404));
  }
  let user = DUMMY_USER.find((r) => r.userId === id && r.email === email);
  let indexOfUserData = getIndexOfUser(email);
  user = { ...user, password };
  DUMMY_USER[indexOfUserData] = user;
  res.status(200);
  res.json({ message: "User password successfully updated!!!" });
};

const deleteUser = (req, res, next) => {
  let { id } = req.params;
  if (!checkUserFoundById(id)) {
    return next(new HttpError(`No User record to delete...`, 404));
  }
  let indexOfUserData = getIndexOfUser(id);
  DUMMY_USER.splice(indexOfUserData, 1);
  res.status(200);
  res.json({ message: "User deleted successfully!!!" });
};

exports.getAllUsers = getAllUsers;
exports.signUpUser = signUpUser;
exports.login = login;
exports.updateUserPassword = updateUserPassword;
exports.deleteUser = deleteUser;
