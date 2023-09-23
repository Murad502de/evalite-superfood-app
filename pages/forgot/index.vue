<template lang="pug">
.forgot
  v-card-title.forgot__logo evalite
  EmailCard(
    v-if="step === 1",
    :loading="emailCardLoading",
    @sendCodeToEmail="emailCardSendCodeToEmail"
  )
  ConfirmCard(
    v-if="step === 2",
    :email="email",
    :confirmCodeLoading="confirmCardConfirmCodeLoading",
    :sendCodeLoading="confirmCardSendCodeLoading",
    @sendCodeToConfirm="confirmCardSendCodeToConfirm",
    @sendCodeToEmail="confirmCardSendCodeToEmail"
  )
  PassCard(
    v-if="step === 3",
    :loading="passCardUpdatePassLoading",
    @updatePassword="updatePassword"
  )
</template>

<script src="./Forgot.js" />
<style lang="scss" src="./Forgot.scss" />
