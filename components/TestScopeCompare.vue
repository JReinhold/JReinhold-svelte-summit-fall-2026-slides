<script setup lang="ts">
/**
 * Two panels that compare the scope of an end-to-end test with the scope of a
 * story test. The end-to-end test runs the whole stack, so every layer is
 * real. The story test runs one component in the browser and puts a mock in
 * place of the remote functions, so it needs no backend and can show any state.
 */
const layers = ['SvelteKit server', 'Remote functions', 'Database'];
const states = ['loading', 'empty', 'error'];
</script>

<template>
  <div class="dg compare">
    <div class="panels">
      <section class="panel">
        <h3>End-to-end test</h3>
        <div class="stack">
          <div class="browser">
            <div class="bar"><i /><i /><i /><span>Browser</span></div>
            <div class="view">
              <div class="box real app">
                <span class="name">Whole app</span>
                <div class="blocks" aria-hidden="true">
                  <i v-for="n in 12" :key="n" :class="{ on: n === 6 }" />
                </div>
              </div>
            </div>
          </div>
          <template v-for="layer in layers" :key="layer">
            <div class="link">
              <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0v8M2 6l4 5 4-5z" /></svg>
            </div>
            <div class="box real">
              <span class="name">{{ layer }}</span>
            </div>
          </template>
        </div>
        <div class="notes">
          <span class="note">needs a backend</span>
          <span class="note">one state at a time is hard</span>
        </div>
      </section>

      <section class="panel">
        <h3>Story test</h3>
        <div class="stack story">
          <div class="browser">
            <div class="bar"><i /><i /><i /><span>Browser</span></div>
            <div class="view column">
              <div class="chips">
                <span v-for="state in states" :key="state" class="chip mono" :class="{ on: state === 'error' }">
                  {{ state }}
                </span>
              </div>
              <div class="box real component">
                <span class="name">One component</span>
                <svg class="warn" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3.5 22 20.5H2z" />
                  <path d="M12 10v5M12 17.6v.4" />
                </svg>
              </div>
            </div>
          </div>
          <div class="link">
            <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0v8M2 6l4 5 4-5z" /></svg>
          </div>
          <div class="box mock">
            <span class="pill mono">mock</span>
            <span class="name">Remote functions</span>
          </div>
        </div>
        <div class="notes">
          <span class="note">no backend</span>
          <span class="note">any state</span>
          <span class="foot">runs on Vitest browser mode</span>
        </div>
      </section>
    </div>

    <div class="legend">
      <span><i class="swatch real" />real, in the test</span>
      <span><i class="swatch mock" />mocked</span>
    </div>
  </div>
</template>

<style scoped>
.compare {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panels {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.panel {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.panel h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.01em;
  text-align: center;
  color: var(--ink);
}

.stack {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 2.3fr) 16px minmax(0, 1fr) 16px minmax(0, 1fr) 16px minmax(0, 1fr);
  padding: 12px 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid var(--line);
}
.stack.story {
  grid-template-rows: minmax(0, 1fr) 16px 64px;
}

.box {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 9px;
  border: 1.5px solid var(--ink);
  background: #fff;
  text-align: center;
}
.box.real {
  border: 2px solid var(--real);
  background: var(--real-bg);
  box-shadow: 0 0 0 3px rgb(224 41 107 / 0.14);
}
.box.mock {
  border: 1.5px dashed var(--quiet);
}

.name {
  font-size: 15px;
  font-weight: 800;
  white-space: nowrap;
}

/* The browser window: an ink frame with a title bar. */
.browser {
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-radius: 9px;
  border: 1.5px solid var(--ink);
  background: #fff;
  overflow: hidden;
}
.bar {
  flex: none;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-bottom: 1.5px solid var(--ink);
  background: var(--soft);
  font-size: 13px;
  font-weight: 700;
  color: var(--quiet);
}
.bar i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--line);
}
.bar span {
  margin-left: 5px;
}
.view {
  flex: 1;
  min-height: 0;
  display: flex;
  padding: 10px 12px;
}
.view.column {
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 12px;
}

/* The whole app: many parts, all of them in the test. */
.app {
  flex: 1;
  flex-direction: row;
  gap: 22px;
}
.blocks {
  display: grid;
  grid-template-columns: repeat(4, 34px);
  gap: 5px;
}
.blocks i {
  height: 15px;
  border-radius: 4px;
  border: 1.5px solid var(--real);
  background: #fff;
}
.blocks i.on {
  background: var(--real);
}

/* The states of a story: the selected one takes the accent. */
.chips {
  flex: none;
  display: flex;
  gap: 8px;
}
.chip {
  padding: 3px 14px;
  border-radius: 999px;
  border: 1.5px solid var(--line);
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--ink);
}
.chip.on {
  border: 2px solid var(--real);
  background: var(--real-bg);
  font-weight: 800;
  color: var(--real-ink);
}

.component {
  flex: 1;
  width: 72%;
  gap: 10px;
}
.warn {
  width: 40px;
  height: 40px;
  fill: none;
  stroke: var(--real-ink);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.pill {
  display: inline-block;
  padding: 1px 10px;
  border-radius: 999px;
  border: 1.5px dashed var(--quiet);
  background: #eef2f7;
  color: var(--ink);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
  white-space: nowrap;
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
}
.link svg {
  width: 10px;
  height: 10px;
  stroke: var(--ink);
  stroke-width: 2;
  fill: var(--ink);
}

.notes {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.note {
  padding: 3px 14px;
  border-radius: 999px;
  border: 1.5px solid var(--ink);
  background: #fff;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  white-space: nowrap;
}
.foot {
  margin-left: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--quiet);
  white-space: nowrap;
}

.legend {
  flex: none;
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
</style>
