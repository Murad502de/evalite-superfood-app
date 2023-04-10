<template lang="pug">
.app-form-media-desktop
  AppUploadFileDrop.app-form-media-desktop__drop(:disabled="disabled")
  .app-form-media-desktop__title {{ title }}
  AppUploadFile.app-form-media-desktop__file(:disabled="disabled")
</template>

<script src="./AppFormMediaDesktop.js" />
<style lang="scss" src="./AppFormMediaDesktop.scss" />
