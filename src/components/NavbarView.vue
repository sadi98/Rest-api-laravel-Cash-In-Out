<template>
    <div class="border-b  lg:py-3">
        <div class="flex flex-col lg:flex-row justify-between">
            <div class="flex justify-between items-center border-b lg:border-b-0 py-4 lg:py-0 px-6 lg:pr-0">
                <router-link exact-active-class="bg-transparent text-black" class="font-semibold uppercase" to="/">
                    Cashinout
                </router-link>
                <!-- button icon navbar -->
                <button @click="isOn = !isOn" class="block lg:hidden focus:outline-none">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path :class="!isOn ? 'block' : 'hidden'" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                        <path :class="isOn ? 'block' : 'hidden'" stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>
            </div>
            <div :class="isOn ? 'block' : 'hidden'" class="py-4 lg:py-0 lg:flex flex-col lg:flex-row justify-between lg:items-center w-full px-6">
                <div class="flex flex-col lg:flex-row lg:items-center">
                    <router-link :class="className" to="/about">About</router-link>
                    <router-link :class="className" to="/cashes">Cash</router-link>
                </div>
                <div class="flex items-center" v-if="authenticated">
                    <router-link :class="className" to="/login">{{ user.name }}</router-link>
                    <button @click="logout" :class="className" class="focus:outline-none">Log out</button>
                </div>
                <div class="flex flex-col lg:flex-row lg:items-center" v-else>
                    <router-link :class="className" to="/login">Login</router-link>
                    <router-link :class="className" to="/register">Register</router-link>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import {computed,ref} from 'vue'
    import store from '@/store';
export default {
    setup() {
        // method navbar
        const className = "px-4 py-2"
        const isOn = ref(false)
        // end navbar

        // method authentication
        const authenticated = computed( () => store.getters['auth/authenticated'])
        const user = computed( () => store.getters['auth/user'])
        // end authentication

        // method logout
        const logout = async () => {
            store.dispatch('auth/logout')
        }
        // end logout
        
        return {className, isOn, authenticated, user, logout}
    }
};

</script>

<style>
</style>