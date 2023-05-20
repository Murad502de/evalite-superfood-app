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
    @click:row="openVerificationsDetailDialog",
    @update:page="updatePage",
    @update:itemsPerPage="updateItemsPerPage"
  )

  VerificationsDetail(
    :dialog="verificationsDetailDialog",
    @close="closeVerificationsDetailDialog",
    @save="saveVerificationsDetailDialog"
  )
</template>

<script src="./Verifications.js" />
<style lang="scss" src="./Verifications.scss" />
