<template lang="pug">
.verifications
  AppFilterTable.verifications--filter(
    @apply="applyFilter",
    @reset="resetFilter"
  )
    AppPickerDate.verifications--filter__field(
      :range="true",
      :value="filterDate",
      @ok="setFilterDate"
    )
    AppTextField.verifications--filter__field(
      v-model="filterEmail",
      label="Email"
    )
    AppTextField.verifications--filter__field(
      v-model="filterName",
      label="ФИО"
    )

  AppTable(
    :headers="headers",
    :items="items",
    :loading="loading",
    :loading-text="'Данные загружаются'",
    :page="page",
    :lastPage="lastPage",
    :itemsPerPage="itemsPerPage",
    :itemsLength="itemsLength",
    @update:options="updateOptions",
    @click:row="openVerificationsDetailDialog",
    @update:page="updatePage",
    @update:itemsPerPage="updateItemsPerPage"
  )

  VerificationsDetail(
    :user="verificationsDetail",
    :edited="verificationsDetailEdited",
    :dialog="verificationsDetailDialog",
    :loading="verificationsDetailLoading",
    :saveLoading="verificationsDetailLoadingSave",
    :approveLoading="verificationsDetailLoadingApprove",
    @close="closeVerificationsDetailDialog",
    @approve="approveVerificationsDetail",
    @save="saveVerificationsDetail",
  )
</template>

<script src="./Verifications.js" />
<style lang="scss" src="./Verifications.scss" />
