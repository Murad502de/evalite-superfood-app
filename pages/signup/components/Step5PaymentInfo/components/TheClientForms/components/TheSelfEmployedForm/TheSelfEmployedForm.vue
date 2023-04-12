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
    label="БИК",
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
</template>

<script src="./TheSelfEmployedForm.js" />
<style lang="scss" src="./TheSelfEmployedForm.scss" />
