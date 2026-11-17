<script setup lang="ts">
/**
 * The form's "Save changes" button before and after the agent's fix. Before,
 * the button stays enabled while the form sends, so it can be clicked twice.
 * After, it is disabled and busy. The diff below shows the one-line change.
 * The previews keep the demo app's own colours; the rest is deck style.
 */
</script>

<template>
  <div class="dg ba">
    <div class="pair">
      <figure class="side before">
        <div class="frame">
          <span class="tag">Before</span>
          <div class="form">
            <div class="field">
              <svg viewBox="0 0 20 20" aria-hidden="true"><rect width="20" height="20" rx="4" /><path d="M5 10.5l3.5 3.5L15 7" /></svg>
              Published
            </div>
          <div class="actions">
            <span class="btn">Save changes</span>
            <span class="ghost">Cancel</span>
          </div>
          </div>
        </div>
        <figcaption>
          <strong>Save can be clicked twice</strong>
          <span class="mono">disabled: false · aria-busy: not set</span>
        </figcaption>
      </figure>

      <figure class="side after">
        <div class="frame">
          <span class="tag">After</span>
          <div class="form">
            <div class="field">
              <svg viewBox="0 0 20 20" aria-hidden="true"><rect width="20" height="20" rx="4" /><path d="M5 10.5l3.5 3.5L15 7" /></svg>
              Published
            </div>
          <div class="actions">
            <span class="btn busy">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9" /></svg>
              Save changes
            </span>
            <span class="ghost">Cancel</span>
          </div>
          </div>
        </div>
        <figcaption>
          <strong>Busy while it sends</strong>
          <span class="mono">disabled: true · aria-busy: true</span>
        </figcaption>
      </figure>
    </div>

    <div class="diff mono">
      <div class="file">src/lib/blog/PostEditor.svelte</div>
      <div class="lines">
        <div class="line del"><b>-</b>&lt;Button type="submit"&gt;…&lt;/Button&gt;</div>
        <div class="line add"><b>+</b>&lt;Button type="submit" loading={form.pending &gt; 0}&gt;…&lt;/Button&gt;</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ba {
  --good: #15803d;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 6px;
}

.pair {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.side {
  min-width: 0;
  min-height: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* The preview: the demo app's own paper, button and link colours. */
.frame {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 2px solid var(--line);
  background: #f8f3ec;
}
.before .frame {
  border-color: var(--real);
}
.after .frame {
  border-color: var(--good);
}

.tag {
  position: absolute;
  top: 10px;
  left: 14px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--quiet);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 14px;
}
.field {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
}
.field svg {
  width: 20px;
  height: 20px;
}
.field rect {
  fill: #a8461f;
}
.field path {
  fill: none;
  stroke: #fff;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.actions {
  display: flex;
  align-items: center;
  gap: 26px;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border-radius: 8px;
  background: #a8461f;
  color: #fff;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;
}
.btn svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
}
.ghost {
  font-size: 22px;
  font-weight: 800;
  color: #a8461f;
}

figcaption {
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
figcaption strong {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.before strong {
  color: var(--real-ink);
}
.after strong {
  color: var(--good);
}
figcaption .mono {
  font-size: 14px;
  font-weight: 500;
  color: var(--quiet);
}

/* The diff: a light code panel, like the deck's code blocks. */
.diff {
  flex: none;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: #fff;
  overflow: hidden;
  font-weight: 500;
}
.file {
  padding: 6px 16px;
  border-bottom: 1px solid var(--line);
  background: var(--soft);
  font-size: 13px;
  color: var(--quiet);
}
.lines {
  padding: 8px 0;
}
.line {
  padding: 4px 16px;
  font-size: 15px;
  line-height: 1.5;
  white-space: pre;
}
.line b {
  display: inline-block;
  width: 2ch;
  font-weight: 700;
}
.line.del {
  background: #ffe4e6;
  color: #9f1239;
}
.line.add {
  background: #dcfce7;
  color: #166534;
}
</style>
