<template lang="pug">
.app-form-media-doc-mobile
  .app-form-media-doc-mobile__title Загрузите документ
  .app-form-media-doc-mobile__files
    AppUploadFile.app-form-media-doc-mobile__file(
      :disabled="disabled",
      @upload="upload"
    )
</template>

<script src="./AppFormMediaDocMobile.js" />
<style lang="scss" src="./AppFormMediaDocMobile.scss" />
