<template lang="pug">
.payouts-completed
  AppTable(
    :headers="headers",
    :items="items",
    :loading="loading",
    :loading-text="'Данные загружаются'",
    :page="page",
    :lastPage="lastPage",
    :itemsPerPage="itemsPerPage",
    :itemsLength="itemsLength",
    @click:row="openPayoutsDetailDialog",
    @update:page="updatePage",
    @update:itemsPerPage="updateItemsPerPage"
  )

  PayoutsDetail(
    :payout="payoutsDetail",
    :edited="payoutsDetailEdited",
    :dialog="payoutsDetailDialog",
    :loading="payoutsDetailLoading",
    :approveLoading="payoutsDetailApproveLoading"
    @close="closePayoutsDetailDialog",
    @approve="approvePayoutsDetail",
  )
</template>

<script src="./PayoutsCompleted.js" />
<style lang="scss" src="./PayoutsCompleted.scss" />
