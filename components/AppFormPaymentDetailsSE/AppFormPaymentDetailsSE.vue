<template lang="pug">
v-form.app-form-payment-details-se(ref="form", v-model="valid", lazy-validation)
  AppTextField(
    v-model="fullName",
    :rules="fullNameRules",
    :loading="loading",
    :disabled="disabled",
    label="ФИО получателя",
    required,
    outlined
  )
  AppTextField(
    v-model="transactionAccount",
    :rules="transactionAccountRules",
    :loading="loading",
    :disabled="disabled",
    label="Номер счета",
    required,
    outlined
  )
  AppTextField(
    v-model="inn",
    :rules="innRules",
    :loading="loading",
    :disabled="disabled",
    label="ИНН",
    required,
    outlined
  )
  AppTextField(
    v-model="swift",
    :rules="swiftRules",
    :loading="loading",
    :disabled="disabled",
    label="SWIFT-код",
    required,
    outlined
  )
  AppTextField(
    v-model="mailingAddress",
    :rules="mailingAddressRules",
    :loading="loading",
    :disabled="disabled",
    label="Почтовый адрес",
    required,
    outlined
  )
  AppTextField(
    v-model="bank",
    :rules="bankRules",
    :loading="loading",
    :disabled="disabled",
    label="Банк получателя",
    required,
    outlined
  )
  AppTextField(
    v-model="bic",
    :rules="bicRules",
    :loading="loading",
    :disabled="disabled",
    label="БИК банка",
    required,
    outlined
  )
  AppTextField(
    v-model="correspondentAccount",
    :rules="correspondentAccountRules",
    :loading="loading",
    :disabled="disabled",
    label="Корр. счет",
    required,
    outlined
  )
  AppTextField(
    v-model="bankInn",
    :rules="bankInnRules",
    :loading="loading",
    :disabled="disabled",
    label="ИНН банка",
    required,
    outlined
  )
  AppTextField(
    v-model="bankKpp",
    :rules="bankKppRules",
    :loading="loading",
    :disabled="disabled",
    label="КПП банка",
    required,
    outlined
  )

  .app-form-payment-details-se--certificate
    .app-form-payment-details-se--certificate__title(
      :class="{ 'app-form-payment-details-se--certificate__title_error': confirmDocError }"
    ) Подтверждающий документ НПД (форма КНД 1122035)
    .app-form-payment-details-se--certificate__info Загрузите документ в формате .pdf
    AppFormMediaDoc.app-form-payment-details-se--certificate__file(
      :type="'pdf'",
      :mediaName="confirmDocName",
      :mediaUrl="confirmDocUrl",
      @upload="uploadConfirmDoc",
      @delete="deleteConfirmDoc"
    )
</template>

<script src="./AppFormPaymentDetailsSE.js" />
<style lang="scss" src="./AppFormPaymentDetailsSE.scss" />
