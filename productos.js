
const contenedorProductos = document.getElementById("productos")



  const articulos =  fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then(data=>{
                let hombre = data.filter(elem => elem.category == "men's clothing")
                console.log(hombre)
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
