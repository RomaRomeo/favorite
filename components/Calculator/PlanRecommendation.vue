<script setup lang="ts">
import { ModalPlansSubmit } from "#components";
import { internetPlans } from "~/data/internet-plans";

const props = defineProps<{
  category: string;
}>();

const modal = useModal();

type People = "1-2" | "3-4" | "5+";
type Usage = "light" | "work" | "heavy";
type Devices = "lt5" | "5-10" | "10+";
type Tv = "yes" | "no";
type Tier = "base" | "middle" | "high";

const people = ref<People>("1-2");
const usage = ref<Usage>("light");
const devices = ref<Devices>("lt5");
const tv = ref<Tv>("no");

const result = ref<{ plan: Plan; explanation: string } | null>(null);

const planNames: Record<Tier, string> = {
  base: "Базовий",
  middle: "Стандартний",
  high: "Ультра",
};

function plansForCategory(category: string): Plan[] {
  return internetPlans.filter((p) => p.category === category && p.type === "інтернет");
}

function tierFromAnswers(p: People, u: Usage, d: Devices, t: Tv): { tier: Tier; tvBoosted: boolean } {
  let tier: Tier;
  if (u === "heavy" || d === "10+" || p === "5+") {
    tier = "high";
  }
  else if (u === "work" || p === "3-4" || d === "5-10") {
    tier = "middle";
  }
  else {
    tier = "base";
  }

  let tvBoosted = false;
  if (t === "yes" && tier === "base") {
    tier = "middle";
    tvBoosted = true;
  }

  return { tier, tvBoosted };
}

function pickPlan(category: string, tier: Tier): Plan | undefined {
  return plansForCategory(category).find((plan) => plan.name === planNames[tier]);
}

function buildExplanation(tier: Tier, p: People, u: Usage, d: Devices, t: Tv, tvBoosted: boolean): string {
  const parts: string[] = [];

  if (tier === "high") {
    if (u === "heavy")
      parts.push("потрібне високе навантаження (ігри, 4K тощо)");
    if (d === "10+")
      parts.push("багато пристроїв у мережі");
    if (p === "5+")
      parts.push("велика кількість користувачів");
  }
  else if (tier === "middle") {
    if (u === "work")
      parts.push("робота, навчання та відеодзвінки");
    if (p === "3-4")
      parts.push("кілька людей вдома");
    if (d === "5-10")
      parts.push("помірна кількість пристроїв");
    if (tvBoosted)
      parts.push("підключення ТБ краще поєднується з тарифом вище базового");
  }
  else {
    parts.push("переважно соцмережі, YouTube та перегляд сайтів");
    parts.push("невелика кількість людей і пристроїв");
  }

  if (t === "yes" && tier !== "base" && !tvBoosted)
    parts.push("додатково враховано бажання дивитися ТБ");

  const detail = parts.length ? parts.join("; ") : "ваші відповіді";
  const tierLabel =
    tier === "high"
      ? "найвищий тариф з лінійки"
      : tier === "middle"
        ? "середній тариф з лінійки"
        : "базовий тариф з лінійки";

  return `Ми рекомендуємо ${tierLabel}, оскільки ${detail}.`;
}

function onPickPlan() {
  const { tier, tvBoosted } = tierFromAnswers(
    people.value,
    usage.value,
    devices.value,
    tv.value,
  );
  const plan = pickPlan(props.category, tier);
  if (!plan) {
    result.value = null;
    return;
  }
  result.value = {
    plan,
    explanation: buildExplanation(
      tier,
      people.value,
      usage.value,
      devices.value,
      tv.value,
      tvBoosted,
    ),
  };
}

function onConnectTariff() {
  if (!result.value) return;
  modal.open(ModalPlansSubmit, result.value.plan);
}

function clearResult() {
  result.value = null;
}

watch(
  () => props.category,
  () => {
    result.value = null;
  },
);

