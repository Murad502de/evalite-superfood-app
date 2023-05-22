<template lang="pug">
AppOverlay.verifications-detail(
  :dialog="dialog",
  :title="this.user.first_name",
  @close="close"
)
  template(v-slot:actions)
    v-btn(dark, text, @click="approve") Утвердить

  AppCard.verifications-detail--card
    v-tabs.verifications-detail--tabs(
      v-model="tab",
      :show-arrows="false",
      center-active
    )
      v-tab.verifications-detail--tab Персональные данные
      v-tab.verifications-detail--tab Паспорт
      v-tab.verifications-detail--tab Платежные данные

    v-window.verifications-detail--window(v-model="tab")
      v-window-item.verifications-detail--window-item
        AppFormPersonalData(ref="personal_data_form" :loading="loading")

      v-window-item.verifications-detail--window-item Паспорт
      v-window-item.verifications-detail--window-item Платежные данные

    AppButton(@click="save" :disabled="loading") Сохранить
</template>

<script src="./VerificationsDetail.js" />
<style lang="scss" src="./VerificationsDetail.scss" />
