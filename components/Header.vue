<template :content="content" :size="size" :isnew="isnew" :isback="isback">
  <div class="wrapp-header">
    <h1 :class="size">
      <a href="#" @click.prevent="$router.go(-1)" v-if="isback" class="header-back">
        <v-icon
          size="28"
          color="gray"
        >
          mdi-chevron-left
        </v-icon>
      </a>
      {{ content }}
      <a href="#" @click.prevent="openCreatePage()" v-if="isnew && isnewstyle !='text_btn'" class="header-create">
        <img src="/img/bt_plus.svg" alt="Создать">
      </a>

      <v-btn
        text
        height="48"
        outlined
        class="btn-blue header-create-text"
        @click.prevent="openCreatePage()"
        v-if="isnew && isnewstyle =='text_btn'"
      >
        Добавить исполнителя
      </v-btn>
    </h1>
  </div>
</template>

<script>
export default {
  props: ['content', 'size', 'isnew', 'isback', 'isnewstyle'],
  data() {
    return {}
  },
  methods: {
    openCreatePage() {
      this.$router.push(this.$route.name + '/create');
    },
  }
}
</script>

<style lang="scss" scoped>

@import '/assets/scss/colors.scss';

h1 {
  display: flex;
  align-items: center;

  .header-create {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $blue;
    margin-left: 18px;
    border-radius: 48px;
  }

  .header-back {
    width: 48px;
    height: 48px;
    border: 1px solid $table-border-color;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 18px;
    border-radius: 48px;
    color: transparent;
  }

  .header-create-text {
    margin-left: 54px;
  }
}
</style>
