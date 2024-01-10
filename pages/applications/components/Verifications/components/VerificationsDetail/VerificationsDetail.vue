<template lang="pug">
AppOverlay.verifications-detail(:dialog="dialog", @close="close")
  template(v-slot:actions)
    v-btn(
      dark,
      text,
      @click="reject",
      :loading="rejectLoading",
      :disabled="approveLoading || saveLoading || loading"
    ) Отклонить

    v-btn(
      dark,
      text,
      @click="approve",
      :loading="approveLoading",
      :disabled="rejectLoading || saveLoading || loading"
    ) Утвердить

  PartnerProfile(
    :user="user",
    :saveLoading="saveLoading",
    hideSubmitBtn,
    hideStatus,
    :loading="loading",
    @save:personal="savePersonal",
    @save:passport="savePassport",
    @save:paymentDetails="savePaymentDetails",
    @save:contract="saveContract"
  )
</template>

<script src="./VerificationsDetail.js" />
<style lang="scss" src="./VerificationsDetail.scss" />
