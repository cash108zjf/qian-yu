<template>
  <div class="login-container">
    11111
    <form @submit.prevent="handleSubmit">
      <div>
        <label>用户名:</label>
        <input v-model="form.username" type="text" required />
      </div>
      <div>
        <label>密码:</label>
        <input v-model="form.password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? '登录中...' : '登录' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/store.js'

  const router = useRouter()
  const authStore = useAuthStore()

  const form = reactive({
    username: '',
    password: '',
  })

  const loading = ref(false)
  const error = ref('')

  const handleSubmit = async () => {
    loading.value = true
    error.value = ''

    try {
      await authStore.login(form)
      // const redirect = router.currentRoute.value.query.redirect || '/'
      await router.push('/')
    } catch (err) {
      error.value = err.response?.data?.message || '登录失败'
    } finally {
      loading.value = false
    }
  }
</script>
