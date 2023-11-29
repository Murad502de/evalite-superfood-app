<template lang="pug">
.partner-profile
  .partner-profile__main
    PersonalCard.partner-profile-card(
      :avatar="avatar",
      :name="name",
      :inviteCode="inviteCode",
      :verificationStatus="verificationStatus",
      :birthday="birthday",
      :tel="phone",
      :email="email",
      @edit="openCardSettings(cardNames.personalCard)"
    )
    .partner-profile-blocks
      PassportCard.partner-profile-block(
        @edit="openCardSettings(cardNames.passportCard)",
        :name="passName",
        :series="passSeries",
        :number="passNumber",
        :issueDate="passIssueDate",
        :issuedBy="passIssuedBy",
        :departmentCode="passDepartmentCode",
        :registrationAddress="passRegistrationAddress",
      )
      PaymentDetailsCard.partner-profile-block(
        @edit="openCardSettings(cardNames.paymentDetailsCard)"
      )
      ContractCard.partner-profile-block(
        @edit="openCardSettings(cardNames.contractCard)"
      )

  AppOverlay.partner-profile-settings(
    :dialog="dialog",
    :title="'Настройки'",
    @close="close"
  )
    template(v-slot:actions)
      v-btn(dark, text, @click="save", :loading="saveLoading") Сохранить

    PersonalCardSettings(
      v-show="openedSettings === cardNames.personalCard",
      :user="user",
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
    PassportCardSettings(
      v-show="openedSettings === cardNames.passportCard",
      :user="user"
    )
    PaymentDetailsCardSettings(
      v-show="openedSettings === cardNames.paymentDetailsCard",
      :user="user"
    )
    ContractCardSettings(
      v-show="openedSettings === cardNames.contractCard",
      :user="user"
    )
</template>

<script src="./PartnerProfile.js" />
<style lang="scss" src="./PartnerProfile.scss" />
