<template lang="pug">
.payouts
  AppFilterTable.payouts--filter(@apply="applyFilter", @reset="resetFilter")
    AppPickerDate.payouts--filter__field(
      :range="true",
      :value="filterDate",
      @ok="setFilterDate"
    )
    AppTextField.payouts--filter__field(v-model="filterEmail", label="Email")
    AppTextField.payouts--filter__field(v-model="filterName", label="ФИО")
    AppSelect.payouts--filter__field(
      v-model="filterStatus",
      :items="payoutsStatuses",
      label="Статус",
      outlined
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
    @click:row="openPayoutsDetailDialog",
    @update:page="updatePage",
    @update:itemsPerPage="updateItemsPerPage"
  )

  PayoutsDetail(
    :payout="payoutsDetail",
    :edited="payoutsDetailEdited",
    :dialog="payoutsDetailDialog",
    :loading="payoutsDetailLoading",
    :approveLoading="payoutsDetailApproveLoading",
    @close="closePayoutsDetailDialog",
    @approve="approvePayoutsDetail"
  )
</template>

<script src="./Payouts.js" />
<style lang="scss" src="./Payouts.scss" />
