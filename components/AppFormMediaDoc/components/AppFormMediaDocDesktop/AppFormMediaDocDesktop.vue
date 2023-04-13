<template lang="pug">
.app-form-media-doc-desktop
  .app-form-media-doc-desktop__container
    AppUploadFileDrop.app-form-media-doc-desktop__drop(
      :disabled="disabled",
      @upload="upload"
    )
    .app-form-media-doc-desktop__title {{ title }}
    AppUploadFile.app-form-media-doc-desktop__file(
      :disabled="disabled",
      @upload="upload"
    )
</template>

<script src="./AppFormMediaDocDesktop.js" />
<style lang="scss" src="./AppFormMediaDocDesktop.scss" />
