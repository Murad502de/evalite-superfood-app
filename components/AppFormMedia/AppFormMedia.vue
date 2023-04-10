<template lang="pug">
.app-form-media
  .app-form-media__container
    AppFormMediaDesktop.app-form-media__desktop(
      :disabled="!!mediaUrl",
      @upload="upload"
    )
    AppFormMediaMobile.app-form-media__mobile(
      :disabled="!!mediaUrl",
      @upload="upload"
    )

    .app-form-media-file
      .app-form-media-file__name Образец

      .app-form-media-file__stub
        slot(name="stub-img")

      .app-form-media-file__stub
        img(:src="uploadedFileUrl")

      .app-form-media-file__delete(v-show="!!mediaUrl", @click="deleteFile")
        TrashIconSvg.app-form-media-file__delete-icon
        .app-form-media-file__delete-title Удалить
</template>

<script src="./AppFormMedia.js" />
<style lang="scss" src="./AppFormMedia.scss" />
