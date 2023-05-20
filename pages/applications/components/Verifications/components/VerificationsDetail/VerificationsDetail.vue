<template lang="pug">
AppOverlay.verifications-detail(
  :dialog="dialog",
  :title="'Расулов Гаджимурад Зайнутдинович'",
  @close="close",
  @save="save"
)
  AppTextField(v-model="test")
</template>

<script src="./VerificationsDetail.js" />
<style lang="scss" src="./VerificationsDetail.scss" />
