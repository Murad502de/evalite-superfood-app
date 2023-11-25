<template lang="pug">
.partner-profile-info-card
  .partner-profile-info-card__header
    AppAvatar.partner-profile-info-card__avatar(disabled, size="64")
    .partner-profile-info-card__name Худобин Александр Игоревич
    .partner-profile-info-card__invite-code QWERT#$@!12
    .partner-profile-info-card__edit(@click="edit") Изменить профиль

    .partner-profile-info-card__status
      .partner-profile-info-card__status-icon X
      .partner-profile-info-card__status-title Документы отклонены

  v-divider.partner-profile-info-card__divider

  .partner-profile-info-card__main
    .partner-profile-info-card__infos
      .partner-profile-info-card__info(
        v-for="(info, index) in infos",
        :key="index"
      )
        .partner-profile-info-card__info-title {{ info.title }}
        .partner-profile-info-card__info-value {{ info.value }}
</template>

<script src="./PartnerProfileInfoCard.js" />
<style lang="scss" src="./PartnerProfileInfoCard.scss" />
