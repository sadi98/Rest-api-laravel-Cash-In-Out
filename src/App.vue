<template>
    <NavbarView />
    <div class="mt-8"></div>
    <router-view/>
</template>

<script>
import NavbarView from '@/components/NavbarView.vue'
 export default {
    components: { NavbarView },
 };
</script>

<style>
</style>