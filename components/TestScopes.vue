<script setup lang="ts">
/**
 * Panels that compare what is real, mocked or absent in each way to test a
 * SvelteKit remote function. Each panel comes in on a click. The first slot
 * shows the production app, and the unit test then takes its place.
 */
type State = 'plain' | 'real' | 'mock' | 'absent';

interface Panel {
  title: string;
  component: State;
  runtime: State;
  handler: State;
  deps: State;
  /** Shown in the gap above the handler. */
  input?: string;
  /** Grid column of the panel. */
  column: number;
  /** The click that shows it, or [from, until]. */
  click: number | [number, number];
}

const panels: Panel[] = [
  {
    title: 'Production app',
    component: 'plain',
    runtime: 'plain',
    handler: 'plain',
    deps: 'plain',
    column: 1,
    click: [1, 2],
  },
  {
    title: 'Unit test',
    component: 'absent',
    runtime: 'absent',
    handler: 'real',
    deps: 'mock',
    input: 'mockRequestEvent()',
    column: 1,
    click: 2,
  },
  {
    title: 'Component test',
    component: 'real',
    runtime: 'real',
    handler: 'mock',
    deps: 'absent',
    column: 2,
    click: 5,
  },
  {
    title: 'Component + remote handler test',
    component: 'real',
    runtime: 'real',
    handler: 'real',
    deps: 'mock',
    column: 3,
    click: 8,
  },
];

const deps = ['Database', 'Email'];
</script>

<template>
  <div class="scopes">
    <div class="panels">
      <section
        v-for="panel in panels"
        :key="panel.title"
        v-click="panel.click"
        class="panel"
        :style="{ gridColumn: panel.column }"
      >
        <h3>{{ panel.title }}</h3>
        <div class="stack">
          <div class="box" :class="panel.component">
            <span class="name">Component</span>
            <span class="sub mono">.svelte</span>
          </div>

          <div class="link" :class="{ off: panel.runtime === 'absent' }">
            <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0v8M2 6l4 5 4-5z" /></svg>
          </div>

          <div class="box" :class="panel.runtime">
            <span class="name">SvelteKit client runtime</span>
          </div>

          <div class="link" :class="{ off: panel.runtime === 'absent' && !panel.input }">
            <span v-if="panel.input" class="pill mono">{{ panel.input }}</span>
            <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0v8M2 6l4 5 4-5z" /></svg>
          </div>

          <div class="box" :class="panel.handler">
            <template v-if="panel.handler === 'mock'">
              <span class="pill mono">mockRemote(fn)</span>
              <span class="sub">Remote function handler</span>
            </template>
            <template v-else>
              <span class="name">Remote function handler</span>
              <span class="sub mono">.remote.ts</span>
            </template>
          </div>

          <div class="link" :class="{ off: panel.deps === 'absent' }">
            <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0v8M2 6l4 5 4-5z" /></svg>
          </div>

          <div class="deps">
            <div v-for="dep in deps" :key="dep" class="box" :class="panel.deps">
              <span class="name small">{{ dep }}</span>
              <span v-if="panel.deps === 'mock'" class="pill">mock</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="legend">
      <span><i class="swatch real" />real, under test</span>
      <span><i class="swatch mock" />mocked</span>
      <span><i class="swatch absent" />not in the test</span>
    </div>
  </div>
</template>

<style scoped>
.scopes {
  --real: #e0296b;
  --real-bg: #fff0f5;
  --ink: #1e293b;
  --quiet: #475569;
  --line: #cbd5e1;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
  color: var(--ink);
  line-height: 1.2;
}

.panels {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.panel {
  grid-row: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.panel h3 {
  margin: 0;
  font-size: 16.5px;
  font-weight: 800;
  letter-spacing: -0.01em;
  white-space: nowrap;
  text-align: center;
  color: var(--ink);
}

.stack {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: 1fr 14px 1fr 30px 1fr 14px 1fr;
  padding: 12px 10px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #cbd5e1;
}

.box {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 2px 4px;
  border-radius: 9px;
  border: 1.5px solid var(--ink);
  background: #fff;
  text-align: center;
}

.name {
  font-size: 15px;
  font-weight: 800;
}
.name.small {
  font-size: 15px;
  white-space: nowrap;
}
.sub {
  font-size: 12px;
  font-weight: 600;
  color: var(--quiet);
}
.mono {
  font-family: var(--slidev-code-font-family, 'JetBrains Mono Variable', monospace);
  font-variant-ligatures: none;
}

/* Real, under test: the one accent colour. */
.box.real {
  border: 2px solid var(--real);
  background: var(--real-bg);
  box-shadow: 0 0 0 3px rgb(224 41 107 / 0.14);
}
.box.real .sub {
  color: #b01653;
}

/* Mocked: dashed, quiet. */
.box.mock {
  border: 1.5px dashed var(--quiet);
  background: #fff;
}
.box.mock .name {
  font-weight: 700;
}

/* Not in the test: a thin grey outline, dark grey text. */
.box.absent {
  border: 1.5px solid var(--line);
  background: transparent;
}
.box.absent .name,
.box.absent .sub {
  color: var(--quiet);
  font-weight: 600;
}

.pill {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 999px;
  border: 1.5px dashed var(--quiet);
  background: #eef2f7;
  color: var(--ink);
  font-size: 11px;
  font-weight: 700;
  line-height: 1.35;
  white-space: nowrap;
}
.box .pill.mono {
  font-size: 13px;
  padding: 2px 10px;
}

.deps {
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.link svg {
  width: 10px;
  height: 10px;
  stroke: var(--ink);
  stroke-width: 2;
  fill: var(--ink);
}
.link.off svg {
  stroke: var(--line);
  fill: var(--line);
}

.legend {
  display: flex;
  justify-content: center;
  gap: 28px;
  font-size: 13px;
  font-weight: 600;
  color: var(--quiet);
}
.legend span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}
.swatch {
  width: 18px;
  height: 12px;
  border-radius: 4px;
  box-sizing: border-box;
}
.swatch.real {
  border: 2px solid var(--real);
  background: var(--real-bg);
}
.swatch.mock {
  border: 1.5px dashed var(--quiet);
  background: #fff;
}
.swatch.absent {
  border: 1.5px solid var(--line);
  background: #fff;
}
</style>
