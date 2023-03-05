<template lang="pug">
  .executor-status
    v-icon(:class="[status.css_class]") mdi-circle-medium
    span {{ status.translit }}

</template>

<script>


export default {
  props: {
    status_alias: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    }
  },
  computed: {
    status() {
      let translit = 'Новый',
          css_class = 'blue';

      switch (this.status_alias) {
        case 'requested':
          translit = 'Новый';
          css_class = 'blue';
          break;
        case 'invited':
          translit = 'Ожидает';
          css_class = 'yellow';
          break;
        case 'acceptInvited':
          translit = 'Подтвердил';
          css_class = 'green';
          break;
        case 'rejected':
          translit = 'Отклонен';
          css_class = 'grey';
          break;
        case 'refused':
          translit = 'Отказ';
          css_class = 'red';
          break;
        case 'working':
          translit = 'Работаем';
          css_class = 'violet';
          break;
        case 'accepted':
          translit = 'Можно приезжать';
          css_class = 'green';
          break;

      }

      return {
        translit: translit,
        css_class: css_class,
      }
    },
  },
}
</script>

<style lang="scss">

.executor-status {

  display: flex;
  align-items: center;

  .v-icon{
    background-color: transparent !important;

    &.blue{
      color: #0082DE;
    }
    &.grey{
      color: #D7D7D7;
    }
    &.green{
      color: #71D472;
    }
    &.red{
      color: #EB4D3D;
    }
    &.yellow{
      color: #F4D150;
    }
    &.violet{
      color: #7B61FF;
    }
  }
}

</style>
