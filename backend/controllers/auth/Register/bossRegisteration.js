const expressAsyncHandler = require("express-async-handler");
const { Boss, validateBoss } = require("../../../DB/Boss");
const bcrypt = require("bcrypt");

const BossRegister = expressAsyncHandler(async (req, res) => {
  const { error } = validateBoss(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let boss = await Boss.findOne({ email: req.body.email });
  if (boss)
    return res.status(400).json({ message: "Boss already registered." });

  boss = new Boss({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    SSN: req.body.SSN,
    themePreference: req.body.themePreference,
    notificationsEnabled: req.body.notificationsEnabled,
  });

  const salt = await bcrypt.genSalt(10);
  boss.password = await bcrypt.hash(boss.password, salt);

  try {
    await boss.save();
    res.status(201).json({ message: "Boss registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal server error: " + err.message });
  }
});
module.exports = BossRegister;
