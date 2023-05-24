<template lang="pug">
AppOverlay.verifications-detail(
  :dialog="dialog",
  :title="title",
  @close="close"
)
  template(v-slot:actions)
    v-btn(dark, text, @click="approve", :loading="approveLoading") Утвердить

  AppCard.verifications-detail--card
    v-tabs.verifications-detail--tabs(
      v-model="tab",
      :show-arrows="false",
      center-active,
      :hide-slider="approveLoading"
    )
      v-tab.verifications-detail--tab(:disabled="approveLoading") Персональные данные
      v-tab.verifications-detail--tab(:disabled="approveLoading") Паспорт
      v-tab.verifications-detail--tab(:disabled="approveLoading") Платежные данные
      v-tab.verifications-detail--tab(:disabled="approveLoading") Договор

    v-window.verifications-detail--window(v-model="tab")
      v-window-item.verifications-detail--window-item
        AppFormPersonalData(
          ref="personal_data_form",
          :data="this.user",
          :loading="loading",
          :disabled="approveLoading",
          @update:avatar="updateAvatar",
          @update:second_name="updateSecondName",
          @update:first_name="updateFirstName",
          @update:third_name="updateThirdName",
          @update:gender="updateGender",
          @update:birthday="updateBirthday",
          @update:email="updateEmail",
          @update:phone="updatePhone"
        )

      v-window-item.verifications-detail--window-item
        AppFormPassport(
          ref="passport_form",
          :data="this.user",
          :loading="loading",
          :disabled="approveLoading"
        )

      v-window-item.verifications-detail--window-item
        AppFormPaymentDetailsSE(
          v-if="this.user && this.user.employmentType === 'self_employed'",
          ref="payment_details_form_se",
          :data="this.user",
          :loading="loading",
          :disabled="approveLoading"
        )
        AppFormPaymentDetailsIE(
          v-if="this.user && this.user.employmentType === 'individual_entrepreneur'",
          ref="payment_details_form_ie",
          :data="this.user",
          :loading="loading",
          :disabled="approveLoading"
        )

      v-window-item.verifications-detail--window-item Договор

    AppButton(@click="save", :disabled="loading || approveLoading") Сохранить
</template>

<script src="./VerificationsDetail.js" />
<style lang="scss" src="./VerificationsDetail.scss" />
