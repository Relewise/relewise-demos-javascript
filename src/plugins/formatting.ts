import contextStore from '@/stores/context.store';
import { Plugin } from 'vue';

export const formatting: Plugin = {
    install: (app) => {
        app.config.globalProperties.$format = (value: number | null) => {
            if (!value) {
                return '';
            }

            try {
                return new Intl.NumberFormat(
                    contextStore.context.value.language,
                    {
                        style: 'currency',
                        currency: contextStore.context.value.currencyCode,
                    })
                    .format(value);
            }
            catch {
                console.warn(`Could not format price using the currency: '${contextStore.context.value.currencyCode}'`);
                return '';
            }
        };
    },
};