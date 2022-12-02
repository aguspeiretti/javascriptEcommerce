const loader = document.querySelector(".loader")
const contenedorProductosShop = document.getElementById("productosShop")
const selectores = document.querySelectorAll("#selectores")
const botonesProductos = document.querySelectorAll(".btnCard")
const numerito = document.querySelector("#numerito")
const numeritoJson = JSON.parse(localStorage.getItem("numerito"))
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"))
numerito.innerText = numeritoJson
const contenido = document.getElementById("contenido")

let carrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

console.log(carrito)

const fetchProductos = fetch('https://fakestoreapi.com/products/')
          .then(res=>res.json())
          .then(data=>{
            let productos = data
                      

            const actualizarNumerito =()=>{
              let nuevoNumerito = carrito.reduce((acc , producto)=> acc + producto.cantidad , numeritoJson)
              numerito.innerText = nuevoNumerito
              localStorage.setItem("numerito" , JSON.stringify(nuevoNumerito))
            }
    
            const agregarProductoCarrito = (e)=>{
            const idBOton = e.currentTarget.id;
            const productoAgregado = productos.find(producto => producto.title === idBOton )

            if (carrito.some(producto => producto.title === idBOton)){
              const index = carrito.findIndex(producto => producto.title === idBOton)
              carrito[index].cantidad++
            }else{
              productoAgregado.cantidad = 1
              carrito.push(productoAgregado)
            }

            actualizarNumerito()
           
            localStorage.setItem("productos-en-carrito", JSON.stringify(carrito))
            console.log(carrito)
            
            }
          
            
            const actualizarBotonesShop = () =>{
            
              const botonesProductos = document.querySelectorAll(".btnCard")
              botonesProductos.forEach(boton =>{
                boton.addEventListener("click" , agregarProductoCarrito)
              })
             
            }            
           

const cargarProductos = (productosElegidos)=>{

  contenedorProductosShop.innerHTML = ""

  productosElegidos.forEach(prducto =>  {
    const { title, category, description, id , image ,price ,rating } = prducto;
    const card = document.createElement("div");
    card.classList.add("productoCard")
    card.innerHTML = `
    <div class="box" id="box">
    <div class="imgBx">
    <img src=${image}  alt="credencial" />
    </div>
    <div class="content">
    <h4>${title}</h4>
      <p>${price}</p>
      <button id="${title}"class="btnCard">Shop Now</button>
    
    </div>
    `
    contenedorProductosShop.append(card)

})  
  
 
}

  cargarProductos(productos)
  actualizarBotonesShop()

selectores.forEach(elem =>{
  elem.addEventListener("click", (e)=>{
     let categoria = e.target.dataset.categoria
     console.log(categoria)
     if(categoria != "all"){
      const productoBoton = productos.filter(pr => pr.category == categoria)
      cargarProductos(productoBoton)
      actualizarBotonesShop()
    
     }else{
      cargarProductos(productos)
      actualizarBotonesShop()
     }
  
    
  })
} )



})
.finally(()=>{
  loader.classList.add("loader-hidden")
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