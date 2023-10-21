import models, { sequelize } from "../model/init-models.js";

const getAll = async (req, res) => {
  try {
    const result = await models.users.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const regist = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const result = await models.users.create(
      {
        username: username,
        email: email,
        password: password,
        role: role,
        image: "https://via.placeholder.com/100",
        createdat: new Date().toLocaleString("en-GB", {
          timeZone: "Asia/Bangkok",
        }),
      },
      { returning: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateuser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    let id = +req.params.id; //kasih + biar jadi int
    const result = await models.users.update(
      {
        username: username,
        email: email,
        password: password,
        role: role,
        image: "https://via.placeholder.com/100",
        updatedat: new Date().toLocaleString("en-GB", {
          timeZone: "Asia/Bangkok",
        }),
      },
      { where: { id: id } }
    );
    result[0] === 1
      ? res.status(200).json({
          message: `Id ${id} has been updated.`,
        })
      : res.status(400).json({
          message: `Id ${id} has not been updated.`,
        });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deluser = async (req, res) => {
  try {
    let id = +req.params.id; //id dijadiin variable biar enak juga
    const result = await models.users.destroy({
      where: { id: id },
    });
    result === 1
      ? res.status(200).json({
          message: `Id ${id} has been deleted.`,
        })
      : res.status(400).json({
          message: `Id ${id} has not been deleted.`,
        });
  } catch (error) {}
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await models.users.findOne({
      where: { email },
    });
    if (result) {
      if (result.password === password) {
        res.status(200).json(result);
      } else {
        res.status(401).json({
          message: "Invalid password",
        });
      }
    } else {
      res.status(404).json({
        message: "Email not found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDetail = async (req, res) => {
  try {
    const id = +req.params.id;

    const result = await models.users.findByPk(id);

    result
      ? res.status(200).json(result)
      : res.status(404).json({
          message: `User id ${id} not found`,
        });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  getAll,
  regist,
  updateuser,
  deluser,
  login,
  getDetail,
};
