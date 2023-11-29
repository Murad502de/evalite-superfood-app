<template lang="pug">
.passport-card-settings
  AppCard.passport-card-settings--card
    AppFormPassport(
      ref="passport_card_settings_passport_form",
      :data="user",
      :loading="loading",
      :disabled="disabled || saveLoading",
      @update:full_name="updateFullNamePass",
      @update:series="updateSeriesPass",
      @update:number="updateNumberPass",
      @update:issue_date="updateIssueDatePass",
      @update:registration_address="updateRegistrationAddressPass",
      @update:issue_by="updateIssueByPass",
      @update:department_code="updateDepartmentCodePass",
      @update:main_spread="updateMainSpreadPass",
      @update:registration_spread="updateRegistrationSpreadPass",
      @update:verification_spread="updateVerificationSpreadPass"
    )
</template>

<script src="./PassportCardSettings.js" />
<style lang="scss" src="./PassportCardSettings.scss" />
