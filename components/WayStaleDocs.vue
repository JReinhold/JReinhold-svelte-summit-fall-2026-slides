<!--
  The agent reads stale docs. Top: docs/components.md, 8 months old, says the
  prop is `kind`. Bottom: the Button source of today, where the prop is
  `variant`. A "not equal" sign between the two.
-->
<template>
  <div class="dg way">
    <section class="card">
      <header>
        <span class="file mono">docs/components.md</span>
        <span class="age">8 months ago</span>
      </header>
      <div class="body">
        <pre class="mono">&lt;Button <span class="hit old">kind</span>="primary"&gt;
  Publish
&lt;/Button&gt;</pre>
      </div>
    </section>

    <svg class="neq" viewBox="0 0 24 24" aria-label="is not equal to">
      <path d="M4 9h16M4 15h16M16 3 8 21" />
    </svg>

    <section class="card">
      <header>
        <span class="file mono">src/lib/ui/Button.svelte</span>
        <span class="age">today</span>
      </header>
      <div class="body">
        <pre class="mono">interface Props {
  <span class="hit">variant</span>?: 'primary'
    | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
}</pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.way {
  display: flex;
  flex-direction: column;
  gap: 6px;
  line-height: 1.2;
}

.card {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: #fff;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 12px;
  border-bottom: 1px solid var(--line);
  background: var(--soft);
}
.file {
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}
.age {
  font-size: 12px;
  font-weight: 700;
  color: var(--quiet);
  white-space: nowrap;
}

.body {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  padding: 8px 12px;
}

pre {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.75;
  color: var(--ink);
  white-space: pre;
}

/* The prop name: the one thing that differs. */
.hit {
  padding: 1px 4px;
  margin: 0 -1px;
  border-radius: 5px;
  border: 1.5px solid var(--real);
  background: var(--real-bg);
  color: var(--real-ink);
  font-weight: 800;
}
.hit.old {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

.neq {
  flex: none;
  align-self: center;
  width: 30px;
  height: 30px;
  fill: none;
  stroke: var(--real);
  stroke-width: 3.2;
}
</style>
