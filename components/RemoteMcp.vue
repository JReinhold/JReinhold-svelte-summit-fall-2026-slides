<!--
  How another team's agent reads your Storybook: you publish it to Chromatic,
  which serves it through an MCP server. The dashed path is the alternative:
  host the MCP server yourself with @storybook/mcp.
-->
<template>
  <div class="dg remote">
    <svg viewBox="0 0 900 400" role="img" aria-label="Your Storybook is published to Chromatic, which gives an MCP server that another team's agent reads. Or self-host with @storybook/mcp.">
      <defs>
        <marker id="remote-head" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0 0.5 9 5 0 9.5z" class="head" />
        </marker>
        <marker id="remote-head-quiet" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0 0.5 9 5 0 9.5z" class="head quiet" />
        </marker>
      </defs>

      <!-- Your Storybook -->
      <rect class="box" x="1" y="14" width="176" height="196" rx="9" />
      <g class="icon" transform="translate(61 44) scale(1.55)">
        <path d="M8 29V7a3 3 0 0 1 3-3h18v22H11a3 3 0 0 0 0 6h18" />
        <path d="M14.5 11h9M14.5 16.5h9" />
      </g>
      <text class="name" x="89" y="150">Your Storybook</text>

      <path class="wire arrow" d="M186 112H228" />

      <!-- Chromatic -->
      <rect class="box" x="237" y="14" width="176" height="196" rx="9" />
      <g class="icon" transform="translate(297 44) scale(1.55)">
        <path d="M10 28a7 7 0 0 1-1.2-13.9A9.5 9.5 0 0 1 27 12.5 7.8 7.8 0 0 1 27 28z" />
        <path d="M18 24v-9.5M14 18.5l4-4 4 4" />
      </g>
      <text class="name" x="325" y="150">Chromatic</text>
      <text class="sub" x="325" y="174">published</text>

      <path class="wire arrow" d="M422 112H462" />

      <!-- MCP server: the one highlighted thing -->
      <rect class="ring" x="469" y="10" width="184" height="204" rx="13" />
      <rect class="real" x="473" y="14" width="176" height="196" rx="9" />
      <g class="icon pink" transform="translate(533 44) scale(1.55)">
        <rect x="4" y="5" width="28" height="11" rx="3" />
        <rect x="4" y="20" width="28" height="11" rx="3" />
        <path d="M16 10.5h10M16 25.5h10M10 10.5h.01M10 25.5h.01" />
      </g>
      <text class="name" x="561" y="150">MCP server</text>

      <path class="wire arrow" d="M662 112H700" />

      <!-- Another team's agent: a stack of cards, because there are many -->
      <rect class="box back" x="721" y="26" width="176" height="196" rx="9" />
      <rect class="box back" x="715" y="20" width="176" height="196" rx="9" />
      <rect class="box" x="709" y="14" width="176" height="196" rx="9" />
      <g class="icon" transform="translate(769 40) scale(1.55)">
        <rect x="5" y="12" width="26" height="20" rx="5" />
        <path d="M18 12V7M1.5 18v8M34.5 18v8M14 27h8" />
        <circle cx="18" cy="5" r="2" />
        <circle class="dot" cx="13" cy="20.5" r="2" />
        <circle class="dot" cx="23" cy="20.5" r="2" />
      </g>
      <text class="name" x="797" y="138">Another team’s</text>
      <text class="name" x="797" y="162">agent</text>

      <!-- The other path: self-host -->
      <path class="wire dashed arrow-quiet" d="M89 216V332a12 12 0 0 0 12 12H228" />
      <rect class="box optional" x="237" y="292" width="176" height="104" rx="9" />
      <text class="alt" x="325" y="337">or self-host</text>
      <text class="cmd mono" x="325" y="364">@storybook/mcp</text>
      <path class="wire dashed arrow-quiet" d="M419 344H549a12 12 0 0 0 12-12V224" />
    </svg>
  </div>
</template>

<style scoped>
.remote {
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
  text-anchor: middle;
}
.name {
  font-size: 19px;
  font-weight: 800;
}
.sub {
  font-size: 15px;
  font-weight: 600;
  fill: var(--quiet);
}
.alt {
  font-size: 17px;
  font-weight: 700;
}
.cmd {
  font-size: 15px;
  font-weight: 600;
}
.box {
  fill: #fff;
  stroke: var(--ink);
  stroke-width: 1.5;
}
.box.back {
  stroke: var(--line);
}
.box.optional {
  stroke: var(--quiet);
  stroke-dasharray: 6 5;
}
.real {
  fill: var(--real-bg);
  stroke: var(--real);
  stroke-width: 2;
}
.ring {
  fill: rgb(224 41 107 / 0.14);
}
.wire {
  fill: none;
  stroke: var(--ink);
  stroke-width: 2;
}
.wire.dashed {
  stroke: var(--quiet);
  stroke-dasharray: 6 5;
}
.arrow {
  marker-end: url(#remote-head);
}
.arrow-quiet {
  marker-end: url(#remote-head-quiet);
}
.head {
  fill: var(--ink);
}
.head.quiet {
  fill: var(--quiet);
}
.icon,
.icon * {
  fill: none;
  stroke: var(--ink);
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.icon.pink,
.icon.pink * {
  stroke: var(--real);
}
.icon .dot {
  fill: var(--ink);
  stroke: none;
}
</style>
