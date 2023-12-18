const { Router } = require("express");
const Course = require("../models/course");
const router = Router();

// роут страницы добавления курсов

router.get("/",(req, res,) => {
    res.render("add", {
        title: 'Добавить курс',
        isAdd: true
    });
});  


// обработка формы добавления курса
// с перенаправлением на страницу курсов
router.post("/", async (req, res) => {
    console.log(req.body);
    // создаем объект модели
    const course = new Course(req.body.title, req.body.price, req.body.img);
    // пишем данные из формы в файл
    await course.save();

    res.redirect("courses");
}) 

module.exports = router;