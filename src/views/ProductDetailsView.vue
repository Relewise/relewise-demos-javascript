<template>
    <div class="search">

        <div class="mb-6">
            <input type="text" v-model="productId" @keydown.enter="recommend" placeholder="Enter product id to see recommendations" />
        </div>

        <div v-if="result?.responses">
            <div v-for="(response, index) in result?.responses" :key="index" class="mb-10">
                <div class="my-3">
                    <div class="text-2xl font-semibold">{{(index === 0 ? "Purchased with" : "Products viewed after viewing")}}</div>
                </div>
                <Products :products="response?.recommendations ?? []"></Products>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>import { ref, Ref } from 'vue';
import Products from '@/components/Products.vue';
import { ProductRecommendationRequestCollection, ProductRecommendationResponseCollection, PurchasedWithProductBuilder, ProductsRecommendationCollectionBuilder, ProductsViewedAfterViewingProductBuilder } from '@relewise/client';
import contextStore from '@/stores/context.store';

const result: Ref<ProductRecommendationResponseCollection | undefined> = ref<ProductRecommendationResponseCollection | undefined>({} as ProductRecommendationResponseCollection);
const productId: Ref<string> = ref<string>('');
const recommender = contextStore.getRecommender();

function init() {
    const searchParams = new URLSearchParams(window.location.search);

    const id = searchParams.get('id');
    if (id) {
        productId.value = id;
        recommend();
    }
}

init();

async function recommend() {
    const dataKeys = contextStore.context.value.imageUrlDataKey 
        ? [ contextStore.context.value.imageUrlDataKey ] 
        : [];

    const request: ProductRecommendationRequestCollection = new ProductsRecommendationCollectionBuilder()
        .addRequest(new PurchasedWithProductBuilder(contextStore.defaultSettings).setProductProperties({ displayName: true, dataKeys }).product({ productId: productId.value }).build())
        .addRequest(new ProductsViewedAfterViewingProductBuilder(contextStore.defaultSettings).setProductProperties({ displayName: true, dataKeys }).product({ productId: productId.value }).build())
        .build();

    const response: ProductRecommendationResponseCollection | undefined = await recommender.batchProductRecommendations(request);

    result.value = response;
}

</script>
