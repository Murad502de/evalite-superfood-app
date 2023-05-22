<template lang="pug">
AppOverlay.verifications-detail(
  :dialog="dialog",
  :title="'Расулов Гаджимурад Зайнутдинович'",
  @close="close",
  @save="save"
)
  AppCard.verifications-detail--card
    v-btn(@click="validForm") test

    v-tabs.verifications-detail--tabs(
      v-model="tab",
      :show-arrows="false",
      center-active,
    )
      v-tab.verifications-detail--tab Персональные данные
      v-tab.verifications-detail--tab Паспорт
      v-tab.verifications-detail--tab Платежные данные

    v-window.verifications-detail--window(v-model="tab")
      v-window-item.verifications-detail--window-item
        v-form.verifications-detail--form(
          ref="form",
          v-model="valid",
          lazy-validation
        )
          AppTextField(v-model="test", label="Фамилия", :rules="rules")
          AppTextField(v-model="test", label="Имя", :rules="rules")
          AppTextField(v-model="test", label="Отчество", :rules="rules")
          AppSelect(
            v-model="test2",
            :items="['муж', 'жен']",
            label="Пол",
            required,
            outlined,
            :rules="rules"
          )

      v-window-item.verifications-detail--window-item Паспорт

      v-window-item.verifications-detail--window-item Платежные данные
</template>

<script src="./VerificationsDetail.js" />
<style lang="scss" src="./VerificationsDetail.scss" />
