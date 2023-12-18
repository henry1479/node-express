const express = require('express');
const path = require('path');
// движок шаблонизатора
const exphbs = require('express-handlebars');
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cartRoutes = require("./routes/cart");


// создание сервера
const app = express();



// конфигурируем движок
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

// регистрация движка шаблонизатора
app.engine("hbs", hbs.engine);
// подключаем движок к express
app.set("view engine", "hbs");
// указываем директорию с шаблонами
app.set("views", "views");
// регистрируем public статической
app.use(express.static(path.join(__dirname, "public")));
// настройка мидлвэра для обработки данных
// полученных методом POST
app.use(express.urlencoded({ extended: true }));




// регистрация роутов

app.use("/", homeRoutes); 
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use('/cart', cartRoutes);




// переменная окружения порта
const PORT = process.env.PORT || 3000;
// слушаем на порту
app.listen(PORT, () => { console.log(`Server listening on ${PORT}`) });