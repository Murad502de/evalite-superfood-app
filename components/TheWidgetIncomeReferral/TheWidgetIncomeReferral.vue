<template lang="pug">
AppCard.the-widget-income-referral
  .the-widget-income-referral__container
    .the-widget-income-referral__header
      .the-widget-income-referral--status
        StatusSuccess.the-widget-income-referral--status__logo(
          v-if="isSuccess"
        )
        StatusWarning.the-widget-income-referral--status__logo(v-else)
        .the-widget-income-referral--status__title {{ getStatusTitle() }}

    .the-widget-income-referral__main
      InfoBlock.the-widget-income-referral__info-block(
        :title="amountTitle",
        :value="convertToMoneyFormat(amount)",
        :loading="loading"
      )
      InfoBlock.the-widget-income-referral__info-block(
        :title="amountTitleResidual",
        :value="convertToMoneyFormat(amountResidual)",
        :loading="loading"
      )

    .the-widget-income-referral__footer
      AppButton.the-widget-income-referral--payout(
        color="#FFFFFF",
        :styles="{ color: '#0082DE' }",
        :loading="loadingPayout",
        :disabled="!isSuccess",
        @click="payout"
      ) Вывести
</template>

<script src="./TheWidgetIncomeReferral.js" />
<style lang="scss" src="./TheWidgetIncomeReferral.scss" />
