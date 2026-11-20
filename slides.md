---
theme: ./
title: Your Agent Doesn't Know Your Components
colorSchema: light
transition: none
fonts:
  provider: none
  sans: Nunito Sans Variable
  mono: JetBrains Mono Variable
drawings:
  enabled: false
codeCopy: false
layout: split-cover
name: Jeppe Reinhold
photo: /brand/jeppe.jpg
handle: reinhold.is
---

# Your Agent<br>Doesn't Know<br>Your Components

Svelte Summit · Fall 2026

<!--
Hi, I'm Jeppe. I work on the Storybook team at Chromatic.
I spend all my time on open source, which is fantastic. The cherry on top: I'm responsible for Storybook's Svelte integration.
Today is about the one part of Svelte that your agent can't learn from the Svelte docs: your components.
-->

---
layout: figure
---

# Agents can write Svelte.

![The Svelte docs page for AI tools](/img/svelte-ai-docs.png)

<!--
Paolo just gave an awesome talk about how agents get help to write Svelte.
With the official Svelte AI tools, agents write good Svelte 5 today.
That problem is close to solved.
-->

---
layout: statement
---

# But not <span class="sb-gradient-text">your</span> Svelte.

<!--
But good Svelte code is only part of the problem.
The agent knows Svelte. It does not know your Svelte: your components, your design system, your conventions.
That is what this talk is about.
-->

---
layout: figure
---

# Storybook

![Storybook with the Input component, its stories and its controls](/img/storybook-input.png)

<!--
Last year I asked how many of you use Storybook with Svelte. Let's try again: hands up.
For everyone else: Storybook is a local tool to work on your components in isolation. You develop, document and test them there.
Each state of a component is a story. Here: the Input component, its stories on the left, its props as controls to the side or at the bottom.
My talk from last year's Svelte Summit covers the basics, if you want more.
-->

---
layout: statement
---

# Know · Verify · Review

<!--
Three problems, three parts.
Know: how your agent learns your components.
Verify: how your agent checks its own UI work.
Review: how you check the agent's work.
At the end: what else the upcoming version of Storybook brings to Svelte.
-->

---
layout: section
---

# 1 · Know

Your agent doesn't know your components.

<!--
Problem one.
Agents can learn Svelte. But they need to master your components.
-->

---
class: prompt
---

<div class="chat">
  <div class="msg user"><span class="who">You</span><div class="bubble">Computer, add feature to my app</div></div>
  <div class="msg agent"><span class="who">Agent</span><div class="bubble dots"><i></i><i></i><i></i></div></div>
</div>

<!--
You ask your agent to build something. Say, a "New post" page for a blog.
Of course you want it to use the components you already have. They come from a library like Skeleton, or from your own design system.
One of three things happens. Which one depends on how smart your model is.
-->

---
class: tight
---

# Three ways this goes

<div class="cols cols-3">
<div v-click>

### Builds it again

<WayBuildsAgain />

</div>
<div v-click>

### Reads everything

<WayReadsEverything />

</div>
<div v-click>

### Reads stale docs

<WayStaleDocs />

</div>
</div>

<!--
[click] One: the agent builds it again, from scratch.
You have a Button. The agent writes a new button, with its own class.
Older, smaller and cheaper models do this, unless you tell them not to.

[click] Two: the agent reads everything.
It greps and reads component source, and the places that use the components.
It often gets it right. But source code shows how a component is built, not how you want it used.

[click] Three: you wrote markdown docs for your agents, component by component.
This works great, while the docs are correct.
But it's a chore to keep them up to date. Here the doc says `kind`, and the component says `variant`.
And they drift away from the docs you write for people.
-->

---
layout: figure
---

# Your Storybook already knows

![The Button docs page in Storybook](/img/autodocs-button.png)

<!--
You already develop and document your components in Storybook.
People already use it to understand your library: stories as examples, controls for the props, and written docs.
This is the docs page for Button. Storybook makes it from the component and its stories.
Your agent can have the same information.
-->

---
class: code-sm center-code
---

```md
$ npx storybook tools docs list

# Components
- PostEditor (posts-posteditor): the form that writes a new post or edits an existing one
- PostCard (posts-postcard): one post in a list, with its title link, excerpt, meta and tags
- Button (ui-button): starts an action, or links to a page with the look of a button
- Card (ui-card): a surface that groups content, with an optional header and footer
- EmptyState (ui-emptystate): a message, with an optional action, for a place that has no content
… 26 more

# Docs
- Docs (ui-design-tokens--docs): The CSS custom properties for colour, type, space, …
```

