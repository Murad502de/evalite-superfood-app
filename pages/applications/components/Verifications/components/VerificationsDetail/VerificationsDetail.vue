<template lang="pug">
AppOverlay.verifications-detail(
  :dialog="dialog",
  :title="'Расулов Гаджимурад Зайнутдинович'",
  @close="close",
  @save="save"
)
  AppCard.verifications-detail--card
    v-form.verifications-detail--form(ref="form", v-model="valid", lazy-validation)
      AppTextField(v-model="test" label="Фамилия")
      AppTextField(v-model="test" label="Имя")
      AppTextField(v-model="test" label="Отчество")
</template>

<script src="./VerificationsDetail.js" />
<style lang="scss" src="./VerificationsDetail.scss" />
