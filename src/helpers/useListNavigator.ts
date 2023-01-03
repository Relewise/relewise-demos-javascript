import { onMounted, onUnmounted, Ref, ref } from 'vue';

export function useListNavigator(items: Ref<any[]>, callback: (item: any) => void) {
    const index = ref(0);

    // a composable can update its managed state over time.
    function update(event: KeyboardEvent) {
        const code = event.code ?? event.key;

        if (items.value.length <= 1 && code !== 'Enter') {
            index.value = 0;
            return;
        }

        if (code === 'ArrowDown') {
            index.value = index.value === items.value.length - 1 ? 0 : index.value + 1;
        }
        else if (code === 'ArrowUp') {
            index.value = index.value === 0 ? items.value.length - 1 : index.value - 1;
        }
        else if (code === 'Enter') {
            callback(items.value[index.value]);
        }
    }

    function reset() {
        index.value = 0;
    }

    // a composable can also hook into its owner component's
    // lifecycle to setup and teardown side effects.
    onMounted(() => window.addEventListener('keydown', update));
    onUnmounted(() => window.removeEventListener('keydown', update));

    // expose managed state as return value
    return { index, reset };
}
