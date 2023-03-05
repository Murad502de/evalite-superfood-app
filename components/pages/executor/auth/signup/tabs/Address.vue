<template>
<div>
  <v-container>
    <p class="main_text_executor">Адреса</p>
    <p>Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
    <v-form ref="form" v-model="valid" lazy-validation>
    <div class="mt-5">
      <h3>Укажите место проживания</h3>
      <p class="input_label">Место основного проживания</p>
      <v-text-field
          outlined
          class="mt-2"
          placeholder="Введите адрес"
          :rules="inputRules"
          v-model="address"
          dense
          single-line
      ></v-text-field>
      <h3>Укажите место проживания</h3>
      <p>Введите название населенного пункта город с районом или метро, откуда хотели бы получать предложения о работе</p>
      <p class="input_label">Дополнительный адрес 1</p>
      <v-text-field
          outlined
          class="mt-2"
          placeholder="Например: Зеленоград, Ленинский район"
          v-model="address_extra"
          dense
          single-line
      ></v-text-field>
      <v-divider></v-divider>
      <p class="mt-3 input_label">Дополнительный адрес 1</p>
      <v-text-field
          outlined
          class="mt-2"
          placeholder="Например: Зеленоград, Ленинский район"
          v-model="address_extra_2"
          dense
          single-line
      ></v-text-field>
      <a href="" class="link">Добавить адрес</a>
      <div class="access-content d-flex mt-5">
        <img src="@/assets/img/attention.svg" alt="">
        <strong class="ml-2" style="font-weight: 600;margin-bottom: -10px">Вы всегда можете добавить, удалить и изменить основной и дополнительные адреса в личном кабинете.</strong>
      </div>
    </div>
    </v-form>
    <div class="mt-5">
    <v-btn  elevation="0" class="btn-secondary" @click="back(4)"> <span class="btn-title">Назад</span> </v-btn>
    <v-btn dark elevation="0" class="btn-primary" :disabled="!disableHandler" @click="next( 6 )"><span class="btn-title">Далее</span> </v-btn>
    </div>
  </v-container>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data(){
    return{
      address:'',
      address_extra:'',
      address_extra_2:'',
      valid:false,
      inputRules: [v => !!v || 'Заполните поля'],
    }
  },
  methods:{
    ...mapActions('executor',['setAddress']),
    validate () {
      this.$refs.form.validate()
    },
    back(value){
      this.$emit('pageHandler', value, 'back')
    },
    next(value){
      let data =[
          this.address,this.address_extra,this.address_extra_2
      ]
     this.setAddress(data)
      if(this.requestSuccess.type === 'success'){
        this.$emit('pageHandler',value)
      }else{
        this.validate()
      }
    }
  },
  computed:{
    ...mapGetters('response',['requestSuccess']),
    disableHandler(){
      return this.address
    }
  }
}
</script>

<style scoped>
.link{
  text-decoration: none;
  margin-top: 10px;
  font-weight: 600;
}
.access-content{
  background: #F5F7F9;
  border-radius: 16px;
  height: 100%;
  padding: 30px;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  color: lightgrey !important;
  background: #0082de !important;
}
</style>