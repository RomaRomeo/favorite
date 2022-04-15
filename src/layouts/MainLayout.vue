<template>
  <div>
    <div>
      <Navbar />
      <main class="auth-container">
        <div>
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";

export default {
  name: "main-layout",
  components: { Navbar },
};
</script>

<style lang="scss">
.auth-container {
  /*min-height: calc(100vh - 44px);*/
  position: relative;
  top: 150px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
