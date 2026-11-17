<script setup lang="ts">
/**
 * The agent reads everything. A long list of tool calls (Grep and Read, each
 * with a file path) that fades out at the bottom: the list does not end.
 */
const calls: [tool: string, target: string][] = [
  ['Grep', '"Button" src/'],
  ['Read', 'src/lib/ui/Button.svelte'],
  ['Read', 'src/lib/ui/tokens.css'],
  ['Read', 'src/lib/ui/Card.svelte'],
  ['Read', 'src/lib/ui/Input.svelte'],
  ['Read', 'src/lib/ui/Field.svelte'],
  ['Read', 'src/lib/ui/Select.svelte'],
  ['Grep', '"PostEditor" src/'],
  ['Read', 'src/lib/blog/posts.ts'],
  ['Read', 'src/lib/ui/Checkbox.svelte'],
  ['Read', 'src/lib/ui/Tag.svelte'],
  ['Read', 'src/lib/ui/Badge.svelte'],
  ['Read', 'src/lib/ui/Dialog.svelte'],
  ['Read', 'src/lib/ui/Toast.svelte'],
  ['Read', 'src/lib/ui/Tooltip.svelte'],
  ['Read', 'src/lib/ui/Menu.svelte'],
];
</script>

<template>
  <div class="dg way">
    <ul class="mono">
      <li v-for="([tool, target], i) in calls" :key="i">
        <i class="dot" />
        <b>{{ tool }}</b>
        <span>{{ target }}</span>
      </li>
    </ul>
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

/* The fade-out at the bottom is the message: the list goes on. */
ul {
  flex: 1;
  min-height: 0;
  margin: 0;
  padding: 10px 0 0 12px;
  list-style: none;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, #000 52%, transparent 97%);
  mask-image: linear-gradient(to bottom, #000 52%, transparent 97%);
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
  font-weight: 600;
  color: var(--quiet);
}
</style>
