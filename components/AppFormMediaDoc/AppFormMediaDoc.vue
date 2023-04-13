<template lang="pug">
.app-form-media(:class="[`app-form-media__type-${getDocType()}`]")
  .app-form-media__container
    AppFormMediaDocDesktop.app-form-media__desktop(
      :disabled="disabled",
      @upload="upload"
    )
    AppFormMediaDocMobile.app-form-media__mobile(
      :disabled="disabled",
      @upload="upload"
    )

    .app-form-media-file
      .app-form-media-file__name {{ mediaName || mediaNameDefault }}

      .app-form-media-file__media
        PdfLogoSvg.app-form-media-file__media--img(
          v-if="type === 'pdf'",
          width="190",
          height="260"
        )
        DocLogoSvg.app-form-media-file__media--img(
          v-else,
          width="190",
          height="260"
        )

      .app-form-media-file__preview(v-show="!!mediaUrl", @click="openFile")
        .app-form-media-file__preview-title Просмотреть

      .app-form-media-file__delete(v-show="!!mediaUrl", @click="deleteFile")
        TrashIconSvg.app-form-media-file__delete-icon
        .app-form-media-file__delete-title Удалить
</template>

<script src="./AppFormMediaDoc.js" />
<style lang="scss" src="./AppFormMediaDoc.scss" />
