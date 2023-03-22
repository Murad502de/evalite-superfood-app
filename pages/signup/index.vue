<template lang="pug">
.signup
  AppBarEmpty
  AppStepperProgress(:steps="steps")

  .signup__steps
    .signup__steps--container
      v-window.signup__steps--forms(v-model="onboarding")
        v-window-item
          Step1PersonalData

        v-window-item
          Step1Confirm(:email="'test@mai.com'" :disabled="false" @startTimer="startConfirmTimer")

        v-window-item
          Step2Pass

        v-window-item
          Step3Agreement

        v-window-item
          Step4Docs

      .signup__steps--actions
        v-btn.signup__steps--actions__prev(
          :elevation="0",
          :disabled="onboarding === 0",
          color="#F2F6F9",
          @click="prev"
        ) Назад
        v-btn.signup__steps--actions__send-code(
          v-if="onboarding === 1",
          :elevation="0",
          :disabled="!isConfirmSendCodeActive"
          color="#F2F6F9"
        ) {{ confirmSendCodeTitle }}
        v-btn.signup__steps--actions__next(
          :elevation="0",
          color="#0082DE",
          @click="next"
        ) Далее
</template>

<script src="./signup.js" />
<style lang="scss" src="./signup.scss" />
