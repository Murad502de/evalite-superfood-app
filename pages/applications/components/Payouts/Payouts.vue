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
    @click:row="onRowClick",
    @update:page="updatePage",
    @update:itemsPerPage="updateItemsPerPage"
  )
    v-data-table.elevation-1.payouts--table(
      hide-default-footer,
      mobile-breakpoint="576",
      :headers="headers",
      :items="items",
      :loading="loading",
      :loading-text="'Данные загружаются'"
    )
      template.payouts--table__action(v-slot:item.action="{item}")
        AppButton.payouts--payout__close(:loading="false" @click="onRowClick(item)") закрыть
</template>

<script src="./Payouts.js" />
<style lang="scss" src="./Payouts.scss" />
