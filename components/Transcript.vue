<!--
  The demo, on the slide: parts of one real agent run (Haiku 5.5, medium effort, in
  the Field Notes example app). Each click scrolls to the next part. The text
  is from that run, shortened; every cut has an ellipsis.

  part="know":   prompt, skills, `docs list`, `docs show`, the page it wrote.
  part="verify": the stories it wrote, then the test run.
  part="review": `stories changed`, `review create`, the answer, then a
                 screenshot of the review page.
-->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useSlideContext } from '@slidev/client';

type Item =
  | { step: number; kind: 'user'; text: string }
  | { step: number; kind: 'say'; text: string }
  | { step: number; kind: 'gap' }
  | { step: number; kind: 'tools'; label: string; names: string[] }
  | { step: number; kind: 'cmd'; cmd: string; out?: string; mark?: number[] }
  | { step: number; kind: 'cmds'; cmds: string[] }
  | { step: number; kind: 'file'; path: string; stat: string; code: string; mark?: number[] }
  | { step: number; kind: 'review'; heading: string; text: string; link: string };

const props = defineProps<{ part: 'know' | 'verify' | 'review' }>();

const know: Item[] = [
  {
    step: 0,
    kind: 'user',
    text: "Build the New post page at /posts/new, where a writer can write and publish a post. Next to the form, show the writer's latest drafts, so they can continue one of them instead.",
  },
  {
    step: 0,
    kind: 'say',
    text: "I'll start by reading the project layout and the existing blog code, since the Storybook rules require looking up components before I edit anything.",
  },
  { step: 0, kind: 'gap' },
  {
    step: 0,
    kind: 'say',
    text: "… Before I edit anything, the project rules require loading the Storybook and Svelte skills. I'll load them now.",
  },
  {
    step: 0,
    kind: 'tools',
    label: 'Skill',
    names: ['component-docs', 'write-stories', 'test-stories', 'ui-review', 'svelte-core-bestpractices'],
  },

  {
    step: 1,
    kind: 'say',
    text: "All five skills are loaded. The Storybook skills ask for four separate CLI commands, each in its own call. I'll run them now, before reading components or editing files.",
  },
  {
    step: 1,
    kind: 'cmd',
    cmd: 'npx storybook skills component-docs',
    out: `# Storybook component docs
…
npx storybook tools docs list             # every component and docs page, with its id
npx storybook tools docs show --id <id>   # props and usage examples of one entry
…`,
  },
  {
    step: 1,
    kind: 'cmds',
    cmds: [
      'npx storybook skills write-stories',
      'npx storybook skills test-stories',
      'npx storybook skills ui-review',
    ],
  },

  { step: 2, kind: 'say', text: "The skills say to run `docs list` before editing, so I'll do that next." },
  {
    step: 2,
    kind: 'cmd',
    cmd: 'npx storybook tools docs list --withStoryIds true',
    out: `# Components

- AppShell (posts-appshell): the frame of every page: header, navigation, main content and footer
  - List page (posts-appshell--list-page)
  - Narrow page (posts-appshell--narrow-page)
…
- PostEditor (posts-posteditor): the form that writes a new post or edits an existing one
  - New post (posts-posteditor--new-post)
  …
- PostMeta (posts-postmeta): the author, date, reading time and draft status of a post
  …
- Card (ui-card): a surface that groups content, with an optional header and footer
  …`,
    mark: [6, 9, 11],
  },

  {
    step: 3,
    kind: 'say',
    text: "The list has what I need. Next I'll run `docs show` once per component I plan to use, each in its own command.",
  },
  { step: 3, kind: 'cmds', cmds: ['npx storybook tools docs show --id posts-postcard'] },
  {
    step: 3,
    kind: 'cmd',
    cmd: 'npx storybook tools docs show --id posts-posteditor',
    out: `# PostEditor
…
The form that writes a new post or edits an existing one: title, body with a Write and a
Preview tab, tags, author and Published. Use it for the New post and Edit post pages.
…
## Props

export type PostEditorProps = {
  /** The post to edit, as \`readPost\` gives it. Leave it out to write a new post. */
  post?: PostDetail;
}
…`,
    mark: [3],
  },
  {
    step: 3,
    kind: 'cmds',
    cmds: [
      'npx storybook tools docs show --id ui-emptystate',
      'npx storybook tools docs show --id ui-card',
      'npx storybook tools docs show --id ui-button',
      'npx storybook tools docs show --id ui-skeleton',
    ],
  },

  { step: 3, kind: 'gap' },
  {
    step: 4,
    kind: 'say',
    text: 'Next, the page component. It keeps the form outside the async boundary, so the form shows at once while the drafts load.',
  },
  {
    step: 4,
    kind: 'file',
    path: 'src/lib/pages/NewPostPage.svelte',
    stat: '+64',
    code: `<script lang="ts">
  import { listPosts } from '#lib/blog/blog.remote.ts';
  import DraftList from '#lib/blog/DraftList.svelte';
  import PostEditor from '#lib/blog/PostEditor.svelte';
  import EmptyState from '#lib/ui/EmptyState.svelte';
  import Skeleton from '#lib/ui/Skeleton.svelte';
<\/script>
…
    <PostEditor />
    <aside class="side" aria-label="Your drafts">
      <svelte:boundary>
        {@const result = await listPosts({ status: 'drafts', sort: 'newest' })}
        <DraftList drafts={result.posts} />
…`,
    mark: [3, 4, 5, 8, 12],
  },
];

