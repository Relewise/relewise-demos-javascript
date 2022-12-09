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
            <span class="block text-gray-500">{{product.productId}} <span class="text-xs">(Rank: {{product.rank}})</span></span>
            <a :href="`/product?id=${product.productId}`" :class="product.displayName ? '' : 'text-red-300 hover:text-red-500'">
                {{product.displayName ?? 'No DisplayName is mapped for the product'}}
            </a>
        </div>
       
    </div>
</template>

<script lang="ts" setup>
import contextStore from '@/stores/context.store';
import { ProductResult } from '@relewise/client';
import { PropType, toRefs, defineProps } from 'vue';

const props = defineProps({products: { type: Array as PropType<ProductResult[]>} });

const context = contextStore.context;

const { products } = toRefs(props);
</script>
