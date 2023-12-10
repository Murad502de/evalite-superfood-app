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
        :disabled="loading || disabled",
        @upload="uploadAvatar",
        @delete="deleteAvatar"
      )

    AppTextField(
      v-model="secondName",
      :rules="secondNameRules",
      :loading="loading",
      :disabled="disabled",
      label="Фамилия",
      required,
      outlined
    )

    AppTextField(
      v-model="firstName",
      :rules="firstNameRules",
      :loading="loading",
      :disabled="disabled",
      label="Имя",
      required,
      outlined
    )

    AppTextField(
      v-model="thirdName",
      :rules="thirdNameRules",
      :loading="loading",
      :disabled="disabled",
      label="Отчество",
      required,
      outlined
    )

    AppSelect(
      v-model="gender",
      :rules="genderRules",
      :loading="loading",
      :disabled="disabled",
      :items="['муж', 'жен']",
      label="Пол",
      required,
      outlined
    )

    AppPickerDate(
      hideActions,
      prefix="Дата рождения",
      :value="birthday",
      :rules="birthdayRules",
      :loading="loading",
      :disabled="disabled",
      @change="changeBirthday"
    )

    AppTextField(
      v-show="!hideEmail",
      v-model="email",
      :rules="emailRules",
      :loading="loading",
      :disabled="disabled",
      label="E-mail",
      required,
      outlined
    )

    AppTextField(
      v-model="phone",
      :rules="phoneRules",
      :loading="loading",
      :disabled="disabled",
      label="Телефон",
      :placeholder="formPlaceholder.phoneRus",
      required,
      outlined
    )
</template>

<script src="./AppFormPersonalData.js" />
<style lang="scss" src="./AppFormPersonalData.scss" />
