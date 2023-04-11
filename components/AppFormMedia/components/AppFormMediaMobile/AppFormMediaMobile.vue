<template lang="pug">
.app-form-media-mobile
  .app-form-media-mobile__title Загрузите документ
  .app-form-media-mobile__files
    AppUploadFileCamera.app-form-media-mobile__file(
      :disabled="disabled",
      @upload="upload"
    )
    AppUploadFile.app-form-media-mobile__file(
      :disabled="disabled",
      @upload="upload"
    )
</template>

<script src="./AppFormMediaMobile.js" />
<style lang="scss" src="./AppFormMediaMobile.scss" />
