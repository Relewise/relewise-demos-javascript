<template>
    <div class="home">

        <h1 class="text-4xl text-semibold mb-8">Setup the demo app here!</h1>

        <label class="text-sm">Dataset Id</label>
        <input
            v-model="context.datasetId"
            type="text"
            placeholder="Dataset id">

        <label class="text-sm  block mt-6">API Key</label>
        <input
            v-model="context.apiKey"
            type="text"
            placeholder="Api key">

        <label class="text-sm  block mt-6">Language</label>
        <input
            v-model="context.language"
            type="text"
            placeholder="LanguageCode">

        <label class="text-sm block mt-6">Currency</label>
        <input
            v-model="context.currencyCode"
            type="text"
            placeholder="CurrencyCode">

        <label class="text-sm block mt-6">Image Url Data Key Name</label>
        <input
            v-model="context.imageUrlDataKey"
            type="text"
            placeholder="Image Url Data Key Name">

        <div class="mt-4">
            <button class="px-6 py-2 font-semibold text-sm bg-brand-500 text-white rounded-full shadow-sm" @click="save">Save</button>

            <span class="ml-4 text-green-600" v-if="saved">
                Settings have been saved.
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import contextStore from '@/stores/context.store';
import { ref } from 'vue';

const saved = ref(false);
const context = contextStore.context;

function save() {
    contextStore.persistState();

    saved.value = true;
    setTimeout(() => saved.value = false, 3000);
}
</script>
