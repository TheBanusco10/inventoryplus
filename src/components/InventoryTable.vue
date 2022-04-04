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
            <button class="mr-2 btn-icon btn-primary" @click="productEditing = product; productEditing.index = index; editingProduct = true">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button class="btn-icon btn-danger" @click="removeProduct(product._id, index)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      @click="addingProduct = true"
      class="mt-5 btn btn-success"
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

      <button class="actionButtons btn btn-danger" @click="addingProduct = false">Close</button>
      <button class="actionButtons btn btn-success" @click="addProduct">Add</button>
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

      <button class="actionButtons btn btn-danger" @click="editingProduct = false">Close</button>
      <button class="actionButtons btn btn-success" @click="editProduct(productEditing._id, productEditing.index)">Edit</button>
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
      
      const productEditing = ref({});

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
  .actionButtons {
    margin-right: 1rem;
  }

</style>
