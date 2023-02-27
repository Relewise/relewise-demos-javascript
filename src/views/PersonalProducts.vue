<template>
    <div class="search">
        <h1 class="mb-5">Personal Product Recommendations</h1>
        <div v-if="result">
            <Products :products="result?.recommendations ?? []"></Products>
        </div>
        <div v-if="invalid" class="text-red-600 italic">
            Missing Authenticated Id or Temporary Id
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref, watch } from 'vue';
import Products from '@/components/Products.vue';
import { PersonalProductRecommendationBuilder, ProductRecommendationResponse } from '@relewise/client';
import contextStore from '@/stores/context.store';
import { useDebounceFn } from '@vueuse/shared';

const invalid = ref<boolean>(false);
const result: Ref<ProductRecommendationResponse | undefined> = ref<ProductRecommendationResponse | undefined>({} as ProductRecommendationResponse);
const recommender = contextStore.getRecommender();

recommend();

async function recommend() {
    if (!contextStore.impersonation.value.authenticatedId && !contextStore.impersonation.value.temporaryId) {
        invalid.value = true;
        result.value = undefined;

        return;
    }
    else {
        invalid.value = false;
    }

    const request = new PersonalProductRecommendationBuilder(contextStore.defaultSettings)
        .setSelectedProductProperties(contextStore.selectedProductProperties)
        .setNumberOfRecommendations(30)
        .build();

    const response: ProductRecommendationResponse|undefined = await recommender.recommendPersonalProducts(request);
    contextStore.assertApiCall(response);

    result.value = response;
}

const debouncedRecommond = useDebounceFn(() => {
    recommend();
}, 1000);

watch(contextStore.impersonation.value, () => {
    debouncedRecommond();
}, { deep: true });
</script>
