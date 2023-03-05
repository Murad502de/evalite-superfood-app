<template>
  <div class="signup">
    <header class="header">
      <div class="logo">
        <img class="img" src="@/assets/img/logo-executor.svg" alt="" />
      </div>
    </header>
    <main>
      <index></index>
    </main>
  </div>
</template>

<script>
import index from "@/components/pages/executor/auth/signup";

export default {
  layout: "empty",
  components: {
    index,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.header {
  height: 96px;
  background: #006edf;
}

.logo {
  display: flex;
  justify-content: center;
}

.img {
  height: 50px;
  margin-top: 20px;
}
</style>
