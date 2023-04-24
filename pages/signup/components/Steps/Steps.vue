<template lang="pug">
.steps
  AppStepperProgress.steps--progress(:steps="steps")

  .steps__wrapper
    .steps--container
      v-window.steps--forms(v-model="onboarding")
        v-window-item
          Step1PersonalData(
            ref="step1_personal_data"
            :loading="loading",
            @update:progress="(newValue) => (step1PersonalDataProgress = newValue)"
          )

        v-window-item
          Step1Confirm(
            ref="step1_confirm"
            :email="userSignupData.user_email",
            :disabled="false",
            @update:progress="(newValue) => (step1ConfirmProgress = newValue)",
            @startTimer="startConfirmTimer"
          )

        v-window-item
          Step2Pass(
            ref="step2_pass"
            @update:progress="(newValue) => (step2PassProgress = newValue)"
          )

        v-window-item
          Step3Agreement

        v-window-item
          Step4Docs(
            ref="step4_docs"
            @update:progress="(newValue) => (step4DocsProgress = newValue)"
          )

        v-window-item
          Step5PaymentInfo(
            ref="step5_payment_info"
            @update:progress="(newValue) => (step5PaymentInfoProgress = newValue)"
          )

      .steps--actions(
        :class="{ 'signup__steps--actions_step-3': onboarding === 3 }"
      )
        .steps--actions-step-3(v-show="onboarding === 3")
          .steps--actions-step-3__title {{ actionsStep3Title }}
          .steps--actions-step-3__text {{ actionsStep3Text }}
          .steps--actions-step-3__agreement
            Pdf.steps--actions-step-3__agreement-icon
            .steps--actions-step-3__agreement-title {{ actionsStep3AgreementTitle }}

        .steps--actions-btns(
          :class="{ 'signup__steps--actions-btns_step-3': onboarding === 3 }"
        )
          v-btn.steps--actions-btn.steps--actions__prev(
            :class="{ 'signup__steps--actions-btn_step-3': onboarding === 3 }",
            :elevation="0",
            :disabled="loading || onboarding === 0",
            color="#F2F6F9",
            @click="prev"
          ) Назад
          v-btn.steps--actions-btn.steps--actions__send-code(
            :class="{ 'signup__steps--actions-btn_step-3': onboarding === 3 }",
            v-if="onboarding === 1",
            :elevation="0",
            :disabled="!isConfirmSendCodeActive",
            color="#F2F6F9"
          ) {{ confirmSendCodeTitle }}
          v-btn.steps--actions-btn.steps--actions__next(
            :class="{ 'signup__steps--actions-btn_step-3': onboarding === 3 }",
            :elevation="0",
            :loading="loading",
            color="#0082DE",
            @click="next"
          ) {{ nextBtnTitle }}
</template>

<script src="./Steps.js" />
<style lang="scss" src="./Steps.scss" />
