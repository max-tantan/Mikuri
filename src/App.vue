<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TopNav from './components/layout/TopNav.vue'
import BottomNav from './components/layout/BottomNav.vue'
import AppFooter from './components/layout/AppFooter.vue'
import RouteProgress from './components/layout/RouteProgress.vue'
import ErrorBoundary from './components/ui/ErrorBoundary.vue'

const route = useRoute()
const bare = computed(() => route.meta.bare === true)
</script>

<template>
  <a class="skip-link" href="#main">Lewati ke konten</a>
  <RouteProgress />
  <TopNav v-if="!bare" />
  <main id="main" tabindex="-1" :class="{ 'main--bare': bare }">
    <ErrorBoundary>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </ErrorBoundary>
  </main>
  <AppFooter v-if="!bare" />
  <BottomNav v-if="!bare" />
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

#main:focus {
  outline: none;
}

#main.main--bare {
  min-height: 100dvh;
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
