<!--
  How the docs reach people and agents: components, stories and MDX docs go
  through docgen into one manifest (components.json). Autodocs, the CLI and
  the MCP server all read that manifest.
-->
<template>
  <div class="dg how">
    <svg viewBox="0 0 900 396" role="img" aria-label="Components, stories and docs go through docgen into a manifest. Autodocs, the CLI and MCP read the manifest.">
      <defs>
        <marker id="how-head" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0 0.5 9 5 0 9.5z" class="head" />
        </marker>
      </defs>

      <!-- Sources -->
      <g v-for="(s, i) in sources" :key="s.name" :transform="`translate(0 ${3 + i * 140})`">
        <rect class="box" x="1" y="0" width="214" height="110" rx="9" />
        <path class="icon" transform="translate(20 38)" d="M3 1h13l8 8v24H3zM16 1v8h8" />
        <text class="name" x="62" y="52">{{ s.name }}</text>
        <text class="sub mono" x="62" y="76">{{ s.file }}</text>
      </g>

      <!-- Sources to docgen -->
      <path class="wire" d="M215 58C252 58 232 198 262 198" />
      <path class="wire" d="M215 338C252 338 232 198 262 198" />
      <path class="wire arrow" d="M215 198H273" />

      <rect class="box" x="275" y="166" width="110" height="64" rx="9" />
      <text class="name mid" x="330" y="205">Docgen</text>

      <path class="wire arrow" d="M385 198H438" />

      <!-- Manifest: the one highlighted thing -->
      <rect class="ring" x="441" y="99" width="148" height="198" rx="13" />
      <rect class="real" x="445" y="103" width="140" height="190" rx="9" />
      <text class="name mid" x="515" y="141">Manifest</text>
      <text class="brace mono" x="464" y="172">{</text>
      <rect class="bar" x="482" y="180" width="78" height="7" rx="3.5" />
      <rect class="bar" x="482" y="197" width="52" height="7" rx="3.5" />
      <rect class="bar" x="482" y="214" width="66" height="7" rx="3.5" />
      <text class="brace mono" x="464" y="244">}</text>
      <text class="file mono mid" x="515" y="275">components.json</text>

      <!-- Manifest to readers -->
      <path class="wire arrow" d="M589 198C618 198 598 58 626 58H638" />
      <path class="wire arrow" d="M589 198H638" />
      <path class="wire arrow" d="M589 198C618 198 598 338 626 338H638" />

      <!-- Autodocs -->
      <rect class="box" x="640" y="3" width="259" height="110" rx="9" />
      <g class="icon" transform="translate(656 40)">
        <circle cx="18" cy="10" r="6.5" />
        <path d="M5 33c0-8 5.5-12 13-12s13 4 13 12" />
      </g>
      <text class="name" x="706" y="55">Autodocs</text>
      <text class="sub" x="706" y="79">people</text>

      <!-- CLI + skills -->
      <rect class="box" x="640" y="143" width="259" height="110" rx="9" />
      <g class="icon" transform="translate(656 179)">
        <rect x="5" y="12" width="26" height="20" rx="5" />
        <path d="M18 12V7M1.5 18v8M34.5 18v8M14 27h8" />
        <circle cx="18" cy="5" r="2" />
        <circle class="dot" cx="13" cy="20.5" r="2" />
        <circle class="dot" cx="23" cy="20.5" r="2" />
      </g>
      <text class="name" x="706" y="181">CLI + skills</text>
      <text class="cmd mono" x="706" y="205">storybook tools docs</text>
      <text class="sub" x="706" y="229">your agent</text>

      <!-- MCP -->
      <rect class="box" x="640" y="283" width="259" height="110" rx="9" />
      <g class="icon" transform="translate(656 321)">
        <circle cx="18" cy="9" r="5.5" />
        <path d="M8 32c0-7 4-10.5 10-10.5S28 25 28 32" />
        <circle cx="5.5" cy="14" r="3.5" />
        <circle cx="30.5" cy="14" r="3.5" />
        <path d="M0.5 28c0-4 2-6.5 5-7M35.5 28c0-4-2-6.5-5-7" />
      </g>
      <text class="name" x="706" y="335">MCP</text>
      <text class="sub" x="706" y="359">other teams’ agents</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
const sources = [
  { name: 'Components', file: '.svelte' },
  { name: 'Stories', file: '.stories.svelte' },
  { name: 'Docs', file: '.mdx' },
];
</script>

<style scoped>
.how {
  display: flex;
  margin-top: 14px;
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
.mid {
  text-anchor: middle;
}
.name {
  font-size: 19px;
  font-weight: 800;
}
.sub {
  font-size: 14.5px;
  font-weight: 600;
  fill: var(--quiet);
}
.cmd {
  font-size: 14px;
  font-weight: 600;
}
.box {
  fill: #fff;
  stroke: var(--ink);
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
.brace {
  font-size: 17px;
  font-weight: 700;
  fill: var(--real);
}
.bar {
  fill: rgb(224 41 107 / 0.32);
}
.file {
  font-size: 14px;
  font-weight: 700;
  fill: var(--real-ink);
}
.wire {
  fill: none;
  stroke: var(--ink);
  stroke-width: 2;
}
.arrow {
  marker-end: url(#how-head);
}
.head {
  fill: var(--ink);
}
.icon,
.icon * {
  fill: none;
  stroke: var(--ink);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.icon .dot {
  fill: var(--ink);
  stroke: none;
}
</style>