const verify: Item[] = [
  { step: 0, kind: 'gap' },
  {
    step: 0,
    kind: 'say',
    text: 'Now the stories: one for the drafts list and one for the page, following the shape of the existing story files.',
  },
  {
    step: 0,
    kind: 'file',
    path: 'src/lib/pages/NewPostPage.stories.svelte',
    stat: '+98',
    code: `…
<!-- The form on the left, the latest drafts on the right. Each draft links to its editor. -->
<Story
  name="New post"
  template={newPostPage}
  beforeEach={() => {
    mockRemote(listPosts).mockResolvedValue(postPage(drafts));
  }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 1, name: 'New post' })).toBeVisible();
    await expect(canvas.getByLabelText('Title')).toHaveValue('');
    …
  }}
/>
…`,
    mark: [3, 6],
  },
  { step: 1, kind: 'gap' },
  {
    step: 1,
    kind: 'say',
    text: 'All Svelte files pass the autofixer. Next, the story tests. The project rule is a full run with no `--stories` filter.',
  },
  {
    step: 1,
    kind: 'cmd',
    cmd: 'npx storybook tools test run 2>&1 | tail -150',
    out: `…
- posts-draftlist--empty
- posts-draftlist--long-title
…

## Result

Passed: 252 component tests passed.
Accessibility: 252 stories checked, no violations.`,
    mark: [7, 8],
  },

];

// The `stories changed` step is skipped to save time. Set this to true to show it again.
const showChanged = false;

const reviewAll: Item[] = [
  { step: 0, kind: 'gap' },
  {
    step: 0,
    kind: 'say',
    text: "… Next I'll run `stories changed` to find the stories my edits affect, and probe the dev server on port 6006.",
  },
  {
    step: 0,
    kind: 'cmd',
    cmd: 'npx storybook tools stories changed',
    out: `Detected 8 changed stories (8 new, 0 modified, 0 related).

New stories:
- \`pages-new-post--drafts-failed\`: Pages/New post / Drafts failed …
- \`pages-new-post--drafts-loading\`: Pages/New post / Drafts loading …
- \`pages-new-post--new-post\`: Pages/New post / New post …
- \`pages-new-post--no-drafts\`: Pages/New post / No drafts …
- \`pages-new-post--server-mode\`: Pages/New post / Server mode …
- \`posts-draftlist--drafts\`: Posts/DraftList / Drafts …
- \`posts-draftlist--empty\`: Posts/DraftList / Empty …
- \`posts-draftlist--long-title\`: Posts/DraftList / Long title …
…`,
    mark: [0],
  },

  {
    step: 1,
    kind: 'say',
    text: "The eight new stories are all in the full run, and the dev server answers on port 6006. … Now I'll publish the review.",
  },
  {
    step: 1,
    kind: 'cmd',
    cmd: "npx storybook tools review create --input '{",
    out: `  "title": "New post page with latest drafts",
  "description": "The **New post** page at \`/posts/new\` shows the form on the left …",
  "collections": [
    { "title": "New post page",
      "rationale": "The new page: form, drafts, and the states of the drafts …",
      "storyIds": ["pages-new-post--new-post", "pages-new-post--no-drafts", …] },
    { "title": "Latest drafts list", … }
  ],
  "changedFiles": ["src/lib/blog/DraftList.svelte", …]
}'
Review applied: 2 collections, 8 stories. …`,
    mark: [10],
  },

  {
    step: 2,
    kind: 'say',
    text: 'The New post page is at `/posts/new`. The form is on the left, and the latest drafts are on the right. Each draft links to its editor, so the writer can continue it.',
  },
  { step: 2, kind: 'gap' },
  {
    step: 2,
    kind: 'say',
    text: 'Story tests: full run, 252 component tests passed, no accessibility violations. That includes 8 new stories: 5 for the page and 3 for the list. …',
  },
  {
    step: 2,
    kind: 'review',
    heading: '👀 Review your changes',
    text: 'The review shows the 8 stories most relevant for you to review right now. Because this is AI-curated, results may be inaccurate or incomplete.',
    link: '👉 Open the Storybook review page',
  },
];

