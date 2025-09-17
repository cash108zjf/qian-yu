<script setup>
  import { getUserInfo } from '@/api/user'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Dock from 'primevue/dock'

  const router = useRouter()
  const userInfo = ref({})
  const menuItems = ref([
    {
      label: '时光轴',
      icon: 'src/assets/images/time-line.png',
      path: '/time'
    },
    {
      label: '成长地图',
      icon: 'src/assets/images/earth.png',
      path: '/earth'
    },
    // {
    //   label: 'Photos',
    //   icon: 'https://primefaces.org/cdn/primevue/images/dock/photos.svg',
    // },
    // {
    //   label: 'Trash',
    //   icon: 'https://primefaces.org/cdn/primevue/images/dock/trash.png',
    // },
  ])
  getUserInfo().then(res => {
    userInfo.value = res['data']
  })

  function goPage(path) {
    router.push(path)
  }

</script>

<template>
  <div class="frame-box">
    <div class="dock-window">
      <div class="user-name">你好！ {{ userInfo.username }}</div>
      <Dock :model="menuItems" position="top">
        <template #itemicon="{ item }">
          <img v-tooltip.top="item.label" :alt="item.label" :src="item.icon" class="menu-icon" @click="goPage(item.path)" />
        </template>
      </Dock>

      <div class="frame-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .frame-box {
    .dock-window {
      width: 100%;
      height: 100vh;
      position: relative;
      background-image: url("src/assets/images/background.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      z-index: 1;
      .menu-icon {
        width: 100%;
        cursor: pointer;
      }
    }

    .p-dock {
      z-index: 1000;
    }
    .user-name {
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 2;
    }
    .frame-content {
      width: 100%;
      height: 100%;
    }
  }
</style>
<style>
  .frame-box {
    .p-dock-list-container {
      background: rgba(255, 255, 255, 0.5);
      padding: 0;
      margin-top: 5px;
    }
  }
</style>
