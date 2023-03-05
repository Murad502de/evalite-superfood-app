<template>
<div class="auth">
  <div class="content">
    <img class="img" src="@/assets/img/rocket.svg" alt="">
    <div class="information">
      <h1>Стать исполнителем</h1>
      <h4 class="text-grey">Ruqi.ru – сервис быстрого поиска работы на любой промежуток времени. <br> Тут рыбный текст про преимущества сервиса руки</h4>
    </div>
    <div class="actions">
      <v-btn dark elevation="0" class="btn-primary" @click="register"><span class="btn-title">зарегистрироваться</span> </v-btn>
      <v-btn  elevation="0" class="btn-secondary" @click="login"> <span class="btn-title">Войти</span> </v-btn>
      <p class="signin-text">Уже зарегистрировались? Нажимайте войти</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Auth",
  data(){
    return{
    }
  },
  methods:{
    register(){
      this.$router.push('/auth/signup/executor/steps')
    },
    login(){
      this.$router.push('/auth/signin/executor/recover')
    }
  }
}
</script>

<style scoped>
.auth{
  justify-content: center;
  display: flex;
  margin-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
}
.img{
  height: 250px;
  margin: auto;
  justify-content: center;
  display: flex;
}
.information{
  text-align: center;
}
.actions{
  margin-top: 15px;
}
.btn-primary{
  background: #0082DE!important;
  border-radius: 8px;
  height: 45px!important;
  width: 100%;
}
.btn-secondary{
  background: white!important;
  border-radius: 8px;
  height: 45px!important;
  width: 100%;
  border: 1px solid lightgrey;
  margin-top: 15px;
}
.btn-title{
  font-weight: 700;
  font-size: 14px;
  line-height: 125%;
}
.signin-text{
  color: #263043;
  font-size: 16px;
  opacity: 0.4;
  text-align: center;
  margin-top: 15px;
  cursor: pointer;
}
.text-grey{
  color: #8692A6;
  font-size: 14px;
}
</style>