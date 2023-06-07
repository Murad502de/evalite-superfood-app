<template lang="pug">
AppOverlay.payouts-detail(:dialog="dialog", :title="title", @close="close")
  AppCard.payouts-detail--card
    v-tabs.payouts-detail--tabs(
      v-model="tab",
      :show-arrows="false",
      center-active,
    )
      v-tab.payouts-detail--tab(:disabled="loading") Общие данные
      v-tab.payouts-detail--tab(:disabled="loading") Платежные данные

    v-window.payouts-detail--window(v-model="tab")
      v-window-item.payouts-detail--window-item
        AppTextField(
          v-model="date",
          label="Дата",
          outlined,
          readonly
        )
        AppTextField(
          v-model="fullName",
          label="ФИО",
          outlined,
          readonly
        )
        AppTextField(
          v-model="price",
          label="Сумма",
          outlined,
          readonly
        )

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
