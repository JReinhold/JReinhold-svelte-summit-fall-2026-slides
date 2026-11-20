<!--
  The `storybook tools` CLI attaches to the dev server that already runs. The
  agent's terminal and your browser both talk to that one server. The browser
  panel is a real screenshot of the sidebar after a test run.
-->
<script setup lang="ts">
const warm = ['Vite', 'docgen', 'test runner'];
</script>

<template>
  <div class="dg attach">
    <div class="row">
      <section class="col">
        <h3>Your agent</h3>
        <div class="card term">
          <div class="bar"><i /><i /><i /><span>Terminal</span></div>
          <pre class="mono">$ npx storybook tools
    test run</pre>
        </div>
      </section>

      <div class="wire">
        <span>attaches</span>
        <svg viewBox="0 0 60 12" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6h50" /><path class="tip" d="M50 1.5 59 6l-9 4.5z" /></svg>
      </div>

      <section class="col">
        <h3>Storybook dev server</h3>
        <div class="card server">
          <span class="url mono">localhost:6006</span>
          <span class="state">already running</span>
          <div class="chips">
            <span v-for="item in warm" :key="item" class="chip">{{ item }}</span>
          </div>
        </div>
      </section>

      <div class="wire">
        <span>live</span>
        <svg viewBox="0 0 60 12" preserveAspectRatio="none" aria-hidden="true"><path d="M10 6h40" /><path class="tip" d="M50 1.5 59 6l-9 4.5z" /><path class="tip" d="M10 1.5 1 6l9 4.5z" /></svg>
      </div>

      <section class="col">
        <h3>Your browser</h3>
        <div class="card browser">
          <div class="bar"><i /><i /><i /><span>Storybook</span></div>
          <img src="/img/sidebar-tests.png" alt="The Storybook sidebar: PostEditor's Submitting story has a failed mark, the other stories have passed marks." />
        </div>
      </section>
    </div>

  </div>
</template>

<style scoped>
.attach {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 8px;
}

.row {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 86px 1fr 70px 1.05fr;
}

.col {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.col h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.01em;
  text-align: center;
  color: var(--ink);
}

.card {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px;
  border: 1.5px solid var(--ink);
  background: #fff;
}
.bar {
  flex: none;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
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

.term pre {
  flex: 1;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.5;
  white-space: pre;
}

.server {
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid var(--real);
  background: var(--real-bg);
  box-shadow: 0 0 0 3px rgb(224 41 107 / 0.14);
}
.url {
  font-size: 21px;
  font-weight: 700;
}
.state {
  font-size: 15px;
  font-weight: 700;
  color: var(--real-ink);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-top: 8px;
  padding: 0 10px;
}
.chip {
  padding: 3px 12px;
  border-radius: 999px;
  border: 1.5px solid var(--real);
  background: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
}

.browser img {
  flex: 1;
  min-height: 0;
  width: 100%;
  object-fit: cover;
  object-position: top left;
  border: 0;
  border-radius: 0;
}

.wire {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 4px;
  padding: 30px 6px 0;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: var(--quiet);
}
.wire svg {
  width: 100%;
  height: 12px;
}
.wire path {
  fill: none;
  stroke: var(--ink);
  stroke-width: 2;
}
.wire .tip {
  fill: var(--ink);
  stroke: none;
}
</style>
