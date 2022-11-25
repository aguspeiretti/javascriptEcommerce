const loader = document.querySelector(".loader")
const contenedorProductosShop = document.getElementById("productosShop")
const selectores = document.querySelectorAll("#selectores")
const botonesProductos = document.querySelectorAll(".btnCard")


const fetchProductos = fetch('https://fakestoreapi.com/products/')
          .then(res=>res.json())
          .then(data=>{
            let productos = data
            console.log(productos)

            let carrito = []


            const agregarProductoCarrito = (e)=>{
            const idBOton = e.currentTarget.id;
            const productoAgregado = productos.find(producto => producto.title === idBOton )
            carrito.push(productoAgregado)
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



        


   
       
       