<!--
Storybook 11 has a CLI made for agents: `storybook tools`.
`docs list` gives every component: its ID and a one-line summary.
The agent sees the whole library at once, and picks what it needs.
-->

---
class: code-14 tight
---

# One source. Two readers.

<div class="cols cols-doc">
<div class="shot"><img src="/img/autodocs-button-crop.png" /></div>
<div>

```md
$ npx storybook tools docs show --id ui-button

# Button
The button of the design system. It starts an action,
such as Publish or Delete. …

## Props
variant?: "primary" | "secondary" | "ghost" | "danger" = "primary";
size?: "sm" | "md" = "md";
href?: string;
disabled?: boolean = false;
loading?: boolean = false;

## Stories
### Secondary
The other actions of a view, next to the primary button.

<Button variant="secondary">Save draft</Button>
```

</div>
</div>

<!--
Then it asks for one component, with `docs show`.
On the left: the page people read. On the right: what the agent reads.
One source, two readers.
The agent gets the description, the props with types and defaults, and the stories as usage examples.
When the component changes, both change. There is nothing extra to maintain.
-->

---
class: tight demo-setup
---

# “Demo”

<div class="setup-link">
  <span>The full transcript</span>
  <b>is.gd/sbdemo</b>
</div>

<img class="qr setup-qr" src="/img/demo-qr.svg" alt="QR code that links to the full transcript of the demo run" />

<!--
Agents are slow, and I have 25 minutes. So I ran the demo before the talk.
You will see it in three parts, one for each part of this talk. It is a real run, shortened to fit the slides.
The app is Field Notes, a small blog made with SvelteKit. It has 31 components, and they all have stories.
It runs Storybook 11, and AGENTS.md tells the agent to use the Storybook skills.
The model is a small one: Haiku, at medium effort.
And I gave it one prompt. You saw it earlier: build the New post page.
The QR code goes to the full transcript, so you can read every step yourself.
(Optional) Wait a moment so people can scan it.
-->

---
class: code-15 tight
disabled: true
---

# How the agent knows

```md
<!-- AGENTS.md -->
## Storybook
For every change to how the UI looks, follow these steps in order.
Each step has a Storybook skill. …

1. `component-docs`: look up the components to reuse …
2. `write-stories`: every component you create or change gets stories.
3. `test-stories`: run the story tests after every change … and fix what fails.
4. `ui-review`: publish a review that shows the user what changed …
```

```md
<!-- .claude/skills/component-docs/SKILL.md -->
Run `npx storybook skills component-docs` in a command of its own
before you read any component's source, and follow its output. …
```

<!--
How does the agent know to call these?
Storybook adds this section to your AGENTS.md. It names four skills.
They follow the order of the work: look up components, write stories, test the stories, publish a review.
Those are the three parts of this talk.
Storybook also installs the four skills. But look at the skill file, at the bottom. It is almost empty.
It says one thing: run `storybook skills`, and follow the output.
-->

---
class: tight
clicks: 4
---

# “Demo”

<Transcript part="know" />

<!--
This is the start of the run. First, the prompt.
The first thing it does is read AGENTS.md. So it loads the skills before it edits anything.

[click] Each skill tells it to run a command. Storybook prints the instructions for that step, written for this project.

[click] Then `docs list`. It gets every component in the project, with a summary.
It picks from that list: PostEditor, PostMeta, Card.

[click] Then `docs show`, once for each component it wants to use.
Here is PostEditor. One prop, and the docs say: use it for the New post page.

[click] And this is the page it wrote.
It did not build a new form. It used my PostEditor, my EmptyState, my Skeleton.

Say: it did not guess the props. It asked Storybook, and it used my components.
-->

---
class: tight
disabled: true
---

# How it works

<HowItWorks />

<!--
How does this work?
Docgen is the part of Storybook that reads your components and extracts the props. It has existed for a long time.
For Storybook 11 we rewrote it from scratch. It now runs on the server, it's faster and more precise, and other tools can call it.
It reads your components, stories and docs, and writes a manifest: a JSON file.
Everything reads that manifest. Autodocs for people. The CLI and skills for your agent. MCP for other teams' agents.
The manifest format is still experimental, so it is not documented yet.
And your stories are already usage examples. The snippets we show people are the same ones the agent gets.
-->

