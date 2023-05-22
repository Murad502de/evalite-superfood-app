<template lang="pug">
.app-form-personal-data
  .app-form-personal-data__title {{ title }}
  v-form.app-form-personal-data__form(
    ref="form",
    v-model="valid",
    lazy-validation
  )
    .app-form-personal-data__form--avatar
      AppAvatar(
        :url="avatarUrl",
        :error="avatarError",
        :disabled="loading",
        @upload="uploadAvatar",
        @delete="deleteAvatar"
      )

    AppTextField(
      v-model="secondName",
      :rules="secondNameRules",
      :loading="loading",
      label="Фамилия",
      required,
      outlined
    )

    AppTextField(
      v-model="firstName",
      :rules="firstNameRules",
      :loading="loading",
      label="Имя",
      required,
      outlined
    )

    AppTextField(
      v-model="thirdName",
      :rules="thirdNameRules",
      :loading="loading",
      label="Отчество",
      required,
      outlined
    )

    AppSelect(
      v-model="gender",
      :rules="genderRules",
      :loading="loading",
      :items="['муж', 'жен']",
      label="Пол",
      required,
      outlined
    )

    AppTextField(
      v-model="birthday",
      :rules="birthdayRules",
      :loading="loading",
      label="Дата рождения",
      :placeholder="formPlaceholder.date",
      required,
      outlined
    )

    AppTextField(
      v-model="email",
      :rules="emailRules",
      :loading="loading",
      label="E-mail",
      required,
      outlined
    )

    AppTextField(
      v-model="phone",
      :rules="phoneRules",
      :loading="loading",
      label="Телефон",
      :placeholder="formPlaceholder.phoneRus",
      required,
      outlined
    )
</template>

<script src="./AppFormPersonalData.js" />
<style lang="scss" src="./AppFormPersonalData.scss" />
