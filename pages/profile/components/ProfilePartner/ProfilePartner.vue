<template lang="pug">
.profile-partner
  .profile-partner__header
    .profile-partner__title {{ title }}
  .profile-partner__main
    PartnerProfile(
      :user="userData",
      @update:personal="updatePersonal"
    )
</template>

<script src="./ProfilePartner.js" />
<style lang="scss" src="./ProfilePartner.scss" />