---
class: tight
---

# For the whole team

<RemoteMcp />

<!--
This also works for a whole team, or a whole company.
Publish your Storybook to Chromatic, which is free, and you get an MCP server for that Storybook.
An agent in another team connects to it, and knows your design system without your repo.
You can also host it yourself, with the `@storybook/mcp` package.

(Optional) If you use our local MCP addon today: everything in this talk works there too.
But a dev server plus a local MCP server is awkward, so the CLI is where we are going.
-->

---
layout: section
---

# 2 · Verify

How does the agent verify its own UI?

<!--
Problem two.
Your agent now builds UI with your components, the way you want.
But how does it check that the UI works?
-->

---
class: tight
---

<TestScopeCompare />

<!--
An agent has many ways to check UI.
The first: a real browser, or Playwright tests, against the whole app.
They're great. But they're slow, and they need a backend.
It is hard to get the UI into the one state you want to check.
And the test covers much more than the component that changed.

[click] A story test runs one component, in a real browser, with the remote functions or API calls mocked.
No backend. Any state.
-->

---
class: code-sm tight
disabled: true
---

# What about Vitest browser mode?

```md
$ npx storybook tools test run

## Failing Stories
### posts-posteditor--submitting
expect(element).toBeDisabled()
Received element is not disabled:
  <button class="button primary md" type="submit" />

## Accessibility Violations
### ui-pagination--first-page - color-contrast
- **Impact**: serious
  **Message**: Element has insufficient color contrast of 2.58 … Expected 4.5:1
  **Element**: <span class="step disabled">← Previous</span>
  **Inspect**: http://127.0.0.1:6006/?path=/story/ui-pagination--first-page&…

## Result
Failed: 1 component test failed, 14 accessibility checks failed.
```

<!--
Some of you now think: Vitest browser mode does this too.
You are right. Story tests run on Vitest browser mode. It is the same engine.
So why does the agent not call Vitest directly? Three reasons. Two are on this slide.
One: the output is made for an agent. It is markdown, with the story ID, the assertion and the element.
And the accessibility violations come in the same run.
Two: every violation has a link. It opens that story in Storybook, at the element that fails.
The agent can give that link to you. You see the problem, interactive, and you tell the agent what to do.
Three: it is faster. That is the next slide.
-->

---
class: tight
---

# One Storybook. Many users.

<AttachedCli />

<!--
The agent runs story tests with a CLI command, like the docs commands before.
These commands do not start a new Storybook.
They attach to the dev server that you already have running.
That makes them fast. Vite is warm, the docs are already extracted, the test runner is up.
With no dev server running, the commands still work. They are just slower.
And you see what the agent does. When it runs the tests, the results show up in your sidebar, live.
On the right is my sidebar after the agent's test run.
It also works the other way. The agent can put things into the Storybook that you are looking at.
Remember that one. We need it in part three.
-->

---
class: tight
clicks: 1
---

# “Demo”

<Transcript part="verify" />

<!--
Back to the conversation. The page is written.
The skill says: every component you create gets stories. So it writes them. Eight in total.
This one is the page. It mocks the remote function, and it checks what the writer sees.

[click] Then it runs every story in the project.
252 tests pass, and there are no accessibility violations.
Nothing failed this time. When a test does fail, the agent sees the output from before, and fixes it.
-->

---
class: code-15 tight
---

# Coming soon: `inspect`

```md
$ npx storybook tools stories inspect --storyId posts-posteditor--submitting

### HTML
<button type="submit" disabled aria-busy="true" …>
  <span class="spinner"></span> Save changes
</button>

### CSS
button.primary { cursor: progress; … }
…

### Accessibility tree
- form "Edit post"
  - …
  - button "Save changes" [disabled] [busy]

### Screenshot
/tmp/storybook/inspect/posts-posteditor--submitting.png
```

<!--
Today the agent sees test results and accessibility results.
We are prototyping the next step: inspect.
One call gives the rendered HTML, the CSS, the accessibility tree, a screenshot, and later traces.
Each output is a flag. The agent turns on what the situation needs. It writes no test code and saves no files.
This output is a sketch. The final format can change.
Many harnesses do parts of this today. The difference: this works with any agent, any harness, any model.
Your team gets the same tools, even when everyone has a different setup. That is true for everything I show today.
-->

---
layout: section
---

# 3 · Review

How do **you** verify the agent?

