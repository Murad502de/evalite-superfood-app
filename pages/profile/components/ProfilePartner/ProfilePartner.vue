<template lang="pug">
.profile-partner
  .profile-partner__header
    .profile-partner__title {{ title }}
  .profile-partner__main
    PartnerProfile(
      :user="userData",
      :saveLoading="saveLoading",
      :submitLoading="submitLoading",
      :disabled="partnerProfileDisabled",
      @save:personal="savePersonal",
      @save:passport="savePassport",
      @save:paymentDetails="savePaymentDetails",
      @save:contract="saveContract",
      @submit="sendForVerification"
    )
</template>

<script src="./ProfilePartner.js" />
<style lang="scss" src="./ProfilePartner.scss" />
