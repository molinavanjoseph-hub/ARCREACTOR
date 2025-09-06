<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const isEditProfileShown = ref(false)
const userDetailsForm = ref({
    firstName: '',
    lastName: '',
    program: '',
    email: '',
    about: '',
})

const loadUserDetails = () => {
    const saved = localStorage.getItem('userProfile')
    if (saved) {
        const profile = JSON.parse(saved)
        authStore.me = { ...authStore.me, ...profile }
    }
    userDetailsForm.value = {
        firstName: authStore.me?.firstName || '',
        lastName: authStore.me?.lastName || '',
        program: authStore.me?.program || '',
        email: authStore.me?.email || '',
        about: authStore.me?.about || '',
    }
}

const openEditProfile = () => {
    loadUserDetails()
    isEditProfileShown.value = true
}

const updateProfile = () => {
    if (validateForm()) {
        setTimeout(() => {
            authStore.me.firstName = userDetailsForm.value.firstName
            authStore.me.lastName = userDetailsForm.value.lastName
            authStore.me.program = userDetailsForm.value.program
            authStore.me.email = userDetailsForm.value.email
            authStore.me.about = userDetailsForm.value.about

            // Save updated profile to localStorage
            localStorage.setItem('userProfile', JSON.stringify(authStore.me))

            isEditProfileShown.value = false

            Swal.fire({
                icon: 'success',
                title: 'Profile updated successfully!',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                position: 'top-end',
            })
        }, 1000)
    }
}

const validateForm = () => {
    if (!userDetailsForm.value.firstName || !userDetailsForm.value.lastName || !userDetailsForm.value.email) {
        alert('Please fill in all the required fields.')
        return false
    }
    return true
}

onMounted(() => {
    loadUserDetails()
})

onUnmounted(() => {
    console.log('Bye bye..')
})
</script>

