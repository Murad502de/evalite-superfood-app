<template lang="pug">
AppButton.app-upload-file(
  :disabled="disabled",
  :class="{ 'app-upload-file_disabled': disabled }",
)
  label.app-upload-file--label
    FileIconSvg.app-upload-file--icon
    .app-upload-file--title загрузить из файла
    input.app-upload-file__input(ref="input", type="file" @change="selectFile")
</template>

<script src="./AppUploadFile.js" />
<style lang="scss" src="./AppUploadFile.scss" />
