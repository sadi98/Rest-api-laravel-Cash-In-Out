<template>
  <div class="container">
    <div class="w-full lg:w-1/3">
      <div class="border rounded-lg overflow-hidden">
      <div class="bg-gray-50 py-4 px-4 border-b border-gray-200 text-center">
        Registration
      </div>
      <div class="p-4">
        <form @submit.prevent="register">
          <!-- Name -->
          <div class="mb-5">
            <label for="name" class="text-xs uppercase font-medium block mb-2">
              Full Name
            </label>
            <input type="text" v-model="form.name" name="name" class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-10 px-4 transition duration-150" id="name">
            <div class="text-red-500 mt-2 text-sm" v-if="errors['name']"> 
                    {{ errors['name'][0] }} 
                </div>
          </div>
          <!-- Email -->
          <div class="mb-5">
            <label for="email" class="text-xs uppercase font-medium block mb-2">
              Email
            </label>
            <input type="email" v-model="form.email" name="email" class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-10 px-4 transition duration-150" id="email">
            <div class="text-red-500 mt-2 text-sm" v-if="errors['email']"> 
                    {{ errors['email'][0] }} 
                </div>
          </div>
          <!-- Password -->
          <div class="mb-5">
            <label for="password" class="text-xs uppercase font-medium block mb-2">
              Password
            </label>
            <input type="password" v-model="form.password" name="password" class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-10 px-4 transition duration-150" id="password">
            <div class="text-red-500 mt-2 text-sm" v-if="errors['password']"> 
                    {{ errors['password'][0] }} 
                </div>
          </div>
          <!-- Confirmation Password -->
          <div class="mb-5">
            <label for="password_confirmation" class="text-xs uppercase font-medium block mb-2">
              Confirmation Password
            </label>
            <input type="password" v-model="form.password_confirmation" name="password_confirmation" class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-10 px-4 transition duration-150" id="password_confirmation">
          </div>
          <button type="submit" class="w-full px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:ring-blue-300 focus:shadow-lg focus:outline-none focus:ring-0">
            Register
          </button>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import store from '@/store';
import { reactive, ref } from 'vue';

export default {
  setup () {
    const errors = ref([])
    const form = reactive({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })
    const register = async () => {
      try {
          await axios.post('register', form)
          await store.dispatch('auth/me')
          router.replace('/')
      } catch (e) {
          errors.value = e.response.data.errors;
      }
    }
    return {form, register, errors} 
  }
};
</script>

<style>
</style>