<template lang="pug">
AppOverlay.payouts-detail(:dialog="dialog", :title="title", @close="close")
  template(v-slot:actions)
    v-btn(v-if="status === 'processing'" dark, text, @click="approve", :loading="approveLoading") Утвердить

  AppCard.payouts-detail--card
    v-tabs.payouts-detail--tabs(
      v-model="tab",
      :show-arrows="false",
      center-active
    )
      v-tab.payouts-detail--tab(:disabled="loading") Общие данные
      v-tab.payouts-detail--tab(:disabled="loading") Платежные данные

    v-window.payouts-detail--window(v-model="tab")
      v-window-item.payouts-detail--window-item
        AppTextField(v-model="date", label="Дата", outlined, readonly)
        AppTextField(v-model="fullName", label="ФИО", outlined, readonly)
        AppTextField(v-model="price", label="Сумма", outlined, readonly)

        .payouts-detail--receipt(
          :class="{ 'payouts-detail--receipt_error': receiptMediaError }"
        )
          .payouts-detail--receipt__title Квитанция о выплате (Изображение)
          AppFormMedia.payouts-detail--receipt__media(
            :mediaName="receiptMediaName",
            :mediaUrl="receiptMediaUrl",
            :disabled="receiptDisabled",
            @upload="uploadReceiptMedia",
            @delete="deleteReceiptMedia"
          )
            template(v-slot:stub-img)
              ReceiptSvg

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
