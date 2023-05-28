<template lang="pug">
v-form.app-form-payment-details-ie(ref="form", v-model="valid", lazy-validation)
  AppTextField(
    v-model="fullName",
    :rules="fullNameRules",
    :loading="loading",
    :disabled="disabled",
    :readonly="readonly"
    label="ФИО ИП",
    required,
    outlined
  )
  AppTextField(
    v-model="organizationLegalAddress",
    :rules="organizationLegalAddressRules",
    :loading="loading",
    :disabled="disabled",
    :readonly="readonly"
    label="Юридический адрес организации",
    required,
    outlined
  )
  AppTextField(
    v-model="inn",
    :rules="innRules",
    :loading="loading",
    :disabled="disabled",
    :readonly="readonly"
    label="ИНН",
    required,
    outlined
  )
  AppTextField(
    v-model="ogrn",
    :rules="ogrnRules",
    :loading="loading",
    :disabled="disabled",
    :readonly="readonly"
    label="ОГРН",
    required,
    outlined
  )
  AppTextField(
    v-model="transactionAccount",
    :rules="transactionAccountRules",
    :loading="loading",
    :disabled="disabled",
    :readonly="readonly"
    label="Расчетный счет",
    required,
    outlined
  )
  AppTextField(
    v-model="bank",
    :rules="bankRules",
    :loading="loading",
    :disabled="disabled",
    :readonly="readonly"
    label="Банк",
    required,
    outlined
  )
  AppTextField(
    v-model="bankInn",
    :rules="bankInnRules",
    :loading="loading",
    :disabled="disabled",
    :readonly="readonly"
    label="ИНН банка",
    required,
    outlined
  )
  AppTextField(
    v-model="bankBic",
    :rules="bankBicRules",
    :loading="loading",
    :disabled="disabled",
    :readonly="readonly"
    label="БИК банка",
    required,
    outlined
  )
  AppTextField(
    v-model="bankCorrespondentAccount",
    :rules="bankCorrespondentAccountRules",
    :loading="loading",
    :disabled="disabled",
    :readonly="readonly"
    label="Корреспондентский счет банка",
    required,
    outlined
  )
  AppTextField(
    v-model="bankLegalAddress",
    :rules="bankLegalAddressRules",
    :loading="loading",
    :disabled="disabled",
    :readonly="readonly"
    label="Юридический адрес банка",
    required,
    outlined
  )

  .app-form-payment-details-ie--certificate
    .app-form-payment-details-ie--certificate__title(
      :class="{ 'app-form-payment-details-ie--certificate__title_error': confirmDocError }"
    ) Подтверждающий документ ЕГРИП
    .app-form-payment-details-ie--certificate__info Загрузите документ в формате .pdf
    AppFormMediaDoc.app-form-payment-details-ie--certificate__file(
      :type="'pdf'",
      :mediaName="confirmDocName",
      :mediaUrl="confirmDocUrl",
      @upload="uploadConfirmDoc",
      @delete="deleteConfirmDoc"
    )
</template>

<script src="./AppFormPaymentDetailsIE.js" />
<style lang="scss" src="./AppFormPaymentDetailsIE.scss" />
