<template>
  <section id="inventory-table" class="min-w-[70%] pl-5">
    <table class="table-auto w-full mx-auto">
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Producto</th>
          <th class="text-left">Stock</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>
            {{ product._id }}
          </td>
          <td>
            {{ product.name }}
          </td>
          <td>
            {{ product.stock }}
          </td>
          <td>
            <button class="mr-2 btn btn-blue" @click="productEditing = product; productEditing.index = index; editingProduct = true">Edit</button>
            <button class="btn btn-red" @click="removeProduct(product._id, index)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      @click="addingProduct = true"
      class="mt-5 btn btn-green"
    >New</button>

    <div 
      class="mt-5"
      v-if="addingProduct"
    >
      <h3 class="text-[28px] bold">Adding new product</h3>
      <input 
        type="text"
        placeholder="name" 
        v-model="newProduct.name"  
      />

      <input
        type="number"
        placeholder="stock"
        v-model="newProduct.stock"
      />

      <button class="actionButtons btn btn-red" @click="addingProduct = false">Close</button>
      <button class="actionButtons btn btn-green" @click="addProduct">Add</button>
    </div>

    <div 
      class="mt-5"
      v-if="editingProduct"
    >
      <h3 class="text-[28px] bold">Editing product</h3>
      <input 
        type="text"
        placeholder="name" 
        v-model="productEditing.name"  
      />

      <input
        type="number"
        placeholder="stock"
        v-model="productEditing.stock"
      />

      <button class="actionButtons btn btn-red" @click="editingProduct = false">Close</button>
      <button class="actionButtons btn btn-green" @click="editProduct(productEditing._id, productEditing.index)">Edit</button>
    </div>
  </section>
</template>

<script>
  import { ref } from '@vue/reactivity'
  import { onMounted } from '@vue/runtime-core';
  export default {
    name: 'InventoryTable',
    
    setup() {

      const products = ref([]);

      const addingProduct = ref(false);
      const editingProduct = ref(false);

      const newProduct = ref({
        name: '',
        stock: 0
      });
      
      let productEditing = ref({});

      const getProducts = async () => {
        const res = await fetch(`${process.env.VUE_APP_API_BASE}/products`);
        const data = await res.json();
        console.log(data);
        products.value = data;
      }

      const addProduct = async () => {
        const res = await fetch(`${process.env.VUE_APP_API_BASE}/products/new-product`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...newProduct.value
          })
        });

        const data = await res.json();
        products.value.push(data);

        newProduct.value = {}
        addingProduct.value = false;
      }

      const editProduct = async (id, index) => {
        const res = await fetch(`${process.env.VUE_APP_API_BASE}/products/edit-product/${id}`, {
          method: 'PUT',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...productEditing.value
          })
        });

        const data = await res.json();
        products.value[index] = data;

        newProduct.value = {}
        editingProduct.value = false;
      }

      const removeProduct = async (id, index) => {
        const res = await fetch(`${process.env.VUE_APP_API_BASE}/products/remove-product/${id}`, {
          method: 'DELETE'
        });

        const data = await res.json();
        
        products.value.splice(index, 1);
      }

      onMounted( () => {
        getProducts();
      });

      return {
        products,

        addingProduct,
        editingProduct,

        newProduct,
        productEditing,

        addProduct,
        removeProduct,
        editProduct
      }
    }

  }
</script>

<style scoped>
  input {
    border-bottom: 1px solid darkcyan;
    padding: 5px;
    margin-right: 1rem;
  }

  .actionButtons {
    margin-right: 1rem;
  }

</style>
