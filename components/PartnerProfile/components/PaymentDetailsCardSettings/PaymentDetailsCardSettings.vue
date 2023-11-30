<template lang="pug">
.payment-details-card-settings
  AppCard.payment-details-card-settings--card
    AppFormPaymentDetailsIE.payment-details-card-settings--form(
      ref="payment_details_ie_settings_form",
      :data="user",
      :loading="loading",
      :disabled="disabled || saveLoading",
      @update:full_name="updateFullNameIE",
      @update:organization_legal_address="updateOrganizationLegalAddressIE",
      @update:inn="updateInnIE",
      @update:ogrn="updateOgrnIE",
      @update:transaction_account="updateTransactionAccountIE",
      @update:bank="updateBankIE",
      @update:bank_inn="updateBankInnIE",
      @update:bank_bic="updateBankBicIE",
      @update:bank_correspondent_account="updateBankCorrespondentAccountIE",
      @update:bank_legal_address="updateBankLegalAddressIE",
      @update:confirm_doc="updateConfirmDocIE"
    )
</template>

<script src="./PaymentDetailsCardSettings.js" />
<style lang="scss" src="./PaymentDetailsCardSettings.scss" />
