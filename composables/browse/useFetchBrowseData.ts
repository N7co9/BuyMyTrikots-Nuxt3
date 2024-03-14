export async function useFetchBrowseData() {
    const route = useRoute();
    const id = route.params.id;
    try {
        const response = await fetch(`http://localhost:8000/home/browse/${id}`);
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
            return await jsonResponse.content;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
