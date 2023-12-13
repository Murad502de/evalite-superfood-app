<template lang="pug">
AppCard.the-widget-income-partner
  .the-widget-income-partner__container
    .the-widget-income-partner__header
      .the-widget-income-partner--status(v-show="!loading")
        StatusSuccess.the-widget-income-partner--status__logo(v-if="isSuccess")
        StatusWarning.the-widget-income-partner--status__logo(v-else)
        .the-widget-income-partner--status__title {{ getStatusTitle() }}
      AppSkeleton.the-widget-income-partner__skeleton(
        v-show="loading",
        height="24"
      )

    .the-widget-income-partner__main
      InfoBlock.the-widget-income-partner__info-block(
        :title="amountTitle",
        :value="convertToMoneyFormat(amount)",
        :loading="loading"
      )
      //- InfoBlock.the-widget-income-partner__info-block(
      //-   :title="amountTitleResidual",
      //-   :value="convertToMoneyFormat(amountResidual)",
      //-   :loading="loading"
      //- )

    .the-widget-income-partner__footer
      AppButton.the-widget-income-partner--payout(
        v-show="!loading && !hidePayoutBtn",
        color="#FFFFFF",
        :styles="{ color: '#0082DE' }",
        :loading="loadingPayout",
        :disabled="!isSuccess",
        @click="payout"
      ) Вывести
      AppSkeleton.the-widget-income-partner__skeleton.the-widget-income-partner--payout__skeleton(
        v-show="loading",
        height="36"
      )
</template>

<script src="./TheWidgetIncomeReferral.js" />
<style lang="scss" src="./TheWidgetIncomeReferral.scss" />
