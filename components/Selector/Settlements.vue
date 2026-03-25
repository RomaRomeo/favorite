<script setup lang="ts">
import { settlements } from '~/data/settlements'

const props = withDefaults(defineProps<{
  modelValue?: string;
  variant?: "outline" | "subtle" | "soft" | "ghost" | "none";
  placeholder?: string;
  size?: "sm" | "md" | "xs" | "lg" | "xl";
  disabled?: boolean;
  mode?: 'all' | 'only-khodoriv' | 'exclude-khodoriv';
}>(), {
  mode: 'all',
});

const emit = defineEmits(["update:modelValue"]);
const innerValue = ref(props.modelValue);

watch(() => props.modelValue, (v) => { innerValue.value = v });

const updateValue = (newValue: string) => {
  innerValue.value = newValue;
  emit('update:modelValue', newValue);
};

const formattedSettlements = computed(() => {
  if (props.mode === 'only-khodoriv') return settlements.filter(i => i === 'Ходорів');
  if (props.mode === 'exclude-khodoriv') return settlements.filter(i => i !== 'Ходорів');
  return settlements;
});
</script>

<template>
  <USelect
    v-if="formattedSettlements?.length"
    v-model="innerValue"
    :items="formattedSettlements"
    :placeholder="props.placeholder || 'Виберіть зі списку'"
    :variant="props.variant"
    :size="props.size"
    :disabled="props.disabled"
    @update:modelValue="updateValue"
    icon="mdi:home-city-outline"
  />
</template>
