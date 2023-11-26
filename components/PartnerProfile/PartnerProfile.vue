<template lang="pug">
.partner-profile
  .partner-profile__main
    AppCard.partner-profile-card
      PartnerProfileInfoCard(
        :avatar="avatar",
        :name="name",
        :inviteCode="inviteCode",
        :verificationStatus="verificationStatus",
        :birthday="birthday",
        :tel="phone",
        :email="email",
        @edit="dialog = true"
      )
    .partner-profile-blocks
      AppCard.partner-profile-block(v-for="(i, index) in 5", :key="index") qwerty

  AppOverlay.partner-profile-settings(
    :dialog="dialog",
    :title="'Настройки'",
    @close="close"
  )
    template(v-slot:actions)
      v-btn(dark, text, @click="save", :loading="saveLoading") Сохранить

    PartnerProfileInfoCardSettings(
      :user="this.user",
      @update:avatar="updateAvatar",
      @update:second_name="updateSecondName",
      @update:first_name="updateFirstName",
      @update:third_name="updateThirdName",
      @update:gender="updateGender",
      @update:birthday="updateBirthday",
      @update:email="updateEmail",
      @update:phone="updatePhone"
    )
</template>

<script src="./PartnerProfile.js" />
<style lang="scss" src="./PartnerProfile.scss" />
