<!--
  How the review finds the stories to look at: from the changed file
  (Button.svelte) it follows the module graph to each file that imports it,
  and to the stories of those files. Files that do not import it stay out.
  The agent gets the affected stories, and the reason for each.
-->
<script setup lang="ts">
/** Row centres, top to bottom. */
const y = (row: number) => 42 + row * 43;

const importers = [
  { row: 1, file: 'Header.svelte' },
  { row: 2, file: 'DeletePostButton.svelte' },
  { row: 3, file: 'PostEditor.svelte' },
];
const affected = ['Button', 'Header', 'DeletePostButton', 'PostEditor', 'NewPostPage'];
const unrelated = [
  { row: 5.2, name: 'Avatar' },
  { row: 6.2, name: 'Markdown' },
];
</script>

<template>
  <div class="dg graph">
    <svg viewBox="0 0 900 396" role="img" aria-label="Button.svelte changed. The files that import it, and their stories, are affected. Avatar and Markdown are not.">
      <defs>
        <marker id="graph-head" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0 0.5 9 5 0 9.5z" class="head" />
        </marker>
        <marker id="graph-head-off" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0 0.5 9 5 0 9.5z" class="head off" />
        </marker>
      </defs>

      <text class="head-label" x="702" y="13">Stories</text>

      <!-- The changed file -->
      <text class="tag" x="65" :y="y(2) - 29">changed</text>
      <rect class="ring" x="-3" :y="y(2) - 22" width="136" height="44" rx="13" />
      <rect class="real" x="1" :y="y(2) - 18" width="128" height="36" rx="9" />
      <text class="file mono strong" x="65" :y="y(2) + 5">Button.svelte</text>

      <!-- Button.svelte to its own story and to the files that import it -->
      <path class="wire arrow" :d="`M134 ${y(2)}C158 ${y(2)} 138 ${y(0)} 174 ${y(0)}H602`" />
      <path class="wire arrow" :d="`M134 ${y(2)}C152 ${y(2)} 138 ${y(1)} 154 ${y(1)}H164`" />
      <path class="wire arrow" :d="`M134 ${y(2)}H164`" />
      <path class="wire arrow" :d="`M134 ${y(2)}C152 ${y(2)} 138 ${y(3)} 154 ${y(3)}H164`" />

      <g v-for="f in importers" :key="f.file">
        <rect class="box" x="166" :y="y(f.row) - 17" width="204" height="34" rx="9" />
        <text class="file mono" x="268" :y="y(f.row) + 5">{{ f.file }}</text>
        <path class="wire arrow" :d="`M370 ${y(f.row)}H602`" />
      </g>

      <!-- PostEditor is imported by a page -->
      <path class="wire arrow" :d="`M370 ${y(3)}C390 ${y(3)} 374 ${y(4)} 390 ${y(4)}H400`" />
      <rect class="box" x="402" :y="y(4) - 17" width="168" height="34" rx="9" />
      <text class="file mono" x="486" :y="y(4) + 5">NewPostPage.svelte</text>
      <path class="wire arrow" :d="`M570 ${y(4)}H602`" />

      <!-- Affected stories -->
      <g v-for="(name, row) in affected" :key="name">
        <rect class="ring" x="605" :y="y(row) - 21" width="194" height="42" rx="13" />
        <rect class="real" x="609" :y="y(row) - 17" width="186" height="34" rx="9" />
        <path class="mark" :transform="`translate(621 ${y(row) - 8})`" d="M1 1h10v14l-5-4-5 4z" />
        <text class="story" x="641" :y="y(row) + 5.5">{{ name }}</text>
      </g>

      <!-- Files that do not import Button.svelte -->
      <g v-for="u in unrelated" :key="u.name">
        <rect class="box off" x="166" :y="y(u.row) - 17" width="204" height="34" rx="9" />
        <text class="file mono quiet" x="268" :y="y(u.row) + 5">{{ u.name }}.svelte</text>
        <path class="wire off arrow-off" :d="`M370 ${y(u.row)}H606`" />
        <rect class="box off" x="609" :y="y(u.row) - 17" width="186" height="34" rx="9" />
        <path class="mark off" :transform="`translate(621 ${y(u.row) - 8})`" d="M1 1h10v14l-5-4-5 4z" />
        <text class="story quiet" x="641" :y="y(u.row) + 5.5">{{ u.name }}</text>
      </g>

      <!-- The affected stories go to the agent, each with its reason -->
      <path
        class="wire"
        :d="`M806 ${y(0) - 20}h3a6 6 0 0 1 6 6V${y(2) - 8}q0 8 8 8q-8 0-8 8V${y(4) + 14}a6 6 0 0 1-6 6h-3`"
      />
      <g :transform="`translate(832 ${y(2) - 26})`">
        <path class="bubble" d="M9 -52h50a8 8 0 0 1 8 8v24a8 8 0 0 1-8 8H42l-8 9-8-9H9a8 8 0 0 1-8-8v-24a8 8 0 0 1 8-8z" />
        <text class="why" x="34" y="-25">why</text>
        <g class="icon" transform="translate(6 4) scale(1.55)">
          <rect x="5" y="12" width="26" height="20" rx="5" />
          <path d="M18 12V7M1.5 18v8M34.5 18v8M14 27h8" />
          <circle cx="18" cy="5" r="2" />
          <circle class="dot" cx="13" cy="20.5" r="2" />
          <circle class="dot" cx="23" cy="20.5" r="2" />
        </g>
      </g>

      <!-- The command -->
      <rect class="card" x="232" y="346" width="436" height="46" rx="9" />
      <text class="cmd mono" x="450" y="375">$ npx storybook tools stories changed</text>
    </svg>
  </div>
