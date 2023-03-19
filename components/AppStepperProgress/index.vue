<template lang="pug">
.app-stepper-progress
  AppStepperProgressDesktop.app-stepper-progress__desktop(:steps="steps")
  AppStepperProgressMobile.app-stepper-progress__mobile(:steps="steps" :activeStepIndex="12")
</template>

<script src="./AppStepperProgress.js" />
<style lang="scss" src="./AppStepperProgress.scss" />
