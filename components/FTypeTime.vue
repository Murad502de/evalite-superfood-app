<template>
  <div class="time-group d-flex">
    <span class="time-title" v-if="params && params.prepend">{{params.prepend}}</span>
    <v-menu
      ref="menu1"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="time"
          :name="name"
          v-bind="attrs"
          v-on="on"
          filled
          single-line
          outlined
          hide-details="true"
          readonly
        ></v-text-field>
      </template>
      <v-time-picker
        v-show="show_time"
        v-model="time"
        full-width
        width="290"
        header-color="#2196F3"
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="menu = false"
        >
          Отмена
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="updateTime"
        >
          OK
        </v-btn>

      </v-time-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'params', 'value'],
  data() {
    return {
      menu: false,
      show_time: true,
      time: '08:00',
    }
  },
  methods: {
    updateTime() {
      this.$emit('input', this.time);
      this.menu = false;
    }
  },
  watch: {
    // value() {
    //   this.time = this.value.substring(11, 15);
    //   console.log(this.time);
    // },
  },
  created() {
    this.time = this.value;
  }

}
</script>


<style lang="scss" scoped>

.time-group{
  align-items: center;

  .time-title{
    margin: 0 10px;

    &:first-child{
      margin-left: 0
    }
  }
}

.v-input {
  width: 68px;

  input {
    text-align: center !Important;
  }

}


</style>

