const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

// роут курсов

router.get("/", async (req, res,) => {
    const courses = await Course.getAll();
    console.log(courses)
    res.render("courses", {
        title: "Курсы",
        isCourses: true,
        courses: courses
    });
});


// обрабатываем страницу редактирования курса
router.get("/:id/edit", async (req, res) => {
    if (!req.query.allow) {
        return res.redirect("/");
    }

    const course = await Course.getById(req.params.id);

    res.render("course-edit", {
        title: course.title,
        course
    });
});

// редактируем курс
router.post("/edit", async(req, res) => {
    await Course.update(req.body);
    return res.redirect("/courses")
})


// выводим страницу курса в новом лэйатуе
router.get("/:id", async (req, res) => {
    const course = await Course.getById(req.params.id);
    res.render("course", {
        // добавляем новый лэйаут для отдельного курса
        layout: "empty",
        title: course.title,
        course
    });
})

module.exports = router;