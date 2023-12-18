const { Router } = require('express')
const router = Router();
const Cart = require("../models/cart");
const Course = require("../models/course");


// обрабатывает запрос на доьавление курса в корзину
router.post("/add", async (req, res) => {
    // console.log(req.body.id);
    const course = await Course.getById(req.body.id);
    await Cart.add(course);
    return res.redirect('/cart');
});

// выводит саму корзину
router.get("/", async (req, res) => {
    const cart = await Cart.fetch();
    res.render('cart', {
        title: "Корзина",
        isCart: true,
        courses: cart.courses,
        price: cart.price
    })
});

router.delete("/remove/:id", async (req, res) => { 
    // получем обновленную корзину после удаения
    const cart = await Cart.remove(req.params.id);
    // отправляем ее на клиент
    res.status(200).json(cart);

})

module.exports = router;