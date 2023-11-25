<template lang="pug">
.partner-profile
  .partner-profile__main
    AppCard.partner-profile-card
      PartnerProfileInfoCard
    .partner-profile-blocks
      AppCard.partner-profile-block(v-for="(i, index) in 5" :key="index") qwerty
</template>

<script src="./PartnerProfile.js" />
<style lang="scss" src="./PartnerProfile.scss" />
