<template lang="pug">
.partner-profile
  .partner-profile__main
    AppCard.partner-profile-card
      PartnerProfileInfoCard(@edit="dialog = true")
    .partner-profile-blocks
      AppCard.partner-profile-block(v-for="(i, index) in 5", :key="index") qwerty

  AppOverlay.partner-profile-settings(
    :dialog="dialog",
    :title="'Настройки'",
    @close="close"
  )
    template(v-slot:actions)
      v-btn(
        dark,
        text,
        @click="save",
        :loading="saveLoading",
      ) Сохранить
</template>

<script src="./PartnerProfile.js" />
<style lang="scss" src="./PartnerProfile.scss" />
