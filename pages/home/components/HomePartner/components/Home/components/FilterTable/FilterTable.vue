<template lang="pug">
v-expansion-panels.filter-table(flat)
  v-expansion-panel
    v-expansion-panel-header.filter-table__title Фильтры
    v-expansion-panel-content
      slot
      AppButton.filter-table__apply(@click="$emit('apply')") Применить
</template>

<script src="./FilterTable.js" />
<style lang="scss" src="./FilterTable.scss" />
