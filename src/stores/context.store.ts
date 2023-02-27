import { Searcher, Settings, User, UserFactory, Recommender, SelectedProductPropertiesSettings } from '@relewise/client';
import { computed, reactive } from 'vue';

type Classification = {
    key: string;
    value: string;
};

export interface IDataset {
    datasetId: string;
    apiKey: string;
    displayName?: string|null;
    language: string;
    currencyCode: string;
    imageUrlDataKey?: string;
}

export interface IImpersonation {
    temporaryId?: string;
    authenticatedId?: string;
}

export interface IAppContext {
    impersonation: IImpersonation;
    classifications?: Classification[];
    selectedDatasetIndex: number;
    datasets: IDataset[];
}

export interface IAppErrorContext {
    datasetIdError: boolean;
    apiKeyError: boolean;
}

class AppContext {
    private readonly localStorageName = 'appContextV2';
    private state = reactive<IAppContext>({ datasets: [{datasetId: '', apiKey: '', language: '', currencyCode: ''}], selectedDatasetIndex: 0, impersonation: {} });
    private errorState = reactive<IAppErrorContext>({ datasetIdError: false, apiKeyError: false });

    constructor() {
        const storedContext = localStorage.getItem(this.localStorageName);

        if (storedContext) {
            Object.assign(this.state, JSON.parse(storedContext));
        }
    }

    public get context() {
        return computed(() => this.state.datasets[this.state.selectedDatasetIndex]);
    }

    public get datasets() {
        return computed(() => this.state.datasets);
    }

    public get impersonation() {
        return computed(() => this.state.impersonation);
    }

    public get apiKeyError() {
        return computed(() => this.errorState.apiKeyError);
    }

    public get datasetIdError() {
        return computed(() => this.errorState.datasetIdError);
    }

    public get defaultSettings(): Settings {
        if (this.state.selectedDatasetIndex < -1) {
            throw new Error('Missing language or currencycode');
        }

        return {
            language: this.context.value.language,
            currency: this.context.value.currencyCode,
            displayedAtLocation: 'Relewise Demo App',
            user: this.getUser(),
        };
    }

    public get selectedProductProperties(): SelectedProductPropertiesSettings {
        return {
            displayName: true,
            allData: true,
            brand: true,
            categoryPaths: true,
            pricing: true,
        } as SelectedProductPropertiesSettings;
    }

    public getSearcher(): Searcher {
        if (!this.context.value.apiKey || !this.context.value.datasetId) {
            throw new Error('Missing apiKey or datasetId');
        }
        return new Searcher(this.context.value.datasetId, this.context.value.apiKey);
    }

    public getRecommender(): Recommender {
        if (!this.context.value.apiKey || !this.context.value.datasetId) {
            throw new Error('Missing apiKey or datasetId');
        }
        return new Recommender(this.context.value.datasetId, this.context.value.apiKey);
    }

    public persistState() {
        localStorage.setItem(this.localStorageName, JSON.stringify(this.state));
    }

    public isConfigured() {
        return this.context.value.datasetId && this.context.value.apiKey && this.context.value.currencyCode && this.context.value.language;
    }

    public addClassification() {
        if (!this.state.classifications)
            this.state.classifications = [];

        this.state.classifications.push({ value: '', key: '' });
        this.persistState();
    }

    public addDataset(newDataset: IDataset) {
        if (!localStorage.getItem(this.localStorageName)) {
            // when first coming here via share link we want to remove the default created dataset
            this.state.datasets = [];
        }

        this.state.datasets.push(newDataset);
        this.setDataset(newDataset.datasetId);
    }

    public setDataset(datasetId: string) {
        this.impersonation.value.authenticatedId = undefined;
        this.impersonation.value.temporaryId = undefined;
        
        this.state.selectedDatasetIndex = this.state.datasets.map(e => e.datasetId).indexOf(datasetId);
        this.persistState();
    }

    public assertApiCall(response: any|undefined) {
        console.log(response, response.status === 401, response.status === 404);
        if (response.status === 401) {
            this.errorState.datasetIdError = false;
            this.errorState.apiKeyError = true;
        }
        else if (response.status === 404) {
            this.errorState.datasetIdError = true;
            this.errorState.apiKeyError = false;
        }
        else {
            this.errorState.datasetIdError = false;
            this.errorState.apiKeyError = false;
        }
    }

    private getUser() {

        if (this.state.impersonation.authenticatedId && this.state.impersonation.authenticatedId !== '') {
            return UserFactory.byTemporaryId(this.state.impersonation.authenticatedId);
        }

        if (this.state.impersonation.temporaryId && this.state.impersonation.temporaryId !== '') {
            return UserFactory.byTemporaryId(this.state.impersonation.temporaryId);
        }

        const user: User = UserFactory.anonymous();

        if (this.state.classifications) {
            user.classifications = this.state.classifications.reduce((prev, cur) => { prev[cur.key] = cur.value; return prev; }, {} as Record<string, string>);
        }

        return user;
    }
}

export default new AppContext();