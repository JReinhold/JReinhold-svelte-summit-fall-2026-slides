<!-- Title slide: the talk on a gradient panel, the speaker on a black panel. -->
<script setup lang="ts">
defineProps<{ name: string; photo: string; handle?: string }>()
</script>

<template>
  <div class="slidev-layout split-cover">
    <div class="talk">
      <slot />
    </div>
    <div class="speaker">
      <img class="photo" :src="photo" alt="" />
      <div class="name">{{ name }}</div>
      <div v-if="handle" class="handle"><img src="/brand/bluesky.png" alt="" />{{ handle }}</div>
      <div class="badges">
        <div class="badge"><img src="/brand/storybook.svg" alt="" /><b>Storybook</b><span>Core Maintainer</span></div>
        <div class="badge"><img src="/brand/chromatic.svg" alt="" /><b>Chromatic</b><span>Staff Engineer</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.split-cover {
  width: 100%;
  height: 100%;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #000;
  color: #fff;
}
.talk {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background: url('/brand/gradient.png') center / cover;
}
.talk :deep(h1) {
  color: #fff;
  font-size: 3em;
  line-height: 1.1;
}
.talk :deep(p) {
  color: #fff;
  font-size: 1.4em;
  font-weight: 600;
  margin-top: 1.2rem;
  opacity: 0.95;
}
.speaker {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}
.photo {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.6rem;
}
.name {
  font-size: 2em;
  font-weight: 900;
}
.handle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2em;
  color: #cbd5e1;
}
.handle img {
  height: 1em;
}
.badges {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.4rem;
}
.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15.5rem;
  gap: 0.45rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid #334155;
  border-radius: 999px;
  font-size: 0.85em;
}
.badge img {
  height: 1.2em;
  border-radius: 4px;
}
.badge span {
  color: #94a3b8;
}
</style>
