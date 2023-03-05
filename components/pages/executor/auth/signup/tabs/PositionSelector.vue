<template>
<div class="position_selector">
<v-container>
   <p class="main_text_executor">Выбор профессий</p>
  <p>Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции требуют</p>
  <div>
    <h3>Выберите виды работ</h3>
    <v-expansion-panels flat class="mt-4" >
      <v-expansion-panel
          class="panels"
          v-for="(item,i) in copySpec"
          :key="i"
      >
        <v-expansion-panel-header>
          <span class="input_label">{{item.name}}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col v-for="(work ,i) of item.professions" :key="i">
              <v-chip @click="setStatus(work)" :class="work.active === false ? 'chip_active' : 'chip'"> {{work.name  }}</v-chip>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <div>
    <div class="access-content mt-10">
      <div class="d-flex" style="margin-top: -25px">
        <img  src="@/assets/img/attention.svg" alt="">
        <p class="ml-2 small-text mt-8"> Некоторые из выбранных Вами профессий требуют загрузки дополнительных документов для подтверждения:</p>
      </div>
      <div class="desktop d-block">
        <div class="d-flex">
          <strong class="small-text ml-5">Водитель электроштабелера </strong> <span  style="margin-top: -2px" class="primary-text ml-3"> требуются права для управления</span>
        </div>
        <div class="d-flex">
          <strong class="small-text ml-5">Кладовщик </strong> <span style="margin-top: -2px" class="primary-text ml-3 "> требуются медицинская книжка</span>
        </div>
      </div>
      <div class="mobile d-block">
        <div >
          <strong class="small-text ml-5">Водитель электроштабелера </strong> <br> <span class="primary-text ml-5"> требуются права для управления</span>
        </div>
        <div >
          <strong class="small-text ml-5">Кладовщик </strong> <br> <span class="primary-text ml-5"> требуются медицинская книжка</span>
        </div>
      </div>
      <v-btn  elevation="0" class="btn-secondary" @click="back(3)"> <span class="btn-title">Назад</span> </v-btn>
      <v-btn dark elevation="0" class="btn-primary" :disabled="!disableHandler.length > 0" @click="next( 5 )"><span class="btn-title">Далее</span> </v-btn>
    </div>
  </div>
</v-container>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PositionSelector",
  data(){
    return{
      copySpec:[],
      checker:[],
    }
  },
  methods:{
    ...mapActions('executor',['loadSpecializations','setSpecializations']),
    next(value){
      this.$emit('pageHandler', value)
    let activeSpecializations = (this.specializationCopy || []).map((ell) => {
        return {
          ...ell,
          professions: (ell.professions || []).filter((ell) => {
              ell.active === true
          }),
        };
      })
      activeSpecializations.map(ell => ell.name)
      let params = activeSpecializations.map(({professions,...rest})=>({...rest}))
      this.setSpecializations(params)

    },
    back(val){
      this.$emit('pageHandler',val , 'back')
    },
    setStatus(work){
      this.checker.push(work)
      if(work.active === false){
        work.active = true
      }else{
        work.active = false
      }
      this.$forceUpdate()
    },
  },
  computed:{
    specializations() {
      return this.$store.getters['executor/specializations']
    },
    specializationCopy(){
      return JSON.parse(JSON.stringify(this.$store.getters['executor/specializations']))
    },
    disableHandler(){
     return this.checker.filter(ell=> ell.active !== true)
    },
  },
 async mounted() {
    await this.loadSpecializations()
    this.copySpec = (this.specializationCopy || []).map((ell) => {
      return {
        ...ell,
        professions: (ell.professions || []).map((ell) => {
          return {
            ...ell,
            active: true,
          };
        }),
      };
    })

  }
}
</script>

<style scoped>
.chip{
  background: #F1F9FF!important;
  color: #0082DE;
}
.chip_active{
  color: #FFFFFF;
  background: #0082DE!important;
}
.panels{
  border-bottom: 1px solid #EBEBEB;
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
  background: white!important;
  border-radius: 8px;
  height: 45px!important;
  width: 100%;
  border: 1px solid lightgrey;
  margin-top: 15px;
}
.primary-text{
  color: #0082DE;
}
.small-text{
  font-size: 14px;
}
.mobile{
  display: none!important;
}
@media (max-width: 1000px) {
  .desktop{
    display: none!important;
  }
  .mobile{
    display: block!important;
  }
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  color: lightgrey !important;
  background: #0082de !important;
}
</style>