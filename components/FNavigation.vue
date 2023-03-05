<template :indexTab="indexTab" :nextButtonsText="nextButtonsText"  @nextFromButton = "nextFromButton" @prevFromButton = "prevFromButton">
    <v-row class="mt-2 wrap-form-navigation">
      <v-col>
        <v-btn
          text
          height="48"
          outlined
          class="mr-2"
          @click="prevFromButton">
          Назад
        </v-btn>
        <v-btn
          text
          :disabled="disabled"
          height="48"
          outlined
          :class="{'public': indexTab == nextButtonsText.length - 1}"
          @click="nextFromButton">
          {{ nextButtonsText[indexTab] }}
          <v-icon
            right
            dark
            v-if="indexTab != nextButtonsText.length - 1"
          >
            mdi-arrow-right-thin
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
  props: ['indexTab', 'nextButtonsText'],
  data() {
    return {
    }
  },
  computed : {
    requestSuccess() {
      return this.$store.getters['response/requestSuccess'];
    },
    disabled(){
      return this.requestSuccess.await;
    }
  },
  methods: {
    nextFromButton(){
      this.$emit('nextFromButton');
    },
    prevFromButton(){
      this.$emit('prevFromButton');
    },
  }
}
</script>

<style lang="scss" scoped>

@import '/assets/scss/colors.scss';

.wrap-form-navigation{
  button {
    font-weight: 700;
    text-transform: uppercase;
  }

  button.public{
    background: $blue;
    color: #fff;
  }
}
</style>
