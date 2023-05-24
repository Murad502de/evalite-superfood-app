<template lang="pug">
v-form.app-form-payment-details-se(ref="form", v-model="valid", lazy-validation)
  AppTextField(
    v-model="seFullName",
    :rules="seFullNameRules",
    :disabled="loading",
    label="ФИО получателя",
    required,
    outlined
  )
  AppTextField(
    v-model="transactionAccount",
    :rules="transactionAccountRules",
    :disabled="loading",
    label="Номер счета",
    required,
    outlined
  )
  AppTextField(
    v-model="seInn",
    :rules="seInnRules",
    :disabled="loading",
    label="ИНН",
    required,
    outlined
  )
  AppTextField(
    v-model="seSwift",
    :rules="seSwiftRules",
    :disabled="loading",
    label="SWIFT-код",
    required,
    outlined
  )
  AppTextField(
    v-model="seMailingAddress",
    :rules="seMailingAddressRules",
    :disabled="loading",
    label="Почтовый адрес",
    required,
    outlined
  )
  AppTextField(
    v-model="seBank",
    :rules="seBankRules",
    :disabled="loading",
    label="Банк получателя",
    required,
    outlined
  )
  AppTextField(
    v-model="bic",
    :rules="bicRules",
    :disabled="loading",
    label="БИК банка",
    required,
    outlined
  )
  AppTextField(
    v-model="correspondentAccount",
    :rules="correspondentAccountRules",
    :disabled="loading",
    label="Корр. счет",
    required,
    outlined
  )
  AppTextField(
    v-model="bankInn",
    :rules="bankInnRules",
    :disabled="loading",
    label="ИНН банка",
    required,
    outlined
  )
  AppTextField(
    v-model="bankKpp",
    :rules="bankKppRules",
    :disabled="loading",
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
