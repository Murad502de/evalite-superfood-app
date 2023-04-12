<template lang="pug">
v-form.the-individual-entrepreneur-form(
  ref="form",
  v-model="valid",
  lazy-validation
)
  v-text-field(
    v-model="ieFullName",
    :rules="ieFullNameRules",
    :disabled="loading",
    label="ФИО ИП",
    required,
    outlined
  )
  v-text-field(
    v-model="organizationLegalAddress",
    :rules="organizationLegalAddressRules",
    :disabled="loading",
    label="Юридический адрес организации",
    required,
    outlined
  )
  v-text-field(
    v-model="inn",
    :rules="innRules",
    :disabled="loading",
    label="ИНН",
    required,
    outlined
  )
  v-text-field(
    v-model="ogrn",
    :rules="ogrnRules",
    :disabled="loading",
    label="ОГРН",
    required,
    outlined
  )
  v-text-field(
    v-model="transactionAccount",
    :rules="transactionAccountRules",
    :disabled="loading",
    label="Расчетный счет",
    required,
    outlined
  )
  v-text-field(
    v-model="bank",
    :rules="bankRules",
    :disabled="loading",
    label="Банк",
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
    v-model="bankBic",
    :rules="bankBicRules",
    :disabled="loading",
    label="БИК банка",
    required,
    outlined
  )
  v-text-field(
    v-model="bankCorrespondentAccount",
    :rules="bankCorrespondentAccountRules",
    :disabled="loading",
    label="Корреспондентский счет банка",
    required,
    outlined
  )
  v-text-field(
    v-model="bankLegalAddress",
    :rules="bankLegalAddressRules",
    :disabled="loading",
    label="Юридический адрес банка",
    required,
    outlined
  )
</template>

<script src="./TheIndividualEntrepreneurForm.js" />
<style lang="scss" src="./TheIndividualEntrepreneurForm.scss" />
