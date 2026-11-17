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

# Your Agent Doesn't Know Your Components

Svelte Summit · Fall 2026

---
layout: figure
---

# Agents can write Svelte.

![The Svelte docs page for AI tools](/img/svelte-ai-docs.png)

---
layout: statement
---

# But not <span class="sb-gradient-text">your</span> Svelte.

---
layout: statement
---

# Know · Verify · Review

---
layout: intro
---

# Jeppe Reinhold

Storybook's Svelte integration · Chromatic

---
layout: figure
---

# Storybook

![Storybook with the PostEditor stories](/img/storybook-posteditor.png)

---
layout: section
---

# 1 · Know

Your agent doesn't know your components.

---
layout: quote
---

# Build the New post page.

---
class: tight
---

# Three ways this goes

<div class="cols cols-3">
<div>

### Builds it again

<img src="/img/way-builds-again.png" />

</div>
<div>

### Reads everything

<img src="/img/way-reads-everything.png" />

</div>
<div>

### Reads stale docs

<img src="/img/way-stale-docs.png" />

</div>
</div>

---
layout: figure
---

# Your Storybook already knows

![The Button docs page in Storybook](/img/autodocs-button.png)

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

---
class: code-xs tight
---

# One source. Two readers.

<div class="cols cols-doc">
<div>

<img src="/img/autodocs-button-crop.png" />

</div>
<div>

```md
$ npx storybook tools docs show --id ui-button

# Button
It starts an action, such as Publish or Delete.
With `href` it is a link that looks like a button.

## Props
variant?: "primary" | "secondary" | "ghost" | "danger" = "primary";
size?: "sm" | "md" = "md";
/** Makes the button a link. Use it for navigation, not for actions. */
href?: string;
type?: "submit" | "reset" | "button" = "button";
disabled?: boolean = false;
/** Shows a spinner and stops the button while its action runs. */
loading?: boolean = false;

## Stories
### Secondary
The other actions of a view, next to the primary button.

<Button variant="secondary">Save draft</Button>

### Other Stories
- Danger: An action that deletes data. Ask for confirmation first.
- Loading: While the action runs, such as a form submit.
```

</div>
</div>

---
class: code-md center-code
---

```md
<!-- AGENTS.md -->
## Storybook

1. `component-docs`: look up the components to reuse
2. `write-stories`: every component you change gets stories
3. `test-stories`: run the story tests, fix what fails
4. `ui-review`: publish a review that shows the user what changed
```

---
layout: statement
---

# Demo

<!--
SWITCH to the finished agent conversation, at the top.
Show the prompt. Scroll to the agent's `docs list` and `docs show` calls. Point at the components it chose.
-->

---
layout: figure
---

# How it works

![From stories to the component manifest to the agent](/img/diagram-how-it-works.png)

---
layout: figure
---

# For the whole team

![The remote MCP server, published with Storybook](/img/diagram-remote-mcp.png)

---
layout: section
---

# 2 · Verify

How does the agent verify its own UI?

---
layout: figure
---

![What each kind of test runs](/img/diagram-test-scope.png)

---
class: code-sm
---

# The agent breaks Publish

```md
$ npx storybook tools test run

## Failing Stories
### posts-posteditor--submitting
expect(element).toBeDisabled()

Received element is not disabled:
  <button class="button primary md svelte-g9c1iq" type="submit" />

    at src/lib/blog/PostEditor.stories.svelte:241:112

## Result
Failed: 1 component test failed.
```

---
layout: figure
---

# And fixes it

![The submit button before and after the fix](/img/behavior-before-after.png)

---
layout: statement
---

# Demo

<!--
SWITCH to the conversation, in the middle.
Scroll to the agent's `npx storybook tools test run` and its result block. Point at the new story IDs.
-->

---
class: code-xs tight
---

# Coming next: inspect

```md
$ npx storybook tools stories inspect --storyId posts-posteditor--submitting

## posts-posteditor--submitting

### HTML
<button class="button primary md" type="submit" disabled aria-busy="true">
  <span class="spinner"></span> Save changes
</button>
<a class="button ghost md" href="/posts/4">Cancel</a>

### CSS
button.button.primary
  background-color: rgb(168, 70, 31)
  cursor: progress

### Accessibility tree
- form "Edit post"
  - textbox "Title"
  - textbox "Body"
  - button "Save changes" [disabled] [busy]
  - link "Cancel"

### Screenshot
/tmp/storybook/inspect/posts-posteditor--submitting.png
```

