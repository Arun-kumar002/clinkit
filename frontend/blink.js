let productblock = document.querySelector(".rightbar");
let lists = document.querySelector(".lists")
let search = document.querySelector("#search")

search.addEventListener('change', (e) => {
    let searchValue = e.target.value
    searchValue = searchValue.toLowerCase()
    getProducts(searchValue)
    search.value = ''
})

lists.addEventListener('click', (e) => {
    let listValue = e.target.innerHTML
    listValue = listValue.toLowerCase()
    getProducts(listValue)
})

async function getProducts(listValue) {
    let data = await fetch("https://dummyjson.com/products")
    let { products } = await data.json()
    let output = ''


    for (let i = 0; i < products.length; i++) {
        let { description, images, title, price, category } = products[i]

        if (category == listValue || listValue == '') {
            output += `
            <div class ='grid'>
                <div class= 'image'>
                    <img src = '${images[0]}' alt = '${title}'>
                    <h1>${title}</h1>
                </div>
                    <p>${description}</p>         
                    <h4>Price: <span> ${price}</span></h4>              
                <button id = 'buy'>Buy</button>
                </div>
            `
        }
    }
    productblock.children[0].innerHTML = output
}
document.addEventListener("DOMContentLoaded", getProducts('')
)
