<template lang="pug">
.link(:class="{ link_active: active }", @click="$emit('click')")
  component.link__icon(:is="getIcon(iconName)")
  .link__title {{ title }}
</template>

<script src="./Link.js" />
<style lang="scss" src="./Link.scss" />
