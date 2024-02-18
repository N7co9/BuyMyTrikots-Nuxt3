import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useSearch() {
    const searchId = ref('');
    const router = useRouter();

    function submitSearch() {
        router.push(`/browse/${searchId.value}`);
    }

    return {
        searchId,
        submitSearch
    };
}
