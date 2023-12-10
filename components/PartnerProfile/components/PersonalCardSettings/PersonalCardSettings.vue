<template lang="pug">
.personal-card-settings
  AppCard.personal-card-settings--card
    v-tabs.personal-card-settings--tabs(
      v-model="tab",
      :show-arrows="false",
      center-active,
      :hide-slider="disabled || saveLoading"
    )
      v-tab.personal-card-settings--tab(:disabled="disabled || saveLoading") Общее
      v-tab.personal-card-settings--tab(:disabled="disabled || saveLoading") Пароль

    v-window.personal-card-settings--window(v-model="tab")
      v-window-item.personal-card-settings--window-item
        AppFormPersonalData(
          ref="partner_profile_personal_data_form",
          :data="user",
          :loading="loading",
          :disabled="disabled || saveLoading",
          hideEmail,
          @update:avatar="updateAvatar",
          @update:second_name="updateSecondName",
          @update:first_name="updateFirstName",
          @update:third_name="updateThirdName",
          @update:gender="updateGender",
          @update:birthday="updateBirthday",
          @update:email="updateEmail",
          @update:phone="updatePhone"
        )

      v-window-item.personal-card-settings--window-item
        AppFormPassword(
          ref="partner_profile_personal_password_form",
          :loading="loading",
          :disabled="disabled || saveLoading",
          @update:password="updatePassword"
        )
</template>

<script src="./PersonalCardSettings.js" />
<style lang="scss" src="./PersonalCardSettings.scss" />
