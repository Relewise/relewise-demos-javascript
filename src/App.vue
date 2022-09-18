<template>
    <nav class="w-1/6 border-r border-solid border-gray-300">
        <h2 class="text-3xl font-bold mb-4">Relewise demo</h2>

        <div class="group__header">Search</div>
        <router-link to="/search">Product Search</router-link>

        <div class="group__header">Recommendations</div>
        <router-link to="/popular-products">Popular Products</router-link>
        <router-link to="/product">Product Details Page (PDP)</router-link>
        <router-link to="/popular-categories">Popular Categories</router-link>
        <router-link to="/popular-brands">Popular Brands</router-link>

        <div class="border-t border-b border-solid border-gray-300 py-2 mt-4">
            <label class="text-sm">AuthenticatedId</label>
            <input type="text" class="mb-3" v-model="context.authenticatedId" @keyup="save" />
            <label class="text-sm">TemporaryId</label>
            <input type="text" v-model="context.temporaryId" @keyup="save" class="mb-3" />

            <label class="text-sm block">Classifications</label>
            <template v-if="context.classifications">
                <div class="flex items-center gap-2" v-for="(cls, index) in context.classifications" :key="index">
                    <input type="text" class="mb-3" v-model="cls.key" @keyup="save" />
                    <input type="text" class="mb-3" v-model="cls.value" @keyup="save" />
                    <button @click="deleteClassification(index)" class="px-1 py-1 leading-none rounded-full bg-gray-600">x</button>
                </div>
            </template>
            <button @click="addClassification()">Add new</button>
        </div>

        <router-link to="/" class="ml-0 mt-4">Settings</router-link>
    </nav>

    <router-view class="w-5/6 p-5"/>
</template>

<script setup lang="ts">
import contextStore from './stores/context.store';

const context = contextStore.context;

function addClassification() {
    contextStore.addClassification();
}

function deleteClassification(index: number) {
    context.value.classifications?.splice(index, 1);
    save();
}

function save() {
    contextStore.persistState();
}

</script>

<style lang="less">
#app {
  @apply text-gray-800 font-sans flex-row items-stretch min-h-full;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: row;
}

html, body {   
  height: 100%;
  padding: 0;
  margin: 0; }

nav {
  @apply p-5;

  a {
    @apply ml-3 mb-2 no-underline;
    display: block;
    color: #2c3e50;

    &.router-link-exact-active {
      color: theme('colors.brand.500');
    }
  }

  .group__header {
    @apply mt-3 mb-2 font-semibold text-xl;
  }
}
</style>
