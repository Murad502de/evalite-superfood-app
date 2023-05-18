<template lang="pug">
.verifications
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

<script src="./Verifications.js" />
<style lang="scss" src="./Verifications.scss" />
