
const contenedorProductos = document.getElementById("productos")
const btnCarrito = document.getElementById("btnCarrito")
const btnCerrarCarrito = document.getElementById("btnCerrarCarrito")
const cartContainer = document.getElementById("cartContainer")
const numerito1 = JSON.parse(localStorage.getItem("numerito"))
const numCarrito = document.getElementById("numerito")
const contenido = document.getElementById("contenido")
console.log(contenido)
let carrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

  numCarrito.innerText = numerito1

  const articulos =  fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then(data=>{
                let hombre = data.filter(elem => elem.category == "men's clothing")
                hombre.forEach(prducto =>  {
                    const { title, category, description, id , image ,price ,rating } = prducto;
                    const card = document.createElement("div");
                    card.innerHTML = `
                    <div class="box" id="box">
                    <div class="imgBx">
                    <img src=${image}  alt="credencial" />
                    </div>
                    <div class="content">
                    <h4>${title}</h4>
                      <p>${price}</p>
                      <button  data-id="${title}"class="btnCard">Shop Now</button>
                    
                    </div>
                    `
                    contenedorProductos.append(card)
                
            })  
        })



       

        const abrirCarrito = ()=>{ cartContainer.classList.toggle("abierto")}
        const cerrarCarrito = ()=>{ cartContainer.classList.toggle("abierto")}
        btnCarrito.addEventListener("click" , abrirCarrito)
        btnCerrarCarrito.addEventListener("click" , cerrarCarrito)
        

       
        contenido.innerHTML = ""

        const mostrarCarrito = ()=>{
          contenido.innerHTML = ""
          carrito.forEach((prducto)=>{
            const carring = document.createElement("div");
            carring.className = "carring";
            carring.innerHTML = `
            <img src=${prducto.image} alt="" />
            <div class="carring-info">
            <h2>${prducto.title}</h2>
            </div>
            <div class="carring-price" >
            <button data-id="${prducto.title}" class="vaciarCarrito">X</button>
            <p> $${prducto.price}</p>
            </div>
            `;
             contenido.append(carring);
           });
          }
          mostrarCarrito()