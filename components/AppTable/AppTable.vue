<template lang="pug">
.app-table
  v-data-table.elevation-1.app-table--table(
    hide-default-footer,
    :headers="headers",
    :items="items",
    :loading="loading",
    :loading-text="loadingText",
    @click:row="onRowClick"
  )
  v-data-footer(
    :items-per-page-options="[5, 10]",
    :options="{ page: page, itemsPerPage: itemsPerPage }",
    :pagination="{ itemsLength: itemsLength }",
    @update:options="updateOptions"

    :disable-pagination="loading"
    :disable-items-per-page="loading"
  )
    template(v-slot:page-text) {{ `${page} из ${lastPage}` }}
</template>

<script src="./AppTable.js" />
<style lang="scss" src="./AppTable.scss" />
