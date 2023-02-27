<template>
    <div class="search">
        <h1 class="mb-5">Popular search terms</h1>
        <!-- <div class="mb-5">
            <input type="text" v-model="searchTerm" @keydown.enter="search" placeholder="Search Term">
        </div> -->

        <div v-if="result">
            <div v-for="prediction in result.recommendations" :key="prediction.term ?? ''" class="mb-1 pb-1 flex border-b border-solid border-gray-300"> 
                {{ prediction.term }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PopularSearchTermsRecommendationBuilder, SearchTermRecommendationResponse } from '@relewise/client';
import { ref, Ref } from 'vue';
import contextStore from '@/stores/context.store';

const result: Ref<SearchTermRecommendationResponse | undefined> = ref<SearchTermRecommendationResponse | undefined>(undefined);
const searchTerm: Ref<string> = ref<string>('');
const usedSearchTerm: Ref<string> = ref<string>('');

const recommender = contextStore.getRecommender();

search();

async function search() {

    usedSearchTerm.value = searchTerm.value;

    const request = new PopularSearchTermsRecommendationBuilder(contextStore.defaultSettings)
        .setTerm(searchTerm.value)
        .addEntityType('Product')
        .build();

    const response: SearchTermRecommendationResponse|undefined = await recommender.recommendPopularSearchTerms(request);
    contextStore.assertApiCall(response);

    result.value = response;
}
</script>
