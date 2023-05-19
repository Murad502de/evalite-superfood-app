<template lang="pug">
.app-side-bar-link(:class="{ 'app-side-bar-link_active': active }", @click="$emit('click')")
  component.app-side-bar-link__icon(:is="getIcon(iconName)")
  .app-side-bar-link__title(v-if="!hideTitle") {{ title }}
</template>

<script src="./AppSideBarLink.js" />
<style lang="scss" src="./AppSideBarLink.scss" />
