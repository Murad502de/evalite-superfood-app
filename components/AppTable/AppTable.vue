<template lang="pug">
.app-table
  slot.elevation-1.app-table--table
    v-data-table.elevation-1.app-table--table(
      hide-default-footer,
      mobile-breakpoint="576",
      :headers="headers",
      :items="items",
      :loading="loading",
      :loading-text="loadingText",
      @click:row="onRowClick"
    )
  v-data-footer(
    :items-per-page-options="[25, 50, 100]",
    :options="{ page: page, itemsPerPage: itemsPerPage }",
    :pagination="{ itemsLength: itemsLength }",
    @update:options="updateOptions",
    :disable-pagination="loading",
    :disable-items-per-page="loading"
  )
    template(v-slot:page-text) {{ `${page} из ${lastPage}` }}
</template>

<script src="./AppTable.js" />
<style lang="scss" src="./AppTable.scss" />
