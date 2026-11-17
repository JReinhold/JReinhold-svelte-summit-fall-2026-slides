<!-- A headline (optional) and one image that fills the rest of the slide. -->
<template>
  <div class="slidev-layout figure">
    <slot />
  </div>
</template>

<style scoped>
.figure {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 2.5rem;
}
.figure :deep(h1) {
  font-size: 1.9em;
  margin: 0;
}
.figure :deep(p:has(img)) {
  flex: 1;
  min-height: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.figure :deep(img) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}
</style>
