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
</template>

<script src="./Payouts.js" />
<style lang="scss" src="./Payouts.scss" />
