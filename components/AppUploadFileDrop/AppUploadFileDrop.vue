<template lang="pug">
.app-upload-file-drop(
  @dragstart.prevent="dragStart",
  @dragleave.prevent="dragLeave",
  @dragover.prevent="dragOver",
  @drop.prevent="drop",
  :class="{ 'app-upload-file-drop_disabled': disabled }"
)
  DropIconSvg.app-upload-file-drop__icon
  .app-upload-file-drop__title(v-show="!drag") Перетащите сюда файл
  .app-upload-file-drop__title(v-show="drag") Отпустите файл
</template>

<script src="./AppUploadFileDrop.js" />
<style lang="scss" src="./AppUploadFileDrop.scss" />