const peopleOptions: { value: People; label: string }[] = [
  { value: "1-2", label: "1–2" },
  { value: "3-4", label: "3–4" },
  { value: "5+", label: "5+" },
];

const usageOptions: { value: Usage; label: string }[] = [
  { value: "light", label: "Соцмережі, YouTube, серфінг" },
  { value: "work", label: "Робота, навчання, відеодзвінки" },
  { value: "heavy", label: "Ігри, 4K, велике навантаження" },
];

const deviceOptions: { value: Devices; label: string }[] = [
  { value: "lt5", label: "До 5" },
  { value: "5-10", label: "5–10" },
  { value: "10+", label: "10+" },
];

const tvOptions: { value: Tv; label: string }[] = [
  { value: "yes", label: "Так" },
  { value: "no", label: "Ні" },
];

const questionBlocks = [
  {
    step: 1,
    icon: "i-heroicons-user-group-20-solid",
    title: "Скільки людей користується інтернетом?",
    variant: "pills" as const,
    options: peopleOptions,
    model: "people" as const,
  },
  {
    step: 2,
    icon: "i-heroicons-sparkles-20-solid",
    title: "Для чого переважно потрібен інтернет?",
    variant: "stack" as const,
    options: usageOptions,
    model: "usage" as const,
  },
  {
    step: 3,
    icon: "i-heroicons-squares-2x2-20-solid",
    title: "Скільки пристроїв у вашому домі?",
    variant: "pills" as const,
    options: deviceOptions,
    model: "devices" as const,
  },
  {
    step: 4,
    icon: "i-heroicons-tv-20-solid",
    title: "Чи потрібне вам ТБ?",
    variant: "pills" as const,
    options: tvOptions,
    model: "tv" as const,
  },
];

function isOptionSelected(model: string, value: string): boolean {
  if (model === "people")
    return people.value === value;
  if (model === "usage")
    return usage.value === value;
  if (model === "devices")
    return devices.value === value;
  return tv.value === value;
}

function setOption(model: string, value: string) {
  if (model === "people")
    people.value = value as People;
  else if (model === "usage")
    usage.value = value as Usage;
  else if (model === "devices")
    devices.value = value as Devices;
  else
    tv.value = value as Tv;
  clearResult();
}

</script>

