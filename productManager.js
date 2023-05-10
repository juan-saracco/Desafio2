const fs = require('fs');


class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }
    
    getProducts() {
        return this.products;
    }

    addProduct(product) {
        const id = this.generateId();
        const newProduct = { id, ...product };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }
    
        generateId() {
            if (this.products.length === 0) {
            return 1;
            }
            const lastProduct = this.products[this.products.length - 1];
            return lastProduct.id + 1;
        }

    loadProducts() {
        try {
        const data = fs.readFileSync(this.path, 'utf8');
        this.products = JSON.parse(data);
        } catch (error) {
        console.error('Error al cargar productos:', error);
        }
    }

    saveProducts() {
        try {
        const data = JSON.stringify(this.products, null, 2);        
        fs.writeFileSync(this.path, data, 'utf8');
        } catch (error) {
        console.error('Error al guardar productos:', error);
        }
    }

    getProductById(id) {
        return this.products.find((product) => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const product = this.getProductById(id);
        if (product) {
        Object.assign(product, updatedFields);
        this.saveProducts();
        }
        return product;
    }

    deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
        this.products.splice(index, 1);
        this.saveProducts();
        }
    }

    }
    

module.exports = ProductManager;

// Agrego 3 Productos

const productManager = new ProductManager('products.json');

const product1 = {
    title: 'remera',
    description: 'remera de algodon',
    price: '$6500',
    thumbnail: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/590/037/products/remera-negra11-0d1b10bfd65079e60e16679152177491-240-0.jpg',
    stock: 15,
};

const product2 = {
    title: 'Buzo',
    description: 'Abrigo de algodon',
    price: '$13500',
    thumbnail: 'https://diprin.com.ar/wp-content/uploads/2019/02/212102.jpg',
    stock: 100,
};

const product3 = {
    title: 'Pantalon',
    description: 'pantalon de algodon',
    price: '$12500',
    thumbnail:'https://http2.mlstatic.com/D_NQ_NP_757456-MLA43784475937_102020-O.jpg',
    stock: 100,
};

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

console.log('Products:', productManager.getProducts());

// Actualizamos Producto ID: 1

const updatedProduct = {
    title: 'Remera',
    price: '$20000',
};

productManager.updateProduct(1, updatedProduct);

console.log('Product with id 1:', productManager.getProductById(1));

// Borramos Producto ID: 2

productManager.deleteProduct(2);