// Without the first step, the other steps move up by one and a gap opens the list.
const review: Item[] = showChanged
  ? reviewAll
  : [
      { step: 0, kind: 'gap' },
      ...reviewAll.filter((item) => item.step > 0).map((item) => ({ ...item, step: item.step - 1 })),
    ];

const items = computed(() => ({ know, verify, review })[props.part]);
const lastStep = computed(() => Math.max(...items.value.map((item) => item.step)));

const { $clicks } = useSlideContext();
const step = computed(() => Math.min($clicks.value, lastStep.value));
// The review part has one more click: the review page itself.
const showPage = computed(() => props.part === 'review' && $clicks.value > lastStep.value);

const view = ref<HTMLElement>();
const track = ref<HTMLElement>();
const offset = ref(0);

function measure() {
  if (!view.value || !track.value) return;
  const target = track.value.querySelector<HTMLElement>(`[data-step="${step.value}"]`);
  if (!target) return;
  const most = Math.max(0, track.value.scrollHeight - view.value.clientHeight);
  offset.value = Math.min(Math.max(0, target.offsetTop - 14), most);
}

let observer: ResizeObserver | undefined;
onMounted(() => {
  measure();
  document.fonts?.ready.then(measure);
  observer = new ResizeObserver(measure);
  if (track.value) observer.observe(track.value);
  if (view.value) observer.observe(view.value);
});
onBeforeUnmount(() => observer?.disconnect());
watch(step, () => nextTick(measure));

/** Text with `code` spans: every second part is code. */
const parts = (text: string) => text.split('`').map((value, i) => ({ value, code: i % 2 === 1 }));
const lines = (text: string) => text.split('\n');
</script>

<template>
  <div class="dg transcript">
    <div class="bar">
      <i /><i /><i />
      <b>Build New Post Page and Drafts</b>
      <span>Haiku 5.5 · Medium</span>
    </div>

    <div ref="view" class="view">
      <div ref="track" class="track" :style="{ transform: `translateY(${-offset}px)` }">
        <template v-for="(item, i) in items" :key="i">
          <div
            class="item"
            :class="[item.kind, { off: item.step !== step }]"
            :data-step="items.findIndex((other) => other.step === item.step) === i ? item.step : undefined"
          >
            <template v-if="item.kind === 'user'">
              <div class="bubble">{{ item.text }}</div>
            </template>

            <template v-else-if="item.kind === 'say'">
              <p>
                <template v-for="(part, j) in parts(item.text)" :key="j">
                  <code v-if="part.code">{{ part.value }}</code>
                  <template v-else>{{ part.value }}</template>
                </template>
              </p>
            </template>

            <template v-else-if="item.kind === 'gap'"><span>⋯</span></template>

            <template v-else-if="item.kind === 'tools'">
              <span v-for="name in item.names" :key="name" class="chip">
                <em>{{ item.label }}</em> {{ name }}
              </span>
            </template>

            <template v-else-if="item.kind === 'cmds'">
              <div v-for="cmd in item.cmds" :key="cmd" class="head mono"><b>$</b> {{ cmd }}</div>
            </template>

            <template v-else-if="item.kind === 'cmd'">
              <div class="head mono"><b>$</b> {{ item.cmd }}</div>
              <pre v-if="item.out" class="mono"><span
                v-for="(line, j) in lines(item.out)"
                :key="j"
                :class="{ mark: item.mark?.includes(j) }"
              >{{ line || ' ' }}</span></pre>
            </template>

            <template v-else-if="item.kind === 'file'">
              <div class="head mono">{{ item.path }} <b class="stat">{{ item.stat }}</b></div>
              <pre class="mono"><span
                v-for="(line, j) in lines(item.code)"
                :key="j"
                :class="{ mark: item.mark?.includes(j) }"
              >{{ line || ' ' }}</span></pre>
            </template>

            <template v-else-if="item.kind === 'review'">
              <h4>{{ item.heading }}</h4>
              <p>{{ item.text }}</p>
              <span class="link">{{ item.link }}</span>
            </template>
          </div>
        </template>
      </div>
    </div>

    <div class="page" :class="{ on: showPage }">
      <img src="/img/review-page.png" alt="The review page in Storybook: a summary of the change and the New post page stories, each marked New." />
    </div>
  </div>
