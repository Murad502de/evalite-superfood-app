<template lang="pug">
.app-stepper-progress
  AppStepperProgressDesktop.app-stepper-progress__desktop(
    :steps="steps",
    :activeStepIndex="activeStepIndex"
  )
  AppStepperProgressMobile.app-stepper-progress__mobile(
    :steps="steps",
    :activeStepIndex="activeStepIndex"
  )
</template>

<script src="./AppStepperProgress.js" />
<style lang="scss" src="./AppStepperProgress.scss" />
