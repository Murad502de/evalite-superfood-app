<template lang="pug">
.home
  .home__container
    TheWidgetIncomeReferral.home--widget(
      :amount="25000",
      :amountThreshold="30000",
      :loading="widgetIncomeReferralLoading",
      :loadingPayout="widgetIncomeReferralLoadingPayout"
      @payout="payoutReferralIncome"
    )
</template>

<script src="./Home.js" />
<style lang="scss" src="./Home.scss" />
