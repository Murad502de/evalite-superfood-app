<template lang="pug">
.the-client-forms
  v-tabs.the-client-forms__tabs(v-model="tab")
    v-tab ИП
    v-tab Самозанятый

  v-window.the-client-forms__forms(v-model="tab")
    v-window-item.the-client-forms__form
      TheIndividualEntrepreneurForm(
        @update:progress="(newValue) => (entrepreneurFormProgress = newValue)"
      )

    v-window-item.the-client-forms__form
      TheSelfEmployedForm(
        @update:progress="(newValue) => (selfEmployedFormProgress = newValue)"
      )
</template>

<script src="./TheClientForms.js" />
<style lang="scss" src="./TheClientForms.scss" />
