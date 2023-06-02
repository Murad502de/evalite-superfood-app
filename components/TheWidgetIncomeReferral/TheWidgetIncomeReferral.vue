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
      AppCard.the-widget-income-referral--info-block
        .the-widget-income-referral--info-block__title {{ amountTitle }}
        .the-widget-income-referral--info-block__value {{ convertToMoneyFormat(amount) }}

      AppCard.the-widget-income-referral--info-block
        .the-widget-income-referral--info-block__title {{ amountTitleResidual }}
        .the-widget-income-referral--info-block__value {{ convertToMoneyFormat(amountResidual) }}

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
