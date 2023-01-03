<template>
    <div 
        v-for="product in products" 
        :key="product.productId!" 
        class="mb-1 pb-1 flex border-b border-solid border-gray-300">

        <img 
            v-if="product.data && context.imageUrlDataKey" 
            height="75" 
            width="75" 
            :src="product.data[context.imageUrlDataKey]?.value ?? '/512x512.png'" 
            class="mr-3" />

        <div>
            <span class="block text-gray-500">
                {{product.productId}} 
                <span class="text-xs">(Rank: {{product.rank}})</span>
            </span>
            <div class="flex gap-2 items-center">
                <router-link :to="{ name: 'product', query: { id: product.productId } }" :class="product.displayName ? '' : 'italic'">
                    {{product.displayName ?? 'No DisplayName'}}
                </router-link>
                <BarsArrowUpIcon v-if="showDetails == product.productId"  @click="toggleDetails(product)" class="h-4 w-4 text-gray-500 inline-block cursor-pointer" />
                <BarsArrowDownIcon v-else @click="toggleDetails(product)" class="h-4 w-4 text-gray-500 inline-block cursor-pointer" />
            </div>
            <Transition >
                <pre v-if="showDetails == product.productId" class="bg-gray-100 text-gray-700 text-sm p-3 my-3">{{ prettyJson(product) }}</pre>
            </Transition>
            
        </div>
       
    </div>
</template>

<script lang="ts" setup>
import contextStore from '@/stores/context.store';
import { ProductResult } from '@relewise/client';
import { PropType, toRefs, defineProps, ref } from 'vue';
import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/vue/24/solid'; 

const props = defineProps({products: { type: Array as PropType<ProductResult[]>} });

const context = contextStore.context;
const showDetails = ref<string | null | undefined>(null);

const { products } = toRefs(props);

function toggleDetails(product: ProductResult) {

    if(showDetails.value === product.productId) {
        showDetails.value = null;
    }
    else {
        showDetails.value = product.productId; 
    }
}

function prettyJson(product: ProductResult) {
    return JSON.stringify(product, undefined, 4);
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    will-change: height, opacity;
    transition: height 0.2s ease, opacity 0.1s ease-in;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    height: 0 !important;
}
</style>
