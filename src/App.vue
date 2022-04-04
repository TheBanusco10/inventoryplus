<template>
  <h1 class="text-center text-[35px] uppercase">Inventory Plus</h1>
  
  <section v-if="user.length" id="principal" class="flex flex-wrap justify-around mt-5">
    <InventoryTable />
    <User />
  </section>

  <section v-else id="login" class="pl-5">
    <h2>Login</h2>

    <input v-model="loginData.email" type="email" placeholder="Email">
    <input v-model="loginData.password" type="password" placeholder="Password">
    
    <button @click="login">Login</button>

    <!-- <input type="text" placeholder="Name"> -->
  </section>
</template>

<script>
import { ref } from '@vue/reactivity'
import InventoryTable from './components/InventoryTable.vue'
import User from './components/User.vue'

export default {
  name: 'App',
  components: {
    InventoryTable,
    User
  },

  setup() {
    const user = ref({});

    const loginData = ref({
      email: '',
      password: ''
    });

    const registerData = ref({
      name: '',
      email: '',
      password: ''
    });

    const login = async () => {
      const res = await fetch(`${process.env.VUE_APP_API_BASE}/user/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: loginData.value.email,
          password: loginData.value.password
        })
      });

      const data = await res.json();

      console.log(data);

      if (data.status === 200) {
        user = data.user;
      }


    }

    return {
      user,
      loginData,

      login
    }
  }

}
</script>

<style>

  :root {

    --success-color: #198754;
    --success-color-hover: #1d995f;


    --primary-color: #0d6efd;
    --primary-color-hover: #237bff;

    --danger-color: #dc3545;
    --danger-color-hover: #e8384a;

    
  }

  input {
    border-bottom: 1px solid darkcyan;
    padding: 5px;
    margin-right: 1rem;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;
  }

  button:active {
    outline: none;
  }

  .btn {
    width: 100px;
    padding: 5px;

    background: none;

    border: none;

    transition: all .3s;
  }

  .btn:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, .2);
  }

  .btn-icon {
    padding: 5px;

    border-radius: 9999px;
    border: none;

    transition: all .3s;
  }

  .btn-success {
    color: var(--success-color);

    border: 1px solid var(--success-color);
  }

  .btn-success:hover {
    background-color: var(--success-color-hover);

    color: white;
  }

  .btn-danger {
    background-color: var(--danger-color);
    color: white;
  }

  .btn-danger:hover {
    background-color: var(--danger-color-hover);
  }

  .btn-primary {
    background-color: var(--primary-color);
    color: white;
  }

  .btn-primary:hover {
    background-color: var(--primary-color-hover);
  }

</style>
