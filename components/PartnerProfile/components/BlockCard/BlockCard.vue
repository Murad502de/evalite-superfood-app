<template lang="pug">
AppCard.block-card
  .block-card__header
    .block-card__title {{ title }}
    .block-card__title-edit(v-if="!disabled", @click="edit") Изменить

  v-divider.block-card__divider

  .block-card__main
    .block-card__field(v-for="(item, index) in items", :key="index")
      .block-card__field-title {{ item.title }}
      .block-card__field-value {{ item.value }}
    slot
</template>

<script src="./BlockCard.js" />
<style lang="scss" src="./BlockCard.scss" />
