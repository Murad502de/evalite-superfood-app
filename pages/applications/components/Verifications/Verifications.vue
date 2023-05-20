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

  AppOverlay(:dialog="dialog", @close="dialog = false", @save="dialog = false")
    .ttt AppOverlayMain TTT
</template>

<script src="./Verifications.js" />
<style lang="scss" src="./Verifications.scss" />
