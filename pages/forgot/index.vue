<template lang="pug">
.forgot
  v-card-title.forgot__logo evalite
  EmailCard(
    v-if="step === 1",
    :loading="emailCardLoading",
    @sendCodeToEmail="sendCodeToEmail"
  )
  ConfirmCard(
    v-if="step === 2",
    @sendCodeToConfirm="sendCodeToConfirm",
    @sendCodeToEmail="sendCodeToEmail"
  )
  PassCard(v-if="step === 3", @updatePassword="updatePassword")
</template>

<script src="./forgot.js" />
<style lang="scss" src="./forgot.scss" />
