const express = require("express");
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");
const router = express.Router();


//http://localhost:8080/api/products?limit=2

router.get("/", async (req, res) => {
    const limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();
        if (limit) {
            res.send(arrayProductos.slice(0, limit));
        } else {
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})



router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const producto = await manager.getProductById(parseInt(id));

        if (!producto) {
            res.send("Producto no encontrado");
        } else {
            res.send(producto);
        }
    } catch (error) {
        res.send("Error al buscar ese id en los productos");
    }
})




router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    
    try {
        await manager.addProduct(nuevoProducto); 

        res.status(201).send("Producto agregado exitosamente"); 
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
})

router.put("/", async (req, res) => {
    const actualizarProducto = req.body;
    
    try {
        const arrayProductos = await this.leerArchivo(); 
        
        const index = arrayProductos.findIndex( item => item.id === id); 
        
        if(index !== -1) {
            arrayProductos[index] = {...arrayProductos[index], ...productoActualizado} ; 
            await this.guardarArchivo(arrayProductos); 
            console.log("Producto actualizado"); 
        } else {
            console.log("No se encuentra el producto"); 
        }
    } catch (error) {
        console.log("Tenemos un error al actualizar productos"); 
    }
})

router.delete("/", async (req, res) => {
    try {
        const arrayProductos = await this.leerArchivo(); 

        const index = arrayProductos.findIndex( item => item.id === id); 

        if(index !== -1) {
            arrayProductos.splice(index, 1); 
            await this.guardarArchivo(arrayProductos); 
            console.log("Producto eliminado"); 
        } else {
            console.log("No se encuentra el producto"); 
        }
    } catch (error) {
        console.log("Tenemos un error al eliminar productos"); 
    }

})


module.exports = router; 