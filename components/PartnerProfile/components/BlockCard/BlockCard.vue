<template lang="pug">
AppCard.block-card
  .block-card__header
    .block-card__title {{ title }}
    .block-card__title-edit(
      :class="{ 'block-card__title-edit_disabled': disabled }",
      @click="edit"
    ) Изменить

  v-divider.block-card__divider

  .block-card__main
    slot(name="stub", v-if="loading")
    .block-card__field(
      v-if="!loading",
      v-for="(item, index) in items",
      :key="index"
    )
      .block-card__field-title {{ item.title }}
      .block-card__field-value {{ item.value }}
    slot(v-if="!loading")
</template>

<script src="./BlockCard.js" />
<style lang="scss" src="./BlockCard.scss" />
