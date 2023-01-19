// Import User Model
const User = require("./userModel");

//Handling index actions
exports.index = function (req, res) {
  User.find()
    .exec()
    .then((data) => res.status(200).json(data));
};

// Create book
exports.new = function (req, res) {
  let user = new User();
  user.userId = req.body.userId ? req.body.userId : user.userId;
  user.name = req.body.name ? req.body.name : user.name;
  user.email = req.body.email ? req.body.email : user.email;
  user.avatar = req.body.avatar ? req.body.avatar : user.avatar;

  //saving user and checking for errors
  user.save(function (err) {
    res.json({
      message: "New user created!",
      status: "ok",
      data: user,
    });
  });
};

// Handle view book info
exports.view = async function (req, res) {
  try {
    const data = await User.findOne({userId: req.params.userId});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle update note info
exports.update = function (req, res) {
    User.findOne({userId: req.params.userId}, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email ? req.body.email : user.email;
        user.avatar = req.body.avatar ? req.body.avatar : user.avatar;
 

        // save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'user updated',
                status: "ok",
                data: user
            });
        });
    });
};

// Handle delete user
exports.delete = function (req, res) {
  User.deleteOne(
    {
      userId: req.params.userId,
    },
    function (err, user) {
      if (err) res.send(err);

      res.json({
        status: "ok",
        message: "user deleted",
      });
    }
  );
};