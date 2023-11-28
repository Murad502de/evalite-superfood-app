<template lang="pug">
.partner-profile
  .partner-profile__main
    PartnerProfileInfoCard.partner-profile-card(
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
      //- PassportCard.partner-profile-block
      //- PaymentDetailsCard.partner-profile-block
      //- ContractCard.partner-profile-block

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
      @update:phone="updatePhone",
      @update:password="updatePassword"
    )
</template>

<script src="./PartnerProfile.js" />
<style lang="scss" src="./PartnerProfile.scss" />
