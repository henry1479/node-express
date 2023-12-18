const path = require("path");
const fs = require("fs");
// генерирование 
const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
)
class Cart {
    // добавление курсов в корзину
    static async add(course) {
        // console.log(course)
        // получаем корзину из файла
        const cart = await Cart.fetch();

        // ищем в корзине индекс курса, совпадающий с переданным
        const idx = cart.courses.findIndex(c => c.id === course.id);
        // запоминаем этот курс в качестве кандидата
        const candidate = cart.courses[idx];
        // если кандидат есть
        if (candidate) {
            // тогда увеличиваем ему счет
            candidate.count++;
            // и записываем в корзину кандидата
            cart.courses[idx] = candidate;
        } else {
            // устанваливаем счет в один
            course.count = 1;
            // и записываем в корзину курс
            cart.courses.push(course);;
        }
        // увеличиваем цену корзины на сумму курса
        cart.price += +course.price
        // записываем обновленную модель в файл 
        // в качестве промиса
        return new Promise((resolve, reject) => { 
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject()
                } else {
                    resolve();
                }
            })
        })
    } 


    // просто асинхронно читает файл корзины
    static async fetch() {

        return new Promise((resolve, reject) => {
            fs.readFile(p, "utf-8", (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(content));
                }
            });
        });

    }

    // удаление курса из корзины
    static async remove(id) {
        const cart = await Cart.fetch(id);
        // получаем индекс удаляемого курса
        const idx = cart.courses.findIndex(c => c.id === id);
        // запоминаем курс
        const course = cart.courses[idx];
        // если он один, то просто удаялем его
        if (course.count == 1) {
            cart.courses = cart.courses.filter(c => c.id !== id);
        // уменьшаем количество курса на один
        } else {
            cart.courses[idx].count--
        }
        // уменьшаем общую сумму
        cart.price -= course.price;

        // записываем асинхронно в файл новую корзину
        return new Promise((resolve, reject) => { 
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(cart);
                }
            })
        })
    }

}


module.exports = Cart;