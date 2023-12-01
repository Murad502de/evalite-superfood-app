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
      BlockCard.partner-profile-block(
        :title="'Паспорт'",
        :items="passCardFields",
        @edit="openCardSettings(cardNames.passportCard)"
      )
      BlockCard.partner-profile-block(
        :title="'Платежные данные'",
        :items="paymentDetailsCardFields",
        @edit="openCardSettings(cardNames.paymentDetailsCard)"
      )
      BlockCard.partner-profile-block.partner-profile-contract(
        :title="'Договор'",
        @edit="openCardSettings(cardNames.contractCard)"
      )
        a.partner-profile-contract__link(
          v-if="agencyContractLink",
          :href="agencyContractLink",
          target="_blank"
        ) Просмотреть договор

        .partner-profile-contract_absent(v-else) Договор отсутствует

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
