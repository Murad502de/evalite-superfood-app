<template lang="pug">
.payouts
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
    :saveLoading="payoutsDetailSaveLoading"
    :payoutLoading="payoutsDetailApproveLoading"
    @close="closePayoutsDetailDialog",
    @approve="approvePayoutsDetail",
  )
</template>

<script src="./Payouts.js" />
<style lang="scss" src="./Payouts.scss" />
