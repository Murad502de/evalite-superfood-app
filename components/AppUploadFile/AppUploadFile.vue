<template lang="pug">
AppButton.app-upload-file(:disabled="disabled" :class="{ 'app-upload-file_disabled': disabled }")
  FileIconSvg.app-upload-file--icon
  .app-upload-file--title загрузить из файла
</template>

<script src="./AppUploadFile.js" />
<style lang="scss" src="./AppUploadFile.scss" />