<!--
Problem three.
Your agent now builds UI that works. But how do you check it?
You can't review UI by reading code. That promised land is reserved for backend engineers.
You have to look at it, and play with it.
The agent gives you a summary, and a summary is not the full picture.
It forgets changes. Or it broke something in another place, and does not know.
-->

---
class: tight
clicks: 2
---

# “Demo”

<Transcript part="review" />

<!-- Skipped to save time (the `stories changed` step). To bring it back: set showChanged in Transcript.vue, clicks: 3, and put these lines after the first note line, with [click] before "It publishes a review".
Now it asks Storybook which stories its changes affect. Eight, all new.
Storybook knows this from Vite's module graph: which files changed, and which stories import them.
So it also finds the story of another component that the change broke.
-->

<!--
The same conversation, at the end. The tests pass.
It publishes a review. Look at what it sends: a title, a description, and groups of stories. Each group has a reason.

[click] And its answer ends with a link to that review, made for me.

[click] This is where the link goes.

SWITCH to the review page in Storybook.
Click three stories: the new page, the page with no drafts, the drafts list.
Read one of the agent's notes aloud.

Say: what changed and why, right next to the story. And I can play with each one.
-->

---
class: tight
---

# Know · Verify · Review

<RunSummary />

<p class="punch">Any agent. Any harness. Any model.</p>

<!--
To sum up, with the run you just saw. One prompt, a small model.
Know: the agent read the same component docs that you write for people, and it reused five of my components.
Verify: it wrote stories, and it tested its work with story tests. Soon it can inspect stories too.
Review: I got a UI walkthrough that the agent prepared.
All of it is a CLI. It works with any agent, any harness, any model.
-->

---
class: bento
---

<div class="bento-grid">
<div class="tile hero">

Storybook 11 ♥ Svelte

<img src="/brand/svelte.svg" />

<h2>Svelte is<br>now a core<br>framework</h2>

</div>
<div class="tile csf">

### Svelte CSF, built in

```svelte
<!-- Button.stories.svelte -->
<Story name="Primary">Publish</Story>
<Story name="Small" args={{ size: 'sm' }}>
  Edit
</Story>
```

</div>
<div class="tile factories">

### Type-safe<br>CSF Factories

```ts
import preview
  from '#.storybook/preview';

const { Story } = preview.meta({
  component: Button,
});
```

</div>
<div class="tile newdocs">

### Complete Svelte docs

storybook.js.org

</div>
<div class="tile mocking">

### Simplified SvelteKit<br>mocking API

```ts
import { goto } from '$app/navigation';
import { page } from '$app/state';

page.url = new URL('http://localhost/posts');
expect(goto).toHaveBeenCalledWith('/posts/1');
```

</div>
<div class="tile agentdocs">

### Agent docs

```sh
npx storybook tools docs list
```

```svelte
<!-- @component …
@summary starts an action… -->
```

</div>
<div class="tile tests">

### Agent tests

```sh
npx storybook tools test run
✓ 247 stories, no violations
```

</div>
<div class="tile review">

### Agent review

```sh
npx storybook tools review create
```

</div>
<div class="tile remote">

### Remote functions <span class="tag">work in progress</span>

```ts
mockRemote(listPosts)
  .mockResolvedValue(posts);
```

</div>
</div>

<!--
That was the agent work. Here is what else Storybook 11 brings to Svelte.
The big one: Svelte is now a core framework.
That sounds strange. But until now, Svelte was an integration that the community maintained.
Now we commit to it: new Storybook features work great with Svelte too. Like everything you saw today.
Svelte CSF is no longer an addon. It is built in.
CSF Factories: you import your preview, and the types flow into every story.
The Svelte docs got an overhaul, so everything is documented for Svelte.
SvelteKit mocking is simpler. It is less special now: you import the real module, set values, and assert on it. The same pattern as any mock in Vitest or Storybook.
Then the agent docs, tests and review.
And one tile is marked work in progress.
-->

---
layout: section
---

# Testing Remote Functions?

<div class="links">
  <span>Example app</span>
  <b>vitest-plugin-sveltekit.netlify.app</b>
  <span>Its Storybook</span>
  <b>vitest-plugin-sveltekit.netlify.app/storybook</b>
  <span>The code</span>
  <b>vitest-plugin-sveltekit.netlify.app/repo</b>
</div>

