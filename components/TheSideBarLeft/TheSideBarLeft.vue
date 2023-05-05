<template lang="pug">
.the-side-bar-left
  .the-side-bar-left__top
    Logo.the-side-bar-left__logo
    .the-side-bar-left__links
      Link.the-side-bar-left__link(
        v-for="(link, index) in linksTop",
        :key="index",
        v-if="!link.hidden",
        :iconName="link.iconName",
        :title="link.title"
        @click="onLinkClicked(link)"
      )

  .the-side-bar-left__bottom
    .the-side-bar-left__links
      Link.the-side-bar-left__link(
        v-for="(link, index) in linksBottom",
        :key="index",
        v-if="!link.hidden",
        :iconName="link.iconName",
        :title="link.title",
        @click="onLinkClicked(link)"
      )
</template>

<script src="./TheSideBarLeft.js" />
<style lang="scss" src="./TheSideBarLeft.scss" />
