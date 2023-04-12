<template lang="pug">
.the-client-forms
  v-tabs.the-client-forms__tabs(v-model="tab")
    v-tab ИП
    v-tab Самозанятый

  v-window.the-client-forms__forms(v-model="tab")
    v-window-item.the-client-forms__form
      TheIndividualEntrepreneurForm

    v-window-item.the-client-forms__form
      TheSelfEmployedForm
</template>

<script src="./TheClientForms.js" />
<style lang="scss" src="./TheClientForms.scss" />
