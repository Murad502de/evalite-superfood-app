<template lang="pug">
.app-upload-file
  AppButton.app-upload-file__container(
    :disabled="disabled",
    :class="{ 'app-upload-file_disabled': disabled }",
    @click="selectFile"
  )
    FileIconSvg.app-upload-file--icon
    .app-upload-file--title загрузить из файла

  input.app-upload-file__input(
    ref="input",
    type="file",
    @change="selectedFile"
  )
</template>

<script src="./AppUploadFile.js" />
<style lang="scss" src="./AppUploadFile.scss" />
