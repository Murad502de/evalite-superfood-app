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
          Step1Confirm(
            :email="'test@mai.com'",
            :disabled="false",
            @startTimer="startConfirmTimer"
          )

        v-window-item
          Step2Pass

        v-window-item
          Step3Agreement

        v-window-item
          Step4Docs

      .signup__steps--actions(
        :class="{ 'signup__steps--actions_step-3': onboarding === 3 }"
      )
        .signup__steps--actions-step-3(v-show="onboarding === 3")
          .signup__steps--actions-step-3__title {{ actionsStep3Title }}
          .signup__steps--actions-step-3__text {{ actionsStep3Text }}
          .signup__steps--actions-step-3__agreement
            Pdf.signup__steps--actions-step-3__agreement-icon
            .signup__steps--actions-step-3__agreement-title {{ actionsStep3AgreementTitle }}

        .signup__steps--actions-btns(
          :class="{ 'signup__steps--actions-btns_step-3': onboarding === 3 }"
        )
          v-btn.signup__steps--actions-btn.signup__steps--actions__prev(
            :class="{ 'signup__steps--actions-btn_step-3': onboarding === 3 }",
            :elevation="0",
            :disabled="onboarding === 0",
            color="#F2F6F9",
            @click="prev"
          ) Назад
          v-btn.signup__steps--actions-btn.signup__steps--actions__send-code(
            :class="{ 'signup__steps--actions-btn_step-3': onboarding === 3 }",
            v-if="onboarding === 1",
            :elevation="0",
            :disabled="!isConfirmSendCodeActive",
            color="#F2F6F9"
          ) {{ confirmSendCodeTitle }}
          v-btn.signup__steps--actions-btn.signup__steps--actions__next(
            :class="{ 'signup__steps--actions-btn_step-3': onboarding === 3 }",
            :elevation="0",
            color="#0082DE",
            @click="next"
          ) {{ nextBtnTitle }}
</template>

<script src="./signup.js" />
<style lang="scss" src="./signup.scss" />
