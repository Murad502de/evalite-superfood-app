<template>
<div class="electronic_document">
  <v-container>
    <div class="img">
      <img src="@/assets/img/electronic_document.svg" alt="">
    </div>
    <p class="main_text_executor">Электронный  документооборот</p>
    <p class="mt-2 input_label">Система ruqi.ru использует электроный документооборот, это <br> эффективный способ подписывать документы и быстро получать
      <br> оплату. Мы бесплатно храним ваши документы на нескольких <br> серверах,которые надежно защищены от взлома.</p>
    <div>
      <v-row class="mt-8">
        <v-col  md="6" lg="6" lx="6" cols="12" sm="12" xs="12">
          <div>
            <img src="@/assets/img/schedule.svg" alt="">
            <br>
            <strong>Быстрая оплата</strong>
            <p>Система ruqi.ru использует электроный документооборот, это эффективный способ подписывать.</p>
          </div>
        </v-col>
        <v-col md="6" lg="6" lx="6" cols="12"  sm="12" xs="12">
          <div>
            <img src="@/assets/img/wallet.svg" alt="">
            <br>
            <strong>Документы всегда доступны?</strong>
            <p>Система ruqi.ru использует электроный документооборот, это эффективный способ подписывать.</p>
          </div>
        </v-col>
        <v-col md="6" lg="6" lx="6" cols="12"  sm="12" xs="12">
          <div>
            <img src="@/assets/img/payment.svg" alt="">
            <br>
            <strong>Быстрая оплата</strong>
            <p>Система ruqi.ru использует электроный документооборот, это эффективный способ подписывать.</p>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="access-content">
    <strong>Согласие на использование электронного документооборота</strong>
      <p class="mt-3 mb-3">Нажимая кнопку далее я соглашаюсь с условиями использования моих данных в обмене документами системы руки ру.</p>
      <div class="d-flex">
        <img src="@/assets/img/file_pdf.svg" alt=""> <span class="primary-text">Cоглашение на обмен персональными данными и документами посредством ЭЦП</span>
      </div>
      <v-btn dark elevation="0" class="btn-primary" @click="next(4)"><span class="btn-title">принимаю условия</span> </v-btn>
      <v-btn  elevation="0" class="btn-secondary" @click="next(2)"> <span class="btn-title">Назад</span> </v-btn>
    </div>
  </v-container>
</div>
</template>

<script>
export default {
  name: "ElectronicDocument",
  methods:{
    next(value){
      this.$emit('pageHandler',value)
    },
    back(val){
      this.$emit('pageHandler',val , 'back')
    }
  }
}
</script>

<style scoped>
.img{
  display: flex;
  justify-content: center;
}
.access-content{
  background: #F5F7F9;
  border-radius: 16px;
  height: 100%;
  padding: 20px;
}
.btn-primary{
  background: #0082DE!important;
  border-radius: 8px;
  height: 45px!important;
  width: 100%;
  margin-top: 15px;
}
.btn-secondary{
  background: #F5F7F9!important;
  border-radius: 8px;
  height: 45px!important;
  width: 100%;
  border: 1px solid #D5DEE8;
  margin-top: 15px;
}
.primary-text{
  color: #0082DE;
  font-size: 15px;
  margin-left: 5px;
}
.btn-title{
  text-transform: uppercase;
}

</style>