<template>
    <div class="home">

        <h1 class="mb-8">Settings</h1>
        
        <template v-if="datasets.length > 1">
            <label class="text-sm block">Select dataset</label>
            <select :value="context.datasetId" class="mb-6"  @change="setDataset($event.target.value)">
                <option :value="dataset.datasetId" v-for="dataset in datasets" :key="dataset.datasetId">
                    {{dataset.displayName}} ({{dataset.datasetId}})
                </option>
            </select>

            <hr class="mb-6"/>
        </template>

        <label class="text-sm block">Name</label>
        <input
            v-model="context.displayName"
            type="text"
            placeholder="Name">

        <label class="text-sm block mt-6">Dataset Id</label>
        <input
            v-model="context.datasetId"
            type="text"
            placeholder="Dataset id">

        <label class="text-sm  block mt-6">API Key</label>
        <input
            v-model="context.apiKey"
            type="text"
            placeholder="Api key">

        <label class="text-sm  block mt-6">Server Url</label>
        <input
            v-model="context.serverUrl"
            type="text"
            placeholder="Server Url - leave blank if in doubt">

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

        <div class="mt-4">
            <button class="px-6 py-2 font-semibold text-sm bg-gray-500 text-white rounded-full shadow-sm mr-4" @click="addEmptyDataset">Add new dataset</button>
            <button class="px-6 py-2 font-semibold text-sm bg-gray-500 text-white rounded-full shadow-sm" @click="shareLink">Get share link</button>
            <span class="ml-4 text-green-600" v-if="copied">
                Copied!
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import contextStore, { IDataset } from '@/stores/context.store';
import { ref } from 'vue';

const saved = ref(false);
const copied = ref(false);
const context = contextStore.context;
const datasets = contextStore.datasets;

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('share')) {
        const parsedFromUrl = atob(params.get('share')!);
        const settings =  JSON.parse(parsedFromUrl);

        contextStore.addDataset(settings);

        contextStore.persistState();
        const url = new URL(window.location.href);
        url.searchParams.delete('share');
        history.replaceState(null, '', url);
    }
}

init();

function setDataset(datasetId: string) {
    contextStore.setDataset(datasetId);
}

function save() {
    contextStore.persistState();

    saved.value = true;
    setTimeout(() => saved.value = false, 3000);
}

function addEmptyDataset() {
    contextStore.addDataset({
        displayName: '',
        apiKey: '',
        datasetId: '',
        serverUrl:'',
        currencyCode: '',
        language: '',
    });

    contextStore.setDataset('');
}

function shareLink() {

    const model: IDataset = {
        displayName: context.value.displayName,
        apiKey: context.value.apiKey,
        datasetId: context.value.datasetId,
        serverUrl:context.value.serverUrl,
        currencyCode: context.value.currencyCode,
        language: context.value.language,
        imageUrlDataKey: context.value.imageUrlDataKey,
    };

    navigator.clipboard.writeText(window.location.href+'?share='+btoa(JSON.stringify(model)));
    copied.value = true;
    setTimeout(() => copied.value = false, 3000);
}
</script>
