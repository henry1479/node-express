const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

class Course {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuid.v4();
    }
    // возвращет промис с записью данных в файл
    async save() {
        const courses = await Course.getAll();
        console.log("Courses", courses);
        courses.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, "..", "data", "courses.json"),
            JSON.stringify(courses),
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
            
            });
        });
      
    }
    // возвращает промис с прочитанными данными из файла
    static getAll() {
        return new Promise((resolve, reject) => { 
            fs.readFile(path.join(__dirname, "..", "data", "courses.json"), "utf-8",
                (error, content) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(content));
                }
            })
        });
        
    }
    
    // служебная функция 
    // возвращает объект  с  наполненной моделью
    // для дальнейшей сериализации
    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }
    // получение курса по id
    static async getById(id) {
        const courses = await Course.getAll();

        return courses.find(c => c.id == id);
    }

    // обнавляем файл с курсами в соответствии с полученными данными
    static async update(course) {
        const courses = await Course.getAll();

        const idx = courses.findIndex(c => c.id == course.id);
        console.log(idx);

        courses[idx] = course;

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, "..", "data", "courses.json"),
            JSON.stringify(courses),
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
            
            });
        });
    }
}


module.exports = Course;