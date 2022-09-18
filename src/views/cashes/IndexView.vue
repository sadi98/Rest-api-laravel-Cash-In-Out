<template>
    <div class="container">
        <div class="flex">
            <div class="w-full lg:w-8/12 mr-6">
                <!-- Card Balances -->
                <div class="w-full mb-8">
                    <div class="bg-gray-200 transform -rotate-2 rounded-2xl">
                        <div class="bg-gradient-to-br from-blue-600 to-light-blue-200 text-blue-100 p-6 transform rotate-2 rounded-2xl">
                            <!-- Text Balances -->
                            <label class="block uppercase text-xs text-red-100 font-semibold tracking-wider mb-1">
                                Balances
                            </label>
                            <div class="text-3xl font-semibold">
                                Rp {{ state.balances }},-
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Card Balances -->
                <!-- Card Debit & Credit -->
                <div class="flex items-center -mx-2">
                    <!-- Card Debit -->
                    <div class="w-full px-2 ">
                        <div class="bg-gray-200 transform -rotate-3 rounded-2xl">
                            <div class="bg-gradient-to-br from-teal-500 to-cyan-400 text-white p-6 transform rotate-3 rounded-2xl">
                                <!-- Text Debit -->
                                <label class="block uppercase text-xs text-teal-100 font-semibold tracking-wider mb-1">
                                    Debit
                                </label>
                                <div class="text-3xl font-semibold">
                                    Rp {{ state.debit }},-
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Debit -->
                    <!-- Card Credit -->
                    <div class="w-full px-2">
                        <div class="bg-gray-200 transform -rotate-3 rounded-2xl">
                            <div class="bg-gradient-to-br from-red-500 to-yellow-400 text-white p-6 transform rotate-3 rounded-2xl">
                                <!-- Text Credit -->
                                <label class="block uppercase text-xs text-blue-100 font-semibold tracking-wider mb-1">
                                    Credit
                                </label>
                                <div class="text-3xl font-semibold">
                                    Rp {{ state.credit }},-
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Credit -->
                </div>
                <!-- Card Transaction -->
                <div class="my-10">
                    <div class="border rounded-lg overflow-hidden">
                        <div class="border-b px-6 py-4 bg-gradient-to-br from-gray-900 to-slate-50 flex items-center justify-between">
                            <div class="text-white font-semibold text-lg">
                                Transaction History
                            </div>
                            <form @submit.prevent="getCashes" class="flex items-center">
                                <input type="date" v-model="form.begin" class="bg-gradient-to-tr from-gray-500 to-slate-50 rounded px-3 py-2 mr-2">
                                <input type="date" v-model="form.to" class="bg-gradient-to-tr from-gray-500 rounded px-3 py-2 mr-2">
                                <input type="submit" class="px-3 py-2 rounded bg-gradient-to-tr from-green-400 to-blue-500 hover:from-red-600 hover:to-indigo-500 hover:text-white" value="Go">
                            </form>
                        </div>
                        <div class="h-112 overflow-y-scroll">
                            <!-- Looping Transaction -->
                            <template v-for="transaction in state.transaction" :key="transaction.id">
                                <router-link :to="`/cashes/${transaction.slug}`" class="px-6 py-4 flex justify-between items-center hover:bg-gray-100 border-b">
                                    <span class="flex flex-col">
                                        <span class="text-gray-500 text-xs">
                                            {{ transaction.when }}
                                        </span>
                                        <span>
                                            {{ transaction.name }}
                                        </span>
                                    </span>
                                    <span :class="transaction.isCredit ? 'text-red-500' : 'text-green-500'">
                                        Rp {{ transaction.amount }},-
                                    </span>
                                </router-link>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-4/12">
                <h1 class="text-center font-semibold text-lg text-gray-800 mb-5">
                    Add Transaction
                </h1>
                <form @submit.prevent="add">
                    <div class="mb-5">
                        <label for="name" class="text-xs uppercase font-medium block mb-2">
                            Transaction Name
                        </label>
                        <input type="text" v-model="form.name" name="name" class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-10 px-4 transition duration-150" id="name">
                        <!-- <div class="text-red-500 mt-2 text-sm" v-if="errors['name']"> 
                            {{ errors['name'][0] }} 
                        </div> -->
                    </div>
                    <div class="mb-5">
                        <label for="amount" class="text-xs font-medium block mb-2">
                            AMOUNT ( Awali dengan (-) jika pengeluaran)
                        </label>
                        <input type="text" v-model="form.amount" name="amount" class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-10 px-4 transition duration-150" id="amount">
                        <!-- <div class="text-red-500 mt-2 text-sm" v-if="errors['name']"> 
                            {{ errors['name'][0] }} 
                        </div> -->
                    </div>
                    <div class="mb-5">
                        <label for="when" class="text-xs uppercase font-medium block mb-2">
                            When
                        </label>
                        <input type="date" v-model="form.when" name="when" class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-10 px-4 transition duration-150" id="when">
                        <!-- <div class="text-red-500 mt-2 text-sm" v-if="errors['name']"> 
                            {{ errors['name'][0] }} 
                        </div> -->
                    </div>
                    <div class="mb-5">
                        <label for="description" class="text-xs uppercase font-medium block mb-2">
                            Description
                        </label>
                        <textarea v-model="form.description" name="description" class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 py-4 px-4 transition duration-150" id="description"></textarea>
                        <!-- <div class="text-red-500 mt-2 text-sm" v-if="errors['name']"> 
                            {{ errors['name'][0] }} 
                        </div> -->
                    </div>
                    <button type="submit" class="w-full px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:ring-blue-300 focus:shadow-lg focus:outline-none focus:ring-0">
                        Add Transaction
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, reactive ,ref} from 'vue';
import axios from 'axios';

export default {
    setup () {
        const state = ref([])
        // Filter
        const form = reactive({
            begin: '',
            to: '',
            name:'',
            amount:'',
            when:'',
            description:'',
        })
        // method get data
        const getCashes = async () => {
            let {data} = await axios.get('api/cash', {
                params: {
                    from: form.begin, 
                    to: form.to, 
                }
            });
            state.value = data
            form.begin = data.firstOfMonth
            form.to = data.now
        } 
        // Method Add
        const add = async () => {
            let response = await axios.post('api/cash/create', form)
            state.value.transaction.unshift(response.data.cash)
        }
        onMounted(() => {
            getCashes()
        })
        return {state, form, getCashes, add}
    }
};
</script>

<style>
</style>