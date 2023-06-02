<template lang="pug">
AppCard.info-block
  .info-block__container(v-show="!loading")
    .info-block__title {{ title }}
    .info-block__value {{ value }}
  AppSkeleton.info-block__skeleton(v-show="loading" height="102")
</template>

<script src="./InfoBlock.js" />
<style lang="scss" src="./InfoBlock.scss" />