</template>

<style scoped>
.transcript {
  position: relative;
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
  gap: 6px;
  padding: 7px 14px;
  border-bottom: 1.5px solid var(--ink);
  background: var(--soft);
  font-size: 14px;
  color: var(--quiet);
}
.bar i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--line);
}
.bar b {
  margin-left: 8px;
  font-weight: 800;
  color: var(--ink);
}
.bar span {
  margin-left: auto;
  font-weight: 700;
}

.view {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.track {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 22px 22px;
  transition: transform 0.7s cubic-bezier(0.65, 0, 0.35, 1);
}

.item {
  transition: opacity 0.5s;
}
.item.off {
  opacity: 0.3;
}

.user {
  display: flex;
  justify-content: flex-end;
}
.bubble {
  max-width: 78%;
  padding: 12px 18px;
  border-radius: 18px 18px 5px 18px;
  background: var(--ink);
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
}

.say p,
.review p {
  margin: 0;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.4;
}
.say code {
  padding: 1px 5px;
  border-radius: 5px;
  background: var(--soft);
  border: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 0.86em;
  font-weight: 600;
}

.gap {
  text-align: center;
  font-size: 20px;
  line-height: 0.8;
  letter-spacing: 0.2em;
  color: var(--quiet);
}

.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.chip {
  padding: 4px 12px;
  border-radius: 999px;
  border: 1.5px solid var(--line);
  background: var(--soft);
  font-family: var(--mono);
  font-size: 14px;
  font-weight: 600;
}
.chip em {
  font-family: var(--sb-font-sans, inherit);
  font-style: normal;
  font-weight: 800;
  color: var(--real-ink);
}

.cmd,
.cmds,
.file {
  overflow: hidden;
  border-radius: 9px;
  border: 1.5px solid var(--line);
}
.head {
  padding: 6px 14px;
  background: var(--soft);
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1.45;
}
.head b {
  color: var(--real);
}
.head .stat {
  margin-left: 8px;
  color: #15803d;
}
.head + .head {
  border-top: 1px solid var(--line);
}
pre {
  margin: 0;
  padding: 9px 0;
  border-top: 1.5px solid var(--line);
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.5;
  white-space: pre;
}
pre span {
  display: block;
  padding: 0 14px;
}
pre .mark {
  background: var(--real-bg);
  box-shadow: inset 3px 0 0 var(--real);
  font-weight: 700;
}

.review {
  padding: 14px 18px;
  border-radius: 9px;
  border: 2px solid var(--real);
  background: var(--real-bg);
}
.review h4 {
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 800;
}
.review .link {
  display: inline-block;
  margin-top: 8px;
  font-size: 19px;
  font-weight: 800;
  color: var(--real-ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.page {
  position: absolute;
  inset: 0;
  background: #fff;
  opacity: 0;
  transform: translateY(16px);
  pointer-events: none;
  transition:
    opacity 0.45s,
    transform 0.45s;
}
.page.on {
  opacity: 1;
  transform: none;
}
.page img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  border-radius: 0;
  box-shadow: none !important;
}
</style>
