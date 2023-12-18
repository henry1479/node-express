const { Router } = require("express");
const router = Router();

// роут главной страницы


router.get("/",(req, res, ) => {
    res.status(200);
    
    res.render("index", {
        title: "Главная",
        isHome: true,
    });
});



module.exports = router;