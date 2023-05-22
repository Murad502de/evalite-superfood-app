<template lang="pug">
.app-form-passport
  .app-form-passport__title Загрузка документов
  v-form.app-form-passport-form(ref="form", v-model="valid", lazy-validation)
    .app-form-passport-form-passport
      .app-form-passport-form-passport__title 1. Паспорт РФ

      .app-form-passport-form-passport__info
        .app-form-passport-form-passport__info--row
          v-text-field(
            v-model="passFullName",
            :rules="passFullNameRules",
            :disabled="loading",
            label="ФИО в паспорте",
            required,
            outlined
          )

        .app-form-passport-form-passport__info--row
          v-text-field.app-form-passport-form-passport__info--series(
            v-model="passSeries",
            :rules="passSeriesRules",
            :disabled="loading",
            label="Серия",
            required,
            outlined
          )

          v-text-field.app-form-passport-form-passport__info--number(
            v-model="passNumber",
            :rules="passNumberRules",
            :disabled="loading",
            label="Номер",
            required,
            outlined
          )

          v-text-field.app-form-passport-form-passport__info--issue-date(
            v-model="passIssueDate",
            :rules="passIssueDateRules",
            :disabled="loading",
            label="Дата выдачи",
            :placeholder="formPlaceholder.date",
            required,
            outlined
          )

          v-text-field.app-form-passport-form-passport__info--validity(
            v-model="passRegistrationAddress",
            :rules="passRegistrationAddressRules",
            :disabled="loading",
            label="Адрес регистрации",
            required,
            outlined
          )

        .app-form-passport-form-passport__info--row
          v-text-field.app-form-passport-form-passport__info--issued-by(
            v-model="passIssuedBy",
            :rules="passIssuedByRules",
            :disabled="loading",
            label="Кем выдан",
            required,
            outlined
          )

        .app-form-passport-form-passport__info--row
          v-text-field.app-form-passport-form-passport__info--division-code(
            v-model="passDepartmentCode",
            :rules="passDepartmentCodeRules",
            :disabled="loading",
            label="Код подразделения",
            required,
            outlined
          )

      .app-form-passport-form-passport__media
        .app-form-passport-form-passport__spread-main(
          :class="{ 'app-form-passport-form-passport_error': mainSpreadMediaError }"
        )
          .app-form-passport-form-passport__title Фото паспорта основной разворот (стр. 1-2)
          .app-form-passport-form-passport__media-info На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле зрения не должны попадать пальцы и посторонние предметы.

          AppFormMedia(
            :mediaName="mainSpreadMediaName",
            :mediaUrl="mainSpreadMediaUrl",
            @upload="uploadMainSpread",
            @delete="deleteMainSpread"
          )
            template(v-slot:stub-img)
              PassportSpreadMainSvg

        .app-form-passport-form-passport__spread-registration(
          :class="{ 'app-form-passport-form-passport_error': registrationSpreadMediaError }"
        )
          .app-form-passport-form-passport__title Фото паспорта разворот прописка (стр. 3-4)
          .app-form-passport-form-passport__media-info На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле зрения не должны попадать пальцы и посторонние предметы.

          AppFormMedia(
            :mediaName="registrationSpreadMediaName",
            :mediaUrl="registrationSpreadMediaUrl",
            @upload="uploadRegistrationSpread",
            @delete="deleteRegistrationSpread"
          )
            template(v-slot:stub-img)
              PassportSpreadRegistrationSvg

        .app-form-passport-form-passport__passport-verification(
          :class="{ 'app-form-passport-form-passport_error': verificationSpreadMediaError }"
        )
          .app-form-passport-form-passport__title Фото с паспортом
          .app-form-passport-form-passport__media-info На фотографии должны быть отчетливо видны серия, номер, основные данные, фотография. В поле зрения не должны попадать пальцы и посторонние предметы.

          AppFormMedia(
            :mediaName="verificationSpreadMediaName",
            :mediaUrl="verificationSpreadMediaUrl",
            @upload="uploadVerificationSpread",
            @delete="deleteVerificationSpread"
          )
            template(v-slot:stub-img)
              PassportSpreadVerificationSvg
</template>

<script src="./AppFormPassport.js" />
<style lang="scss" src="./AppFormPassport.scss" />