</template>

<style scoped>
.graph {
  display: flex;
  margin-top: 10px;
}
svg {
  flex: 1;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
}
text {
  fill: var(--ink);
}
.head-label {
  font-size: 16px;
  font-weight: 800;
  text-anchor: middle;
}
.tag {
  font-size: 15px;
  font-weight: 800;
  fill: var(--real-ink);
  text-anchor: middle;
}
.file {
  font-size: 14px;
  font-weight: 600;
  text-anchor: middle;
}
.file.strong {
  font-weight: 700;
}
.story {
  font-size: 15.5px;
  font-weight: 800;
}
.quiet {
  fill: var(--quiet);
  font-weight: 600;
}
.why {
  font-size: 18px;
  font-weight: 800;
  text-anchor: middle;
}
.cmd {
  font-size: 17px;
  font-weight: 600;
  text-anchor: middle;
}
.box {
  fill: #fff;
  stroke: var(--ink);
  stroke-width: 1.5;
}
.box.off {
  stroke: var(--line);
}
.card {
  fill: #fff;
  stroke: var(--line);
  stroke-width: 1.5;
}
.real {
  fill: var(--real-bg);
  stroke: var(--real);
  stroke-width: 2;
}
.ring {
  fill: rgb(224 41 107 / 0.14);
}
.mark {
  fill: none;
  stroke: var(--real);
  stroke-width: 2;
  stroke-linejoin: round;
}
.mark.off {
  stroke: var(--quiet);
  stroke-width: 1.5;
}
.wire {
  fill: none;
  stroke: var(--ink);
  stroke-width: 2;
}
.wire.off {
  stroke: var(--line);
}
.arrow {
  marker-end: url(#graph-head);
}
.arrow-off {
  marker-end: url(#graph-head-off);
}
.head {
  fill: var(--ink);
}
.head.off {
  fill: var(--line);
}
.bubble {
  fill: #fff;
  stroke: var(--ink);
  stroke-width: 1.5;
  stroke-linejoin: round;
}
.icon,
.icon * {
  fill: none;
  stroke: var(--ink);
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.icon .dot {
  fill: var(--ink);
  stroke: none;
}
</style>