<template>
    <!-- Cover & Basic Info -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="h-40 bg-indigo-600 relative">
            <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80"
                alt="Cover"
                class="w-full h-full object-cover opacity-80"
            />
            <div class="absolute inset-0 bg-indigo-600 opacity-50"></div>
            <div class="absolute bottom-0 left-0 ml-6 mb-6 flex items-center space-x-4">
                <img
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?auto=format&fit=facearea&facepad=3&w=64&h=64&q=80"
                    alt="Avatar"
                    class="w-20 h-20 rounded-full border-4 border-white"
                />
                <div class="text-white">
                    <h2 class="text-2xl font-bold">{{ authStore.me?.firstName }} {{ authStore.me?.lastName }}</h2>
                    <p class="text-sm">Class of 2026</p>
                </div>
            </div>
        </div>
        <div class="p-4 flex justify-between items-center">
            <div>
                <span class="text-sm text-gray-600">Manila, Philippines</span>
            </div>
            <button
                @click="openEditProfile"
                class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm"
            >
                Edit Profile
            </button>
        </div>
    </div>

    <!-- About Section -->
    <section class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">About</h3>
        <p class="text-gray-700 mb-4">{{ authStore.me?.about }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div><span class="font-medium">Program:</span> {{ authStore.me?.program }}</div>
            <div><span class="font-medium">Year:</span> Junior (Class of 2026)</div>
            <div><span class="font-medium">Email:</span> {{ authStore.me?.email }}</div>
            <div><span class="font-medium">Interests:</span> AI, Robotics, Music</div>
            <div><span class="font-medium">Skills:</span> Python, C++, React</div>
        </div>
    </section>

    <section class="bg-white rounded-lg shadow p-6 space-y-6">
        <h3 class="text-lg font-semibold">Recent Posts</h3>
        <!-- Post item -->
        <div class="border-t pt-4 first:border-t-0 first:pt-0">
            <div class="flex items-start space-x-3">
                <img
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?auto=format&fit=facearea&facepad=3&w=64&h=64&q=80"
                    alt="Avatar"
                    class="w-10 h-10 rounded-full"
                />
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="font-semibold text-gray-800">{{ authStore.me?.firstName }} {{ authStore.me?.lastName }}</h4>
                            <span class="text-sm text-gray-500">Posted 3 days ago</span>
                        </div>
                        <button class="text-gray-400 hover:text-gray-600">
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                            </svg>
                        </button>
                    </div>
                    <p class="mt-2 text-gray-700">
                        Just completed building a chatbot using natural language processing! Excited
                        to integrate it into our study group platform.
                    </p>
                    <div class="mt-3 flex space-x-6 text-sm text-gray-600">
                        <button class="flex items-center hover:text-indigo-600">
                            <svg
                                class="w-5 h-5 mr-1"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14 9l3-3 3 3m0 6l-3 3-3-3M3 12h12"
                                />
                            </svg>
                            24 Likes
                        </button>
                        <button class="flex items-center hover:text-indigo-600">
                            <svg
                                class="w-5 h-5 mr-1"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8 10h.01M12 10h.01M16 10h.01M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h3l4 4 4-4h3a2 2 0 002-2z"
                                />
                            </svg>
                            8 Comments
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Another Post -->
        <div class="border-t pt-4">
            <div class="flex items-start space-x-3">
                <img
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?auto=format&fit=facearea&facepad=3&w=64&h=64&q=80"
                    alt="Avatar"
                    class="w-10 h-10 rounded-full"
                />
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="font-semibold text-gray-800">{{ authStore.me?.firstName }} {{ authStore.me?.lastName }}</h4>
                            <span class="text-sm text-gray-500">Posted 1 week ago</span>
                        </div>
                        <button class="text-gray-400 hover:text-gray-600">
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                            </svg>
                        </button>
                    </div>
                    <p class="mt-2 text-gray-700">
                        Thanks to everyone who came to my workshop on deep learning! It was a great
                        turnout and I hope you all found it useful.
                    </p>
                    <div class="mt-3 flex space-x-6 text-sm text-gray-600">
                        <button class="flex items-center hover:text-indigo-600">
                            <svg
                                class="w-5 h-5 mr-1"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14 9l3-3 3 3m0 6l-3 3-3-3M3 12h12"
                                />
                            </svg>
                            43 Likes
                        </button>
                        <button class="flex items-center hover:text-indigo-600">
                            <svg
                                class="w-5 h-5 mr-1"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8 10h.01M12 10h.01M16 10h.01M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h3l4 4 4-4h3a2 2 0 002-2z"
                                />
                            </svg>
                            12 Comments
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div
        class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-51"
        :class="{ hidden: !isEditProfileShown }"
    >
        <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <!-- Close Button -->
            <button
                @click="isEditProfileShown = false"
                class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>

            <!-- Modal Header -->
            <h2 class="text-xl font-semibold mb-4">Personal Details</h2>

            <!-- Modal Form -->
            <form @submit.prevent="updateProfile" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        v-model="userDetailsForm.firstName"
                        type="text"
                        class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        v-model="userDetailsForm.lastName"
                        type="text"
                        class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <h2 class="text-lg font-semibold mb-2">Program</h2>
                    <select
                        v-model="userDetailsForm.program"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    >
                        <option disabled >Select your program</option>
                            <option value="computer_science">Computer Science</option>
                            <option value="Information_Technology">Information Technology</option>
                            <option value="business_administration">Business Administration</option>
                            <option value="accounting">Accounting</option>
                            <option value="psychology">Psychology</option>
                            <option value="education">Education</option>
                            <option value="nursing">Nursing</option>
                            <option value="engineering">Engineering</option>
                            <option value="hospitality_management">Hospitality Management</option>
                            <option value="computer_science">Computer Science</option>
                            <option value="information_technology">Information Technology</option>
                            <option value="business_administration">Business Administration</option>
                            <option value="accounting">Accounting</option>
                            
                           
                            
                            
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">About</label>
                    <textarea
                        v-model="userDetailsForm.about"
                        rows="3"
                        class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ></textarea>
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
