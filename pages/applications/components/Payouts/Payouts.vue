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
    @update:page="updatePage",
    @update:itemsPerPage="updateItemsPerPage"
  )
    v-data-table.elevation-1.app-table--table(
      hide-default-footer,
      mobile-breakpoint="576",
      :headers="headers",
      :items="items",
      :loading="loading",
      :loading-text="'Данные загружаются'",
      :server-items-length="itemsLength"
      @update:options="updateOptions"
      @click:row="openPayoutsDetailDialog",
    )
      template(v-slot:item.status="{ item }")
        AppStatus(:status="item.status")

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
