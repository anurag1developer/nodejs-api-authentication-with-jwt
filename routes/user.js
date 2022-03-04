const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

// update contacts
router.put("/:userId", verify, async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(200).send("User not found");
  }

  // Contact Validation
  const contactValidation = (contact) => {
    if (!contact) {
      return false;
    }
    if (contact.toString().length !== 10) {
      return "10digit";
    }
    if (
      contact.toString()[0] != 9 &&
      contact.toString()[0] != 8 &&
      contact.toString()[0] != 7 &&
      contact.toString()[0] != 6
    ) {
      return "9876";
    }
  };
  const c1 = contactValidation(req.body.contact1);
  const c2 = contactValidation(req.body.contact2);
  const c3 = contactValidation(req.body.contact3);

  if (c1 === "10digit" || c2 === "10digit" || c3 === "10digit") {
    return res.status(406).send("Phone number can only be of 10 digits");
  }
  if (c1 === "9876" || c2 === "9876" || c3 === "9876") {
    return res
      .status(406)
      .send("Phone number can only start with 9, 8, 7 or 6");
  }

  await user.updateOne({ $set: req.body });
  res.status(200).json("contacts are updated");
});

// get contacts
router.get("/:userId", verify, async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(200).send("User not found");
  }
  res.status(200).json({
    contact1: user.contact1,
    contact2: user.contact2,
    contact3: user.contact3,
  });
});

module.exports = router;
