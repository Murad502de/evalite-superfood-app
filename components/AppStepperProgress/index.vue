<template lang="pug">
v-tabs.app-stepper-progress(show-arrows, hide-slider, center-active :value="12")
  v-tab.app-stepper-progress__step(
    v-for="(step, index) in steps",
    :key="index",
    active-class=".app-stepper-progress__step_active",
    :disabled="true"
  )
    AppStepperProgressStep(:step="step")
</template>

<script src="./AppStepperProgress.js" />
<style lang="scss" src="./AppStepperProgress.scss" />
