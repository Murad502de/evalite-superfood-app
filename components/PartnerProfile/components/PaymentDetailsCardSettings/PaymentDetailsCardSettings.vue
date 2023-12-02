<template lang="pug">
.payment-details-card-settings
  AppCard.payment-details-card-settings--card
    AppFormPaymentDetailsIE.payment-details-card-settings--form(
      ref="payment_details_ie_settings_form",
      :data="user",
      :loading="loading",
      :disabled="disabled || saveLoading",
      @update:full_name="updateFullName",
      @update:organization_legal_address="updateOrganizationLegalAddress",
      @update:inn="updateInn",
      @update:ogrn="updateOgrn",
      @update:transaction_account="updateTransactionAccount",
      @update:bank="updateBank",
      @update:bank_inn="updateBankInn",
      @update:bank_bic="updateBankBic",
      @update:bank_correspondent_account="updateBankCorrespondentAccount",
      @update:bank_legal_address="updateBankLegalAddress",
      @update:confirm_doc="updateConfirmDoc"
    )
</template>

<script src="./PaymentDetailsCardSettings.js" />
<style lang="scss" src="./PaymentDetailsCardSettings.scss" />
