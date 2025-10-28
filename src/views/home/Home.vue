<template>
  <div>
    <HomeMobile v-if="isMobile" />

    <template v-else>
      <HeroBanner />
      <HeroInfo />
      <HeroService />
      <HeroNav />
    </template>
  </div>
</template>

<script setup>
import { useDevice } from "@/composables/useDevice";
import HeroBanner from "@/components/home/HeroBanner.vue";
import HeroInfo from "@/components/home/HeroInfo.vue";
import HeroService from "@/components/home/HeroService.vue";
import HeroNav from "@/components/home/HeroNav.vue";
import HomeMobile from "@/components/home/HomeMobile.vue";

const { isMobile } = useDevice();
</script>
