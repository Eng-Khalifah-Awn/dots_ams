import { ref } from "vue";

/**
 * useLoadingProgress composable to manage loading state and percentage.
 */
export function useLoadingProgress(totalSteps) {
    const loading = ref(true); // Spinner state
    const loadingPercentage = ref(0); // Loading percentage
    let currentStep = 0; // Track current progress step

    const updateLoadingPercentage = () => {
        currentStep++;
        loadingPercentage.value = Math.round((currentStep / totalSteps) * 100);
    };

    const resetLoading = () => {
        currentStep = 0;
        loadingPercentage.value = 0;
        loading.value = true;
    };

    const completeLoading = () => {
        loading.value = false;
        loadingPercentage.value = 0
    };

    return {
        loading,
        loadingPercentage,
        updateLoadingPercentage,
        resetLoading,
        completeLoading,
    };
}