<template>
  <section
    class="relative mt-14 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50/90 via-white to-blue-50/35 shadow-lg shadow-slate-200/40 ring-1 ring-slate-200/60 overflow-hidden"
    aria-labelledby="plan-calc-title"
  >
    <div class="relative px-5 pt-8 pb-5 md:px-8 md:pt-9 md:pb-6 border-b border-slate-100/90 bg-white/40 backdrop-blur-[2px]">
      <div class="flex flex-col sm:flex-row sm:items-start gap-4">
        <div class="min-w-0 flex-1">
          <span class="inline-block text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-2 ring-1 ring-blue-100">
            Підбір тарифу
          </span>
          <h3 id="plan-calc-title" class="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Підберемо тариф за 30 секунд
          </h3>
          <p class="text-sm text-slate-500 mt-1.5 leading-relaxed max-w-2xl">
            Відповідайте чесно — підказка базується на тих самих тарифах, що й список вище.
          </p>
        </div>
      </div>
    </div>

    <div class="p-5 md:p-8 md:pt-7">
      <div class="space-y-4">
        <div
          v-for="block in questionBlocks"
          :key="block.step"
          class="rounded-2xl border border-slate-100 bg-white/70 p-4 md:p-5 shadow-sm shadow-slate-200/30"
        >
          <div class="flex items-center gap-3 mb-3.5">
            <span class="shrink-0 flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold text-blue-700 bg-blue-100/90 ring-1 ring-blue-200/60">
              {{ block.step }}
            </span>
            <div class="min-w-0 flex-1 pt-0.5">
              <p class="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <UIcon :name="block.icon" class="w-4 h-4 text-blue-600 shrink-0" />
                {{ block.title }}
              </p>
            </div>
          </div>

          <div v-if="block.variant === 'pills'" class="flex flex-wrap gap-2">
            <button
              v-for="opt in block.options"
              :key="String(opt.value)"
              type="button"
              :class="[
                'min-h-[44px] px-4 py-2.5 text-sm font-semibold rounded-full border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2',
                isOptionSelected(block.model, opt.value) ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-600 shadow-md shadow-blue-600/20' : 'bg-white/90 text-slate-600 border-slate-200/90 shadow-sm hover:border-blue-300/80 hover:bg-blue-50/50 hover:text-slate-800',
              ]"
              @click="setOption(block.model, opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
          <div v-else class="flex flex-col sm:flex-row gap-2">
            <button
              v-for="opt in block.options"
              :key="String(opt.value)"
              type="button"
              :class="[
                'min-h-[48px] px-4 py-3 text-sm font-medium text-left rounded-xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 sm:flex-1 sm:min-w-0',
                isOptionSelected(block.model, opt.value) ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-600 shadow-md shadow-blue-600/20' : 'bg-white/90 text-slate-600 border-slate-200/90 shadow-sm hover:border-blue-300/80 hover:bg-blue-50/50 hover:text-slate-800',
              ]"
              @click="setOption(block.model, opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <UButton
          icon="i-heroicons-magnifying-glass-20-solid"
          label="Підібрати тариф"
          color="primary"
          size="xl"
          class="w-full sm:w-auto justify-center font-semibold bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
          @click="onPickPlan"
        />
      </div>

      <div
        v-if="result"
        class="mt-8 rounded-2xl border border-blue-200/60 bg-gradient-to-b from-white via-blue-50/40 to-blue-50/70 p-6 md:p-8 ring-1 ring-blue-400/25 shadow-lg shadow-blue-500/10"
      >
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-blue-100/80">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
              Рекомендовано для вас
            </p>
            <h4 class="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {{ result.plan.name }}
            </h4>
            <p
              v-if="result.plan.description"
              class="mt-1.5 text-sm text-slate-500 line-clamp-2"
            >
              {{ result.plan.description }}
            </p>
          </div>
          <div class="flex flex-col gap-3 sm:items-end sm:text-right shrink-0">
            <span
              class="inline-flex items-center gap-1.5 self-start sm:self-end font-medium px-3.5 py-2 rounded-full text-blue-800 bg-blue-100/90 ring-1 ring-blue-200/50"
            >
              <UIcon name="i-heroicons-bolt-20-solid" class="w-4 h-4 text-blue-600" />
              {{ result.plan.speed }}
            </span>
            <div>
              <span class="text-3xl font-extrabold text-slate-900 tabular-nums">{{ result.plan.price }}</span>
              <span class="text-slate-400 font-medium text-sm ml-1">/міс</span>
            </div>
          </div>
        </div>

        <ul v-if="result.plan.features?.length" class="mt-5 grid sm:grid-cols-2 gap-2.5">
          <li
            v-for="feat in result.plan.features.slice(0, 4)"
            :key="feat"
            class="flex items-start gap-2 text-sm text-slate-600"
          >
            <UIcon name="i-heroicons-check-circle-20-solid" class="w-5 h-5 shrink-0 text-blue-500 mt-0.5" />
            <span>{{ feat }}</span>
          </li>
        </ul>

        <div class="mt-5 pl-4 border-l-4 border-blue-400/70 rounded-r-lg bg-slate-50/80 py-3 pr-3">
          <p class="text-sm text-slate-600 leading-relaxed">
            {{ result.explanation }}
          </p>
        </div>

        <UButton
          icon="i-heroicons-paper-airplane-20-solid"
          label="Залишити заявку"
          color="primary"
          size="xl"
          class="mt-6 w-full sm:w-auto justify-center font-semibold bg-blue-600 hover:bg-blue-700"
          @click="onConnectTariff"
        />
      </div>
    </div>
  </section>
</template>
