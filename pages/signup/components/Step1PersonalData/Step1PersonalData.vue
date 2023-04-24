<template lang="pug">
.signup-step1-personal-data
  .signup-step1-personal-data__title Личные данные
  v-form.signup-step1-personal-data__form(
    ref="form",
    v-model="valid",
    lazy-validation
  )
    .signup-step1-personal-data__form--avatar
      AppAvatar(
        :url="avatarUrl",
        @upload="uploadAvatar",
        @delete="deleteAvatar"
      )

    v-text-field(
      v-model="secondName",
      :rules="secondNameRules",
      :disabled="loading",
      label="Фамилия",
      required,
      outlined
    )

    v-text-field(
      v-model="firstName",
      :rules="firstNameRules",
      :disabled="loading",
      label="Имя",
      required,
      outlined
    )

    v-text-field(
      v-model="thirdName",
      :rules="thirdNameRules",
      :disabled="loading",
      label="Отчество",
      required,
      outlined
    )

    v-select(
      v-model="gender",
      :rules="genderRules",
      :disabled="loading",
      :items="['муж', 'жен']",
      label="Пол",
      required,
      outlined
    )

    v-text-field(
      v-model="birthday",
      :rules="birthdayRules",
      :disabled="loading",
      label="Дата рождения",
      required,
      outlined
    )

    v-text-field(
      v-model="email",
      :rules="emailRules",
      :disabled="loading",
      label="E-mail",
      required,
      outlined
    )

    v-text-field(
      v-model="phone",
      :rules="phoneRules",
      :disabled="loading",
      label="Телефон",
      required,
      outlined
    )
</template>

<script src="./Step1PersonalData.js" />
<style lang="scss" src="./Step1PersonalData.scss" />
