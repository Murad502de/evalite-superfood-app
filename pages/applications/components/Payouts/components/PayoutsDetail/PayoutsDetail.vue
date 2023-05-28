<template lang="pug">
AppOverlay.payouts-detail(
  :dialog="dialog",
  :title="title",
  @close="close"
)
  template(v-slot:actions)
    v-btn(dark, text, @click="approve", :loading="payoutLoading") Утвердить

  AppCard.payouts-detail--card
    v-tabs.payouts-detail--tabs(
      v-model="tab",
      :show-arrows="false",
      center-active,
      :hide-slider="payoutLoading"
    )
      v-tab.payouts-detail--tab Общие данные
      v-tab.payouts-detail--tab Платежные данные

    v-window.payouts-detail--window(v-model="tab")
      v-window-item.payouts-detail--window-item Общие данные

      v-window-item.payouts-detail--window-item
        AppFormPaymentDetailsSE(
          v-if="employmentTypeCrt === employmentTypeSE",
          ref="payment_details_form_se",
          :data="this.user",
          :loading="loading",
          readonly
        )
        AppFormPaymentDetailsIE(
          v-if="employmentTypeCrt === employmentTypeIE",
          ref="payment_details_form_ie",
          :data="this.user",
          :loading="loading",
          readonly
        )
</template>

<script src="./PayoutsDetail.js" />
<style lang="scss" src="./PayoutsDetail.scss" />
