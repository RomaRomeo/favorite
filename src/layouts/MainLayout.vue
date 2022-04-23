<template>
  <div>
    <div>
      <navbar />
      <carousel />

      <router-view />

<!--      <main class="auth-container">-->
<!--        <div>-->
<!--          <router-view />-->
<!--        </div>-->
<!--      </main>-->
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Carousel from "@/components/app/Carousel";

export default {
  name: "main-layout",
  components: { Navbar, Carousel },
};
</script>

<style lang="scss">
.auth-container {
  /*min-height: calc(100vh - 44px);*/
  position: relative;
  /*top: 150px;*/
  max-width: 1200px;
  margin: 0 auto;
  &:after {
    content: '';
    background-color: blue;
  }
}
</style>
