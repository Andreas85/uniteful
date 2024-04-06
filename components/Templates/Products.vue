<script setup lang="ts">
const { $api } = useNuxtApp();
const productRepo = productService($api);

const addProductRequest = async () => {
  try {
    const payload = {
      title: 'test product',
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic'

    }
    const response = await productRepo.post(payload);
  } catch (error) {
    console.log(error);
  }
};

const addProduct = () => {
  addProductRequest()
}

const todoStore = useTodosStore()
const { data: storeTodoData } = storeToRefs(todoStore)

</script>
<template>
  <div class="flex items-center justify-start gap-4">
    <button class="btn btn-secondary btn-sm" @click="addProduct()">Add product</button>
  </div>
  <AtomsBreadCrumb />
  <h2 v-for="(todo, index) in storeTodoData">
    <span class="font-bold">
      <NuxtLink :to="ROUTE_CONSTANTS.PRODUCTS + '/' + todo.id">
        {{ todo.id }}
      </NuxtLink>
    </span>
    {{ todo.title }}
  </h2>
</template>
