<template>
  <div>
    <v-container class="finish">
      <div class="content">
        <img class="mr-15" src="@/assets/img/finish.svg" alt="">
      </div>
      <div class="d-block mt-10">
        <p class="main_text_executor">Регистрация завершена</p>
        <strong >Поздравляем Вас! Вы успешно зарегистрировались в системе Ruqi.ru и сможете легко и быстро найти подработку.</strong>
        <p class="mt-5">Как только Ваши документы пройдут проверку мы выпустим <a href="" class="link"> электронную цифровую подпись</a>  (ЭЦП). Она нужна для того, чтобы мы могли быстро подписывать акты выполненных работ с заказчиками и перечислять Вам оплату сразу после завершения работ.</p>
        <p class="mt-5">Пока документы проходят проверку Вы можете перейти в <a href="" class="link"> личный кабинет</a>   исполнителя и указать больше данных о себе. Это поможет нам более точно предлагать Вам интересные вакансии.</p>
        <p> Также в личином кабинете можно видеть состояние выпуска Вашей электронной цифровой подписи.</p>
      </div>
      <v-btn dark elevation="0" class="btn-primary"  @click="submit"><span class="btn-title">перейти в личный кабинет</span> </v-btn>
      <v-btn  elevation="0" class="btn-secondary"> <span class="btn-title">искать заявки</span> </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "finish",
  methods:{
    submit(){
      this.$router.push('/auth/login')
    }
  }
}
</script>

<style scoped>
.content{
  justify-content: center;
  display: flex;
  margin: auto;
}
.link{
  text-decoration: none;
}
.btn-primary{
  background: #0082DE!important;
  border-radius: 8px;
  height: 45px!important;
  width: 100%;
  margin-top: 15px;
}
.btn-secondary{
  background: white!important;
  border-radius: 8px;
  height: 45px!important;
  width: 100%;
  border: 1px solid lightgrey;
  margin-top: 15px;
}
</style>