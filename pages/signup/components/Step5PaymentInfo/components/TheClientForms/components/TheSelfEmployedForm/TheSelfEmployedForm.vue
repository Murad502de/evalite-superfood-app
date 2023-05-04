<template lang="pug">
v-form.the-self-employed-form(ref="form", v-model="valid", lazy-validation)
  v-text-field(
    v-model="seFullName",
    :rules="seFullNameRules",
    :disabled="loading",
    label="ФИО получателя",
    required,
    outlined
  )
  v-text-field(
    v-model="transactionAccount",
    :rules="transactionAccountRules",
    :disabled="loading",
    label="Номер счета",
    required,
    outlined
  )
  v-text-field(
    v-model="seInn",
    :rules="seInnRules",
    :disabled="loading",
    label="ИНН",
    required,
    outlined
  )
  v-text-field(
    v-model="seSwift",
    :rules="seSwiftRules",
    :disabled="loading",
    label="SWIFT-код",
    required,
    outlined
  )
  v-text-field(
    v-model="seMailingAddress",
    :rules="seMailingAddressRules",
    :disabled="loading",
    label="Почтовый адрес",
    required,
    outlined
  )
  v-text-field(
    v-model="seBank",
    :rules="seBankRules",
    :disabled="loading",
    label="Банк получателя",
    required,
    outlined
  )
  v-text-field(
    v-model="bic",
    :rules="bicRules",
    :disabled="loading",
    label="БИК банка",
    required,
    outlined
  )
  v-text-field(
    v-model="correspondentAccount",
    :rules="correspondentAccountRules",
    :disabled="loading",
    label="Корр. счет",
    required,
    outlined
  )
  v-text-field(
    v-model="bankInn",
    :rules="bankInnRules",
    :disabled="loading",
    label="ИНН банка",
    required,
    outlined
  )
  v-text-field(
    v-model="bankKpp",
    :rules="bankKppRules",
    :disabled="loading",
    label="КПП банка",
    required,
    outlined
  )

  .the-self-employed-form--certificate
    .the-self-employed-form--certificate__title(
      :class="{ 'the-self-employed-form--certificate__title_error': confirmDocError }"
    ) Подтверждающий документ НПД (форма КНД 1122035)
    .the-self-employed-form--certificate__info Загрузите документ в формате .pdf
    AppFormMediaDoc.the-self-employed-form--certificate__file(
      :type="'pdf'",
      :mediaName="confirmDocName",
      :mediaUrl="confirmDocUrl",
      @upload="uploadConfirmDoc",
      @delete="deleteConfirmDoc"
    )
</template>

<script src="./TheSelfEmployedForm.js" />
<style lang="scss" src="./TheSelfEmployedForm.scss" />
