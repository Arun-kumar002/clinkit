let article = document.querySelector(".maincontent");
console.log(article);
let cartmodule = document.querySelector(".cartmodule");
let cartbox = document.querySelector(".cartbox");
let toggle = true;
let cartdata = document.getElementById("cartdata");
let button = document.getElementById("button")
// console.log(button.children[2])
let span = document.querySelector(".price")
let cartCount = document.querySelector(".cart-count")

article.addEventListener("click", (e) => {
    // console.log(e)
    if (e.target.innerText == "My Cart") {
        if (toggle) {
            cartmodule.style.display = "block";
            toggle = false;
        } else {
            cartmodule.style.display = "none";
            toggle = true;
        }
    }

    if (e.target.innerText == "Buy") {

        let price = e.target.previousElementSibling.children[0].innerText;
        let description =
            e.target.previousElementSibling.previousElementSibling.innerText;
        let title =
            e.target.previousElementSibling.previousElementSibling
                .previousElementSibling.children[1].innerText;
        let imgurl =
            e.target.previousElementSibling.previousElementSibling
                .previousElementSibling.children[0].src;

        let data = { price, description, title, imgurl };
        let card_count = localStorage.length;
        console.log(data)
        console.log(card_count)

        localStorage.setItem(`card_count${card_count}`, JSON.stringify(data));
    }
    cart_box();
    if (e.target.innerText == "Delete") {

        let card_count = localStorage.length;
        for (let i = 0; i < card_count; i++) {

            let fromstorage = localStorage.getItem(`card_count${i}`);
            fromstorage = JSON.parse(fromstorage);
            if (fromstorage.price == e.target.previousElementSibling.children[0].innerText) {
                localStorage.removeItem(`card_count${i}`)
                cart_box()
            }
        }
    }
});

function cart_box() {
    cartdata.innerHTML = " "
    let int_value = 0;
    let cart_count = 0;
    let card_count = localStorage.length;
    for (let i = 0; i < card_count; i++) {
        cart_count++;
        let fromstorage = localStorage.getItem(`card_count${i}`);
        fromstorage = JSON.parse(fromstorage);
        console.log(fromstorage.price);
        int_value += parseInt(fromstorage.price)
        cartdata.innerHTML += `
             <div class= 'cartt'>
                   <img src="${fromstorage.imgurl}" width=100 height=100 id="img"/>
                   <p>Title : <span> ${fromstorage.title}</span></p>
                      <p>Price: <span>${fromstorage.price}</span></p>
                      <button >Delete</button>
             </div>
          `;
    }
    // console.log(int_value)
    span.innerHTML = int_value;
    cartCount.innerHTML = cart_count;
}

document.addEventListener("DOMContentLoaded", cart_box)