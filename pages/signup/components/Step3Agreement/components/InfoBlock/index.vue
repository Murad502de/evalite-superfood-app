<template lang="pug">
.agreement-info-block
  component.agreement-info-block__icon(:is="getIconCmpName({ name: icon })")
  .agreement-info-block__title {{ title }}
  .agreement-info-block__text {{ text }}
</template>

<script src="./InfoBlock.js" />
<style lang="scss" src="./InfoBlock.scss" />
