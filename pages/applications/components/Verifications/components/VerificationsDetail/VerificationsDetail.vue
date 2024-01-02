<template lang="pug">
AppOverlay.verifications-detail(
  :dialog="dialog",
  :title="title",
  @close="close"
)
  template(v-slot:actions)
    v-btn(
      dark,
      text,
      @click="approve",
      :loading="approveLoading",
      :disabled="saveLoading"
    ) Утвердить

  PartnerProfile(
    :user="user",
    :saveLoading="saveLoading",
    :submitLoading="submitLoading",
    :hideSubmitBtn="hideProfileSubmitBtn",
    :disabled="partnerProfileDisabled",
    @save:personal="savePersonal",
    @save:passport="savePassport",
    @save:paymentDetails="savePaymentDetails",
    @save:contract="saveContract",
    @submit="sendForVerification"
  )
</template>

<script src="./VerificationsDetail.js" />
<style lang="scss" src="./VerificationsDetail.scss" />
