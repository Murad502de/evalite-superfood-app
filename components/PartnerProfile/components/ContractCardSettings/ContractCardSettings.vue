<template lang="pug">
.contract-card-settings
  AppCard.contract-card-settings--card
    AppFormDoc.contract-card-settings--form(
      ref="contract_card_settings_form",
      :data="user ? user.agencyContract : null",
      :title="'Загрузите документ в формате .pdf'",
      :loading="loading",
      :disabled="disabled || saveLoading",
      @update:agency_contract="updateAgencyContract"
    )
</template>

<script src="./ContractCardSettings.js" />
<style lang="scss" src="./ContractCardSettings.scss" />
