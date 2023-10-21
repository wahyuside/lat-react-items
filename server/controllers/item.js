import models, { sequelize } from "../model/init-models.js";

const getItem = async (req, res) => {
  try {
    const result = await models.items.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addItem = async (req, res) => {
  try {
    const { name, user_id, category, price, stock, image } = req.body;
    console.log(req.body);
    const result = await models.items.create(
      {
        name: name,
        user_id: user_id,
        category: category,
        price: price,
        stock: stock,
        image: image,
      },
      { returning: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateItem = async (req, res) => {
  try {
    const { name, category, user_id, price, stock, image } = req.body;
    let id = +req.params.id; //kasih + biar jadi int
    const result = await models.items.update(
      {
        name: name,
        category: category,
        user_id: user_id,
        price: price,
        stock: stock,
        image: image,
        // updatedat: new Date().toLocaleString("en-GB", {
        //   timeZone: "Asia/Bangkok",
        // }),
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

const delItem = async (req, res) => {
  try {
    let id = +req.params.id; //id dijadiin variable biar enak juga
    const result = await models.items.destroy({
      where: { id: id },
    });
    console.log(result);
    result === 1
      ? res.status(200).json({
          message: `Id ${id} has been deleted.`,
        })
      : res.status(400).json({
          message: `Id ${id} has not been deleted.`,
        });
  } catch (error) {}
};

const getItemDetail = async (req, res) => {
  try {
    const id = +req.params.id;

    const result = await models.items.findByPk(id);

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
  getItem,
  addItem,
  updateItem,
  delItem,
  getItemDetail,
};
