<template lang="pug">
.app-upload-file
  AppButton.app-upload-file__container(
    :disabled="disabled",
    :class="{ 'app-upload-file_disabled': disabled }",
    @click="selectFile"
  )
    CameraIconSvg.app-upload-file--icon
    .app-upload-file--title {{ title }}

  input.app-upload-file__input(
    ref="input",
    type="file",
    accept="image/*"
    capture="environment"
    @change="selectedFile"
  )
</template>

<script src="./AppUploadFileCamera.js" />
<style lang="scss" src="./AppUploadFileCamera.scss" />
