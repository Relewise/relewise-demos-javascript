<template>
    <div class="home">

        <h1 class="text-2xl font-semibold mb-5">Popular Categories</h1>

        <div 
            v-for="category in categories?.recommendations" 
            :key="category.categoryId" 
            class="py-2 flex border-b border-solid border-gray-300">
            <div>
                <span class="block text-gray-500">{{category.categoryId}} <span class="text-xs">(Rank: {{category.rank}})</span></span>
                {{category.displayName}}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import contextStore from '@/stores/context.store';
import { ProductCategoryRecommendationResponse, PopularProductCategoriesRecommendationBuilder } from '@relewise/client';
import { Ref, ref } from 'vue';

const recommender = contextStore.getRecommender();

const categories: Ref<ProductCategoryRecommendationResponse | undefined> = ref<ProductCategoryRecommendationResponse | undefined>({});

async function setup() {
    categories.value = await recommender.recommendPopularProductCategories(new PopularProductCategoriesRecommendationBuilder(contextStore.defaultSettings)
        .setProductCategoryProperties({ displayName: true })
        .setNumberOfRecommendations(10)
        .sinceMinutesAgo(1440)
        .build());
}

setup();

</script>
