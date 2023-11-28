<template lang="pug">
.profile-partner
  .profile-partner__header
    .profile-partner__title {{ title }}
  .profile-partner__main
    PartnerProfile(
      :user="userData",
      @update:avatar="updateAvatar",
      @update:second_name="updateSecondName",
      @update:first_name="updateFirstName",
      @update:third_name="updateThirdName",
      @update:gender="updateGender",
      @update:birthday="updateBirthday",
      @update:email="updateEmail",
      @update:phone="updatePhone"
      @update:password="updatePassword"
    )
</template>

<script src="./ProfilePartner.js" />
<style lang="scss" src="./ProfilePartner.scss" />
