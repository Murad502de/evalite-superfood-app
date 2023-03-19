<template lang="pug">
.app-stepper-progress-mobile
  .app-stepper-progress-mobile__active-step
    .app-stepper-progress-mobile__active-step--title {{ activeStep.title }}
    .app-stepper-progress-mobile__active-step--name {{ activeStep.name }}

  v-tabs.app-stepper-progress-mobile--tabs(
    :show-arrows="false",
    hide-slider,
    center-active,
    centered,
    :value="activeStepIndex"
  )
    v-tab.app-stepper-progress-mobile__step(
      v-for="(step, index) in steps",
      :key="index",
      active-class="app-stepper-progress-mobile__step_active",
      :disabled="true"
    )
      v-progress-linear.app-stepper-progress-mobile__step--progress(
        :value="step.progress",
        color="#71D472",
        background-color="#EBEBEB"
      )
</template>

<script src="./AppStepperProgressMobile.js" />
<style lang="scss" src="./AppStepperProgressMobile.scss" />
