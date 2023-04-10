<template lang="pug">
.signup-step1-docs
  .signup-step1-docs__title Загрузка документов
  v-form.signup-step1-docs-form(ref="form", v-model="valid", lazy-validation)
    .signup-step1-docs-form-passport
      .signup-step1-docs-form-passport__title 1. Паспорт РФ

      .signup-step1-docs-form-passport__info
        .signup-step1-docs-form-passport__info--row
          v-text-field(
            v-model="passFullName",
            :rules="passFullNameRules",
            :disabled="loading",
            label="ФИО в паспорте",
            required,
            outlined
          )

        .signup-step1-docs-form-passport__info--row
          v-text-field.signup-step1-docs-form-passport__info--series(
            v-model="passSeries",
            :rules="passSeriesRules",
            :disabled="loading",
            label="Серия",
            required,
            outlined
          )

          v-text-field.signup-step1-docs-form-passport__info--number(
            v-model="passNumber",
            :rules="passNumberRules",
            :disabled="loading",
            label="Номер",
            required,
            outlined
          )

          v-text-field.signup-step1-docs-form-passport__info--issue-date(
            v-model="passIssueDate",
            :rules="passIssueDateRules",
            :disabled="loading",
            label="Дата выдачи",
            required,
            outlined
          )

          v-text-field.signup-step1-docs-form-passport__info--validity(
            v-model="passValidity",
            :rules="passValidityRules",
            :disabled="loading",
            label="Срок действия",
            required,
            outlined
          )

        .signup-step1-docs-form-passport__info--row
          v-text-field.signup-step1-docs-form-passport__info--issued-by(
            v-model="passIssuedBy",
            :rules="passIssuedByRules",
            :disabled="loading",
            label="Кем выдан",
            required,
            outlined
          )

        .signup-step1-docs-form-passport__info--row
          v-text-field.signup-step1-docs-form-passport__info--division-code(
            v-model="passDepartmentCode",
            :rules="passDepartmentCodeRules",
            :disabled="loading",
            label="Код подразделения",
            required,
            outlined
          )

      .signup-step1-docs-form-passport__media
        .signup-step1-docs-form-passport__spread-main
          .signup-step1-docs-form-passport__title Фото паспорта основной разворот (стр. 1-2)
          .signup-step1-docs-form-passport__media-info На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле зрения не должны попадать пальцы и посторонние предметы.

          AppFormMedia(
            :mediaName="mainSpreadMediaName",
            :mediaUrl="mainSpreadMediaUrl",
            @upload="uploadMainSpread",
            @delete="deleteMainSpread"
          )
            template(v-slot:stub-img)
              PassportSpreadMainSvg

        .signup-step1-docs-form-passport__spread-registration
          .signup-step1-docs-form-passport__title Фото паспорта разворот прописка (стр. 3-4)
          .signup-step1-docs-form-passport__media-info На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле зрения не должны попадать пальцы и посторонние предметы.

          AppFormMedia
            template(v-slot:stub-img)
              PassportSpreadRegistrationSvg

        .signup-step1-docs-form-passport__passport-verification
          .signup-step1-docs-form-passport__title Фото с паспортом
          .signup-step1-docs-form-passport__media-info На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле зрения не должны попадать пальцы и посторонние предметы.

          AppFormMedia
            template(v-slot:stub-img)
              PassportSpreadVerificationSvg
</template>

<script src="./Step4Docs.js" />
<style lang="scss" src="./Step4Docs.scss" />
