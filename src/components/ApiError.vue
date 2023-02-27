<template>
    <div v-if="showValidationError" class="mb-5 border-l-4 border-solid p-5 border-red-500 bg-red-100">
        <div v-if="missingDataset">
            <h3>No dataset is configured.</h3>
        </div>

        <div v-if="missingApiKeyOrDataset">
            <h3>Invalid configuration of dataset. Please provide dataset id and api key.</h3>
        </div>

        <div v-if="apiKeyError">
            <h3>Api Key is invalid or missing access</h3>
        </div>

        <div v-if="datasetIdError">
            <h3>Dataset does not exist</h3>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import contextStore from '@/stores/context.store';
import { computed } from 'vue';

const showValidationError = computed(() => notOnSettingsPage.value && (missingDataset.value || missingApiKeyOrDataset.value || datasetIdError.value || apiKeyError.value));

const notOnSettingsPage = computed(() => router.currentRoute.value.name !== 'settings');

const missingDataset = computed(() => contextStore.datasets.value.length <= 0);
const missingApiKeyOrDataset = computed(() => !contextStore.context.value.apiKey || !contextStore.context.value.datasetId);
const datasetIdError = contextStore.datasetIdError;
const apiKeyError = contextStore.apiKeyError;
</script>