---
layout: section
---

# 3 · Review

How do **you** verify the agent?

---
layout: statement
---

# Demo

<!--
SWITCH to the conversation, at the end, then the review page in Storybook.
Open the review link. Click three stories: the new page, the new drafts list, one changed component. Read one of the agent's notes aloud.
-->

---
layout: figure
---

# How the review knows

![The module graph from a changed file to its stories](/img/diagram-module-graph.png)

---
layout: center
---

# Know · Verify · Review

<div class="cols cols-3 summary">
<div>

### Docs

`docs list`

`docs show`

</div>
<div>

### Tests

`test run`

</div>
<div>

### Review

`review create`

</div>
</div>

<p class="muted">Any agent. Any model.</p>

---
class: bento
---

<div class="bento-grid">
<div class="tile hero">

Storybook 11 ♥ Svelte

<img src="/brand/svelte.svg" />

<h2>Svelte is<br>a core<br>framework</h2>

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
const { Story } = preview.meta({
  component: Button,
});
```

</div>
<div class="tile review">

### Agent review

```sh
$ npx storybook tools review create
```

</div>
<div class="tile newdocs">

### New Svelte docs

storybook.js.org

</div>
<div class="tile mocking">

### SvelteKit mocking,<br>the Storybook way

```ts
import { goto } from '$app/navigation';
import { page } from '$app/state';

page.url = new URL('http://localhost/posts/new');
expect(goto).toHaveBeenCalledWith('/posts/1');
```

</div>
<div class="tile agentdocs">

### Docs for agents

```sh
$ npx storybook tools docs list
```

</div>
<div class="tile tests">

### Story tests + a11y

```sh
$ npx storybook tools test run
✓ 247 stories, no violations
```

</div>
<div class="tile codedocs">

### Docs from your code

```svelte
<!-- @component …
@summary starts an action… -->
/** `sm` for small places… */
```

</div>
<div class="tile remote">

### Remote functions <span class="tag">experimental</span>

```ts
mockRemote(getPosts)
  .mockResolvedValue(posts);
```

</div>
</div>

---
layout: statement
---

# Remote Functions?

---

# `vitest-plugin-sveltekit`

| Test | What runs |
| --- | --- |
| Unit | the real remote function |
| Mocked | component + SvelteKit's client runtime + a spy |
| Real | component + the real remote function + a mocked database |

---
class: code-lg center-code
---

```ts
import { mockRequestEvent, submitForm } from 'vitest-plugin-sveltekit/server.mock';

test('the handler reports a short title', async () => {
  const { issues } = await submitForm(createPost, { title: 'Hi' });
  expect(issues[0].message).toBe('Title must be at least 3 characters');
});

test('only a signed-in user can delete a post', async () => {
  await expect(deletePost(1)).rejects.toMatchObject({ status: 403 });

  mockRequestEvent({ locals: { user: { name: 'svelty' } } });
  await deletePost(1);
});
```

---
class: code-md center-code
---

```svelte
<Story
  name="Live stream"
  beforeEach={() => {
    feed = mockRemote(getPostCount).mockStream(5);
  }}
  play={async ({ canvas }) => {
    await expect(await canvas.findByText('5')).toBeVisible();

    feed.emit(6);
    await expect(await canvas.findByText('6')).toBeVisible();
  }}
/>
```

<!--
SWITCH to the "Live" story in Storybook. Emit two values from the Live feed panel.
Then show the `mockRemote` lines in one of the agent's new stories.
-->

---
layout: center
---

# Experimental. Not released yet.

<img class="qr" src="/img/qr-example-app.png" />

vitest-plugin-sveltekit.netlify.app

---
layout: end
class: code-md
---

# Storybook 11

Beta today · stable in December

```sh
npx storybook@next upgrade
```

<img class="qr" src="/img/qr-storybook-ai-docs.png" />

storybook.js.org/docs/11/ai
