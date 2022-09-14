import { Searcher, Settings, User, UserFactory, Recommender } from '@relewise/client';
import { computed, reactive } from 'vue';

type Classification = {
    key: string;
    value: string;
};

export interface IAppContext {
    datasetId: string;
    apiKey: string;
    language: string;
    currencyCode: string;
    temporaryId?: string;
    authenticatedId?: string;
    classifications?: Classification[];
    imageUrlDataKey?: string;
}

class AppContext {
[x: string]: any;
    private state = reactive<IAppContext>({ datasetId: '', apiKey: '', language: 'da-DK', currencyCode: 'DKK' });

    constructor() {
        const storedContext = localStorage.getItem('appContext');

        if (storedContext) {
            Object.assign(this.state, JSON.parse(storedContext));
        }
    }

    public get context() {
        return computed(() => this.state);
    }

    public get defaultSettings(): Settings {
        return {
            language: this.state.language,
            currency: this.state.currencyCode,
            displayedAtLocation: 'Relewise Demo App',
            user: this.getUser(),
        };
    }

    public getSearcher(): Searcher {
        if (!this.state.apiKey || !this.state.datasetId) {
            throw new Error('Missing apiKey or datasetId');
        }
        return new Searcher(this.state.datasetId, this.state.apiKey);
    }

    public getRecommender(): Recommender {
        if (!this.state.apiKey || !this.state.datasetId) {
            throw new Error('Missing apiKey or datasetId');
        }
        return new Recommender(this.state.datasetId, this.state.apiKey);
    }

    public persistState() {
        localStorage.setItem('appContext', JSON.stringify(this.state));
    }

    public isConfigured() {
        return this.state.datasetId && this.state.apiKey && this.state.currencyCode && this.state.language;
    }

    public addClassification() {
        if (!this.state.classifications)
            this.state.classifications = [];

        this.state.classifications.push({value: '', key: ''});
        this.persistState();
    }

    private getUser() {

        if (this.state.authenticatedId && this.state.authenticatedId !== '') {
            return UserFactory.byTemporaryId(this.state.authenticatedId);
        }

        if (this.state.temporaryId && this.state.temporaryId !== '') {
            return UserFactory.byTemporaryId(this.state.temporaryId);
        }

        const user: User = UserFactory.anonymous();

        if (this.state.classifications) {
            user.classifications = this.state.classifications.reduce((prev, cur) => { prev[cur.key] = cur.value; return prev; } , {} as Record<string, string>);
        }

        return user;
    }
}

export default new AppContext();