<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();

const loading = ref(true);

const onIframeError = () => {
  console.error("Error occurred while loading iframe content!");
  loading.value = false;
};

const onIframeLoad = () => {
  loading.value = false;
};
</script>

<template>
  <div class="relative w-full pt-[56.25%]">
    <BaseFrameSkeleton v-show="loading" />

    <iframe
      :src="props.src"
      title="Embedded Content"
      class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
      frameborder="0"
      @load="onIframeLoad"
      @error="onIframeError"
    />
  </div>
</template>
