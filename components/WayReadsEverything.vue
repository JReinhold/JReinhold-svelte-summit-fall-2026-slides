<script setup lang="ts">
/**
 * The agent reads everything. A long list of tool calls (Grep and Read, each
 * with a file path) that fades out at the bottom: the list does not end.
 *
 * When the box appears (click `at`), the list scrolls by on its own: it speeds
 * up, blurs in the direction of the scroll, slows down and stops, with more
 * rows still below.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useSlideContext } from '@slidev/client';

const props = withDefaults(defineProps<{ at?: number }>(), { at: 2 });

const ui = ['Button', 'Card', 'Input', 'Field', 'Select', 'Checkbox', 'Tag', 'Badge', 'Dialog', 'Toast', 'Textarea', 'Avatar', 'Skeleton', 'EmptyState', 'Pagination', 'Header', 'Footer', 'Layout', 'ThemeToggle', 'ToastRegion'];
const blog = ['PostEditor', 'PostCard', 'PostFeed', 'PostFilters', 'PostMeta', 'PostView', 'PostResults', 'PostArticle', 'TagList', 'Markdown', 'ReadingStats', 'AppShell', 'DeletePostButton', 'NewPostsBanner'];

const first: [tool: string, target: string][] = [
  ['Grep', '"Button" src/'],
  ['Read', 'src/lib/ui/Button.svelte'],
  ['Read', 'src/lib/ui/tokens.css'],
  ['Read', 'src/lib/ui/Card.svelte'],
  ['Read', 'src/lib/ui/Input.svelte'],
  ['Read', 'src/lib/ui/Field.svelte'],
  ['Read', 'src/lib/ui/Select.svelte'],
  ['Grep', '"PostEditor" src/'],
  ['Read', 'src/lib/blog/posts.ts'],
];
// The rest of the app: every component, then every place that uses it.
const rest: [tool: string, target: string][] = [
  ...ui.slice(5).map((name): [string, string] => ['Read', `src/lib/ui/${name}.svelte`]),
  ...blog.flatMap((name): [string, string][] => [
    ['Grep', `"${name}" src/`],
    ['Read', `src/lib/blog/${name}.svelte`],
    ['Read', `src/lib/blog/${name}.stories.svelte`],
  ]),
  ...ui.flatMap((name): [string, string][] => [
    ['Grep', `"<${name}" src/`],
    ['Read', `src/lib/ui/${name}.stories.svelte`],
  ]),
];
const calls = [...first, ...rest];

const ROW = 25;
// Stop well before the end, so the fade at the bottom still has rows to hide.
const travel = (calls.length - 24) * ROW;
const duration = 3200;

const { $clicks } = useSlideContext();
const shown = computed(() => $clicks.value >= props.at);

const y = ref(0);
const blur = ref(0);
let frame = 0;

// Slow start, fast middle, slow end.
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function stop() {
  cancelAnimationFrame(frame);
  blur.value = 0;
}
function run() {
  stop();
  const start = performance.now();
  let last = 0;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const next = ease(t) * travel;
    // The blur follows the speed: pixels moved in this frame.
    blur.value = Math.min(9, Math.abs(next - last) * 0.3);
    last = next;
    y.value = next;
    if (t < 1) frame = requestAnimationFrame(tick);
    else blur.value = 0;
  };
  frame = requestAnimationFrame(tick);
}

onMounted(() => {
  // Arriving with the box already shown (going back, or an export): no replay.
  if (shown.value) y.value = travel;
});
watch(shown, (now) => {
  if (now) run();
  else {
    stop();
    y.value = 0;
  }
});
onBeforeUnmount(stop);
</script>

<template>
  <div class="dg way">
    <svg class="defs" aria-hidden="true">
      <filter id="reads-blur" x="0" y="-20%" width="100%" height="140%">
        <feGaussianBlur :stdDeviation="`0 ${blur}`" />
      </filter>
    </svg>
    <div class="view">
      <ul class="mono" :style="{ transform: `translateY(${-y}px)`, filter: blur > 0.3 ? 'url(#reads-blur)' : undefined }">
        <li v-for="([tool, target], i) in calls" :key="i">
          <i class="dot" />
          <b>{{ tool }}</b>
          <span>{{ target }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.way {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: #fff;
  line-height: 1.2;
}

.defs {
  position: absolute;
  width: 0;
  height: 0;
}

/* The fade-out at the bottom is the message: the list goes on. */
.view {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 3%, #000 52%, transparent 97%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 3%, #000 52%, transparent 97%);
}
ul {
  margin: 0;
  padding: 10px 8px 0 12px;
  list-style: none;
  will-change: transform;
}

li {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 25px;
  margin: 0;
  padding: 0;
  font-size: 13px;
  white-space: nowrap;
}
li::before,
li::marker {
  content: none;
}

.dot {
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--real);
}
b {
  font-weight: 800;
  color: var(--ink);
}
span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: var(--quiet);
}
</style>
