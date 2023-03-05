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
        case 'created':
          translit = 'Создана';
          css_class = 'grey';
          break;
        case 'isRecruiting':
          translit = 'Ведется набор';
          css_class = 'yellow';
          break;
        case 'recruitmentCompleted':
          translit = 'Набор завершен';
          css_class = 'green';
          break;
        case 'working':
          translit = 'В работе';
          css_class = 'grey';
          break;
        case 'confirmation':
          translit = 'Подтверждение';
          css_class = 'violet';
          break;
        case 'notConfirmed':
          translit = 'Не подтверждена';
          css_class = 'red';
          break;
        case 'confirmed':
          translit = 'Подтверждена';
          css_class = 'green';
          break;


        case 'active':
          translit = 'Активна';
          css_class = 'green';
          break;
        case 'open':
          translit = 'Открыта';
          css_class = 'green';
          break;
        case 'close':
          translit = 'Закрыта';
          css_class = 'red';
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
