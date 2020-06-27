const cartModel = require("../models/shoppingCart");
// const itemModels = require("../models/product");
// const item = itemModels.name;

const itemsController = {
  listItemsCart: async (req, res) => {
    const { idCart } = req.params;
    const cart = await cartModel.findById(idCart).populate("items.product");

    // console.log(cart.items.product);
    return res.json({ items: cart.items });
  },
  adItemsCart: async (req, res) => {
    const { idCart } = req.params;
    const cart = await cartModel.findById(idCart);
    const { userId, product, quantity } = req.body;
    cart.items.push({ userId, product, quantity });
    const result = await cart.save();
    return res.json(result);
  },
  removeItemCart: async (req, res) => {
    const { idCart } = req.params;
    const cart = await cartModel.findById(idCart);
    const { userId, product, quantity } = req.body;
    cart.items.pull({ userId, product, quantity });
    const result = await cart.save();
    return res.json(result);
  },
};

module.exports = itemsController;
