<template lang="pug">
v-expansion-panels.app-filter-table(flat)
  v-expansion-panel
    v-expansion-panel-header.app-filter-table__title Фильтры
    v-expansion-panel-content
      slot

      .app-filter-table__actions
        AppButton.app-filter-table__apply(@click="$emit('apply')") Применить
        AppButton.app-filter-table__reset(
          @click="$emit('reset')",
          color="#F2F6F9"
        ) Сбросить
</template>

<script src="./AppFilterTable.js" />
<style lang="scss" src="./AppFilterTable.scss" />
