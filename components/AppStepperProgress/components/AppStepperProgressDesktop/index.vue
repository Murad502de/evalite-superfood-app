<template lang="pug">
v-tabs.app-stepper-progress-desktop(
  show-arrows,
  hide-slider,
  center-active,
  :value="12"
)
  v-tab.app-stepper-progress-desktop__step(
    v-for="(step, index) in steps",
    :key="index",
    active-class=".app-stepper-progress-desktop__step_active",
    centered,
    :disabled="true"
  )
    AppStepperProgressDesktopStep(:step="step")
</template>

<script src="./AppStepperProgressDesktop.js" />
<style lang="scss" src="./AppStepperProgressDesktop.scss" />
