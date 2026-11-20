<!--
  The demo run as one picture: the prompt, then what the agent ran in each of
  the three parts and what came out. All numbers are from the real run
  (Haiku 5.5, medium effort, Field Notes example app).
-->
<script setup lang="ts">
const parts = [
  {
    name: 'Know',
    rows: [
      { cmd: 'docs list', out: '31 components' },
      { cmd: 'docs show', out: '7 looked up' },
    ],
    result: 'Reused',
    chips: ['PostEditor', 'PostMeta', 'Card', 'EmptyState', 'Skeleton'],
  },
  {
    name: 'Verify',
    rows: [
      { cmd: 'new stories', out: '8 written', plain: true },
      { cmd: 'test run', out: '252 stories' },
    ],
    result: 'Result',
    chips: ['252 tests passed', '0 accessibility violations'],
  },
  {
    name: 'Review',
    rows: [
      { cmd: 'stories changed', out: '8 affected' },
      { cmd: 'review create', out: '2 collections' },
    ],
    result: 'For you',
    chips: ['👉 Storybook review page'],
  },
];
</script>

<template>
  <div class="dg run">
    <div class="prompt">
      <div class="bubble">Build the New post page at /posts/new …</div>
    </div>

    <div class="parts">
      <section v-for="(part, i) in parts" :key="part.name" class="part">
        <h3><span>{{ i + 1 }}</span>{{ part.name }}</h3>
        <div v-for="row in part.rows" :key="row.cmd" class="row">
          <code class="mono" :class="{ plain: row.plain }">{{ row.cmd }}</code>
          <b>{{ row.out }}</b>
        </div>
        <div class="result">
          <em>{{ part.result }}</em>
          <div class="chips">
            <span v-for="chip in part.chips" :key="chip" class="chip">{{ chip }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.run {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 6px 0 14px;
}

.prompt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.bubble {
  padding: 9px 18px;
  border-radius: 18px 18px 18px 5px;
  background: var(--ink);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
.meta {
  font-size: 17px;
  font-weight: 800;
  color: var(--quiet);
}

.parts {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.part {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
  min-height: 0;
  padding: 11px 14px 13px;
  border-radius: 12px;
  border: 1.5px solid var(--ink);
  background: #fff;
}
.part h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.part h3 span {
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background: var(--real);
  color: #fff;
  font-size: 17px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 5px 11px;
  border-radius: 9px;
  border: 1.5px solid var(--line);
  background: var(--soft);
}
.row code {
  white-space: nowrap;
  font-size: 14.5px;
  font-weight: 700;
  background: none;
  padding: 0;
  color: var(--ink);
}
.row code::before {
  content: '$ ';
  color: var(--real);
}
.row code.plain::before {
  content: '✎ ';
}
.row b {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--quiet);
  white-space: nowrap;
}

.result {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px 12px;
  border-radius: 9px;
  border: 2px solid var(--real);
  background: var(--real-bg);
}
.result em {
  font-style: normal;
  font-size: 14px;
  font-weight: 800;
  color: var(--real-ink);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1.5px solid var(--real);
  background: #fff;
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1.35;
}
</style>
