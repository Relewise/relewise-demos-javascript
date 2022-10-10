<template>
    <div class="home">

        <h1 class="text-2xl font-semibold mb-5">Popular brands</h1>

        <div 
            v-for="brand in brands?.recommendations" 
            :key="brand.id" 
            class="py-2 flex border-b border-solid border-gray-300">
            <div>
                <span class="block text-gray-500">{{brand.id}} <span class="text-xs">(Rank: {{brand.rank}})</span></span>
                {{brand.displayName}}
            </div>
        </div>        

    </div>
</template>

<script lang="ts" setup>
import contextStore from '@/stores/context.store';
import { BrandRecommendationResponse, PopularBrandsRecommendationBuilder } from '@relewise/client';
import { Ref, ref } from 'vue';

const recommender = contextStore.getRecommender();

const brands: Ref<BrandRecommendationResponse | undefined> = ref<BrandRecommendationResponse | undefined>({});

async function setup() {
    brands.value = await recommender.recommendPopularBrands(new PopularBrandsRecommendationBuilder(contextStore.defaultSettings)
        .setSelectedBrandProperties({ displayName: true })
        .sinceMinutesAgo(1440)
        .build());
}

setup();
</script>
