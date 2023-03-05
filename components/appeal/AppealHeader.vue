<template lang="pug">
  .appeal-header
    .ah-info
      .ah-number №00356
      .ah-status
        v-select(:items="status"
          outlined
          height="32"
          value="Открыта"
          hide-details="true")

      .ah-client-num.d-flex
        .ah-info-title клиентский №
        .cn-num 11

      Priority(:completed="2" :total="4")

    .ah-info
      .ah-info-title Ответственные:
      .ah-text.d-flex Группа Поддержка, Александ Худобин, Олег Сафро...
        .ahd-link
          a(href='#') + 3 чел.

    v-divider

    .ah-info
      .ah-col-info
        .ah-info-title  Решить до
        .ahd-date 22.09.21 22:00

      .ah-col-info
        .ah-info-title  Создана
        .ahd-date 01.09.2021

      .ah-col-info
        .ah-info-title Изменена
        .ahd-date 01.09.2021

      .ah-col-info
        .ah-info-title Отправитель:
        .ahd-link
          a(href='#') Васильев Петр Иванович

    .ah-info
      .ah-col-info
        .ah-info-title  Подчиненный элемент:
        .ahd-link
          a(href="#") Заявка №32423 Требуются кладовщики в Леруа




</template>

<script>
import Priority from "@/components/appeal/Priority";

export default {
  components: {Priority},
  props: ['object',],
  data() {
    return {
      status: ['Открыта', 'Закрыта',],
    }
  },
  methods: {
  }
}
</script>


<style lang="scss" >

@import '../../assets/scss/colors';

.appeal-header{
  background: $light_blue;
  padding: 24px;
  font-size: 14px;

  .v-divider{
    margin: 16px 0;
  }


  .ah-info{
    display: flex;
    align-items: center;
    margin-bottom: 14px;

    >div{
      margin-right: 16px;
    }

    .ah-client-num{
      align-items: center;
    }

    .ah-number,
    .cn-num{
      font-size: 24px;
      font-weight: 700;
    }

    .ah-info-title{
      color: $grey;
      font-weight: 400;
      margin-right: 8px;
    }

    .ah-col-info{

      margin-right: 32px;

      .ah-info-title{
        margin-right: 0;
        margin-bottom: 6px;
      }
    }

    .ahd-date{
      font-weight: 600;
    }

    .ah-text{
      font-weight: 600;
    }

    .ahd-link a{
      font-weight: 600;
      text-decoration: none;
      color: $blue;
    }
  }

  .ah-status{
    .v-select {
      max-width: 136px;
    }

    .v-text-field--filled > .v-input__control > .v-input__slot {
      background: #fff;
    }
  }

}

</style>
