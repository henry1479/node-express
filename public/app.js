// клиентсикй скрипт, который форматирует цену курса 
//  под денежный формат

const toCurrency = price => {
    return new Intl.NumberFormat("ru-Ru", {
        currency: "rub",
        style: "currency"

    }).format(price);
}

document.querySelectorAll(".price").forEach(node => {
    node.textContent = toCurrency(node.textContent);
});


// получаем див с id cart
const $cart = document.querySelector("#cart"); 

if ($cart) {
    // добавляем обработчик на карт
    $cart.addEventListener("click", e => {
        // console.log(e.target.classList);
        // если елемент кнопка, тогда получаем ее id
        if (e.target.classList.contains("js-remove")){
            const id = e.target.dataset.id;
            // аякс запрос на удаление
            fetch("/cart/remove/" + id, {
                method: "DELETE"
            }).then(res => res.json())
                .then(cart => {
                    console.log(cart)
                    // если курсы есть, тогда перерисовываем страницу
                    if (cart.courses.length) {
                        // строка с обновленными данными
                        const html = cart.courses.map(course => {
                            return `
                            <tr>
                                <td>${course.title}</td>
                                <td>${course.count}</td>
                                <td>
                                    <button class="btn btn-small js-remove" data-id="${id}">Удалить</button>
                                </td>
                            </tr>
                            `;
                        }).join("");
                        // вставляем обновленные данные таблицу
                        $cart.querySelector("tbody").innerHTML = html;
                        $cart.querySelector(".price").innerHTML = toCurrency(cart.price);
                        
                    } else {
                        $cart.innerHTML = "<p>Корзина пуста</p>";
                    }
                })
        }
    });
}