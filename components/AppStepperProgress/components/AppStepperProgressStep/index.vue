<template lang="pug">
.app-stepper-progress-step(
  :class="{ 'app-stepper-progress-step_active': step.active }"
)
  .app-stepper-progress-step__title {{ step.title }}
  .app-stepper-progress-step__name {{ step.name }}
  v-progress-linear.app-stepper-progress-step__progress(
    :value="step.progress",
    color="#71D472",
    background-color="#EBEBEB"
  )
</template>

<script src="./AppStepperProgressStep.js" />
<style lang="scss" src="./AppStepperProgressStep.scss" />
