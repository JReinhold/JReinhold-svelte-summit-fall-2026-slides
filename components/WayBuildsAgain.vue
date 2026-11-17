<!--
  The agent builds the button again. Top: the design system's <Button>.
  Bottom: a hand-rolled <button class="btn-primary"> in a page component.
  The two "Publish" buttons look different, with a "not equal" sign between.
-->
<template>
  <div class="dg way">
    <section class="card">
      <header>
        <span class="file mono">#lib/ui/Button.svelte</span>
      </header>
      <div class="body">
        <span class="btn ds">Publish</span>
        <span class="code mono">&lt;Button&gt;</span>
      </div>
    </section>

    <svg class="neq" viewBox="0 0 24 24" aria-label="is not equal to">
      <path d="M4 9h16M4 15h16M16 3 8 21" />
    </svg>

    <section class="card">
      <header>
        <span class="file mono">NewPostPage.svelte</span>
      </header>
      <div class="body">
        <span class="btn own">Publish</span>
        <span class="code mono">&lt;button class=<b>"btn-primary"</b>&gt;</span>
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
  padding: 7px 12px;
  border-bottom: 1px solid var(--line);
  background: var(--soft);
}
.file {
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 8px;
}

.code {
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}
.code b {
  color: var(--real-ink);
  font-weight: 700;
}

/* The demo app's real button, and a copy that is almost the same. */
.btn {
  display: inline-block;
  font-size: 19px;
  line-height: 1;
  color: #fff;
}
.btn.ds {
  padding: 13px 26px;
  border-radius: 9px;
  background: #a8461f;
  font-weight: 800;
}
.btn.own {
  padding: 12px 34px;
  border-radius: 999px;
  background: #e0622c;
  border-bottom: 3px solid #b44a1f;
  font-weight: 500;
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
