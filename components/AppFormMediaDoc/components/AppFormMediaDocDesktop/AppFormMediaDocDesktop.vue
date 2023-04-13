<template lang="pug">
.app-form-media-desktop
  AppUploadFileDrop.app-form-media-desktop__drop(
    :disabled="disabled",
    @upload="upload"
  )
  .app-form-media-desktop__title {{ title }}
  AppUploadFile.app-form-media-desktop__file(
    :disabled="disabled",
    @upload="upload"
  )
</template>

<script src="./AppFormMediaDocDesktop.js" />
<style lang="scss" src="./AppFormMediaDocDesktop.scss" />
