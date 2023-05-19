<template lang="pug">
.the-side-bar-bottom
  .the-side-bar-bottom__container
    .the-side-bar-bottom__links
      AppSideBarLink.the-side-bar-bottom__link(
        v-for="(link, index) in links",
        :key="index",
        v-if="!link.hidden",
        :iconName="link.iconName",
        :title="link.title",
        :active="link.active",
        @click="onLinkClicked(link)"
      )
</template>

<script src="./TheSideBarBottom.js" />
<style lang="scss" src="./TheSideBarBottom.scss" />
