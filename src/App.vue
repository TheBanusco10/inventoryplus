<template>
  <h1 class="text-center text-[35px] uppercase">Inventory Plus</h1>
  <section id="principal" class="flex flex-wrap justify-around mt-5">
    <InventoryTable />
    <User />
  </section>
</template>

<script>
import InventoryTable from './components/InventoryTable.vue'
import User from './components/User.vue'

export default {
  name: 'App',
  components: {
    InventoryTable,
    User
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;
  }

  .btn {
    width: 100px;
    padding: 5px;
    border-radius: 3px;

    transition: all .3s;
  }

  .btn-green {
    background-color: green;
    color: white;
  }

  .btn-green:hover {
    background-color: rgb(0, 143, 0);
  }

  .btn-red {
    background-color: rgb(178, 41, 41);
    color: white;
  }

  .btn-red:hover {
    background-color: rgb(194, 45, 45);
  }

  .btn-blue {
    background-color: rgb(35, 159, 201);
    color: white;
  }

  .btn-blue:hover {
    background-color: rgb(38, 173, 219);
  }

</style>
