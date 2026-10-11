<script setup lang="ts">
import { routeLoading } from '../../router'
</script>

<template>
  <Transition name="rp">
    <div v-if="routeLoading" class="rp" role="progressbar" :aria-label="'Loading'">
      <span class="rp__bar"></span>
    </div>
  </Transition>
</template>

<style scoped>
.rp {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 55;
  background: transparent;
}

.rp__bar {
  display: block;
  height: 100%;
  width: 100%;
  transform-origin: left;
  background: var(--primary);
  animation: rp-grow 1.4s var(--ease-soft) forwards;
}

@keyframes rp-grow {
  0% {
    transform: scaleX(0);
  }
  40% {
    transform: scaleX(0.55);
  }
  100% {
    transform: scaleX(0.92);
  }
}

.rp-enter-active,
.rp-leave-active {
  transition: opacity 0.2s var(--ease-soft);
}
.rp-enter-from,
.rp-leave-to {
  opacity: 0;
}
</style>
