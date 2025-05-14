const Creator = require("../models/Creator");


module.exports = {
  getIndex: (req, res) => {
                const creator = Creator.findById(req.params.id).lean();
                const User = require("../models/User")

    res.render("index.ejs", {user: req.user, creator});
  },
};

