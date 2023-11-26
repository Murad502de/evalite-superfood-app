<template lang="pug">
.partner-profile-info-card-settings
  AppCard.partner-profile-info-card-settings--card
    v-tabs.partner-profile-info-card-settings--tabs(
      v-model="tab",
      :show-arrows="false",
      center-active,
      :hide-slider="disabled || saveLoading"
    )
      v-tab.partner-profile-info-card-settings--tab(
        :disabled="disabled || saveLoading"
      ) Общее
      v-tab.partner-profile-info-card-settings--tab(
        :disabled="disabled || saveLoading"
      ) Пароль

    v-window.verifications-detail--window(v-model="tab")
      v-window-item.verifications-detail--window-item
        AppFormPersonalData(
          ref="partner_profile_personal_data_form",
          :data="user",
          :loading="loading",
          :disabled="disabled || saveLoading",
          @update:avatar="updateAvatar",
          @update:second_name="updateSecondName",
          @update:first_name="updateFirstName",
          @update:third_name="updateThirdName",
          @update:gender="updateGender",
          @update:birthday="updateBirthday",
          @update:email="updateEmail",
          @update:phone="updatePhone"
        )

      v-window-item.verifications-detail--window-item QWERTYUIOP 1
</template>

<script src="./PartnerProfileInfoCardSettings.js" />
<style lang="scss" src="./PartnerProfileInfoCardSettings.scss" />