<!--
Have you heard about remote functions?
Have you tried to test them?
Or worse: have you tried to test a component that uses them?
Since they were announced, people keep asking me what to do with remote functions in Storybook.
I think we finally have an answer. I do not have the time to show it today.
It is experimental, and it is not released yet. It depends on changes in SvelteKit too.
But you can look at it today: the example app, its Storybook, and the code on GitHub.
Stay tuned. I hope we have something to announce soon.
-->

---
layout: end
class: code-md
---

# Storybook 11

Beta today · stable December 2026

```md
$ npx storybook@next upgrade
```

<div class="links">
  <b>storybook.js.org/docs/11/ai</b>
</div>

<!--
Storybook 11 is in beta today. It goes stable in December.
Try it with this one command.
The AI docs are at this link.
Thank you.
-->

---

# `vitest-plugin-sveltekit`

<TestScopes />

<div v-click="[2, 3]" class="code-modal">

```ts
import { mockRequestEvent, submitForm } from 'vitest-plugin-sveltekit/server.mock';
import { createPost } from '#lib/posts.remote.ts';
import { signIn } from '#lib/account.remote.ts';

test('the handler reports a short title', async () => {
  const { issues } = await submitForm(createPost, { title: 'Hi' });
  expect(issues[0].message).toBe('Title must be at least 3 characters');
});

test('signing in sets the session cookie', async () => {
  await signIn({ name: 'svelty', password: 'secret' });

  const event = mockRequestEvent();
  expect(event.cookies.get('session')).toBeDefined();
});
```

</div>

<div v-click="[5, 6]" class="code-modal">

```svelte
<script module>
  import { mockRemote } from 'vitest-plugin-sveltekit/remote.mock';
  import { listPosts } from './blog.remote.ts';
</script>

<Story
  name="Two posts"
  beforeEach={() => {
    mockRemote(listPosts).mockResolvedValue([
      { id: 1, title: 'Hello Svelte Summit' },
      { id: 2, title: 'Testing remote functions' },
    ]);
  }}
  play={async ({ canvas }) => {
    await expect(await canvas.findByText('Hello Svelte Summit')).toBeVisible();
  }}
/>
```

</div>

<div v-click="8" class="code-modal">

```svelte
<script module>
  import { db } from '#lib/server/db.ts';
  import { sendEmail } from '#lib/server/email.ts';
</script>

<!-- The real publishPost handler runs. Only the database and email are mocked. -->
<Story
  name="Publish a draft"
  beforeEach={async () => {
    await db.insert(posts).values({ title: 'My draft', published: false });
  }}
  play={async ({ canvas, userEvent }) => {
    await expect(await canvas.findByText('My draft')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Publish' }));
    await expect(sendEmail).toHaveBeenCalledWith('subscribers', 'My draft');
  }}
/>
```

</div>

<!--
We are experimenting with a new package, `vitest-plugin-sveltekit`, together with the Svelte core team.
This is your application: a component, SvelteKit's client runtime, the remote function handler, and the database and email behind it.
There are three ways to test it.

[click] One: a unit test. Only the handler is real.

[click] You import the remote function and call it. No server.
`submitForm` sends form data to the handler. `mockRequestEvent` gives you the request event, so you can check the cookie.

[click] (back to the diagram)

[click] Two: a component test. The component and SvelteKit's client runtime are real. Only the handler is mocked.
So all the client-side magic that connects the component to the handler still runs.

[click] `mockRemote` takes the real remote function, and you give it a value. The same as any mock.
The story then checks that the posts show up.
Live queries work too: the mock is a generator function, and the component updates on each value.

(Optional) SWITCH to the "Live" story in Storybook. Emit two values from the Live feed panel.

[click] (back to the diagram)

[click] Three: both together. The real handler runs in your component test.
All of this still runs in the browser. So you mock what the handler depends on: the database and email.

[click] The story adds a draft to the mocked database. The real `publishPost` handler runs.
I click Publish, and check that the email was sent.
-->

---
layout: center
---

# Experimental. Not released yet.

<div class="links">
  <span>Example app</span>
  <b>vitest-plugin-sveltekit.netlify.app</b>
  <span>Its Storybook</span>
  <b>vitest-plugin-sveltekit.netlify.app/storybook</b>
  <span>The code</span>
  <b>vitest-plugin-sveltekit.netlify.app/repo</b>
</div>

<!--
None of this is released yet.
It depends on changes in SvelteKit too.
But you can look at it today: the example app, its Storybook, and the code on GitHub.
Stay tuned. I hope we have something to announce soon.
-->
