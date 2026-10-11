<script setup lang="ts">
import TopNav from './components/layout/TopNav.vue'
import BottomNav from './components/layout/BottomNav.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">Lewati ke konten</a>
  <TopNav />
  <main id="main">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
  <BottomNav />
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: -999px;
  top: var(--s-2);
  z-index: 100;
  background: var(--primary);
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: var(--r-pill);
  font-weight: 700;
}

.skip-link:focus {
  left: var(--s-4);
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.24s var(--ease-soft),
    transform 0.24s var(--ease-soft);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
