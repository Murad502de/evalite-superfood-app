<template lang="pug">
.app-form-media-doc(:class="[`app-form-media-doc__type-${getDocType()}`]")
  .app-form-media-doc__container
    AppFormMediaDocDesktop.app-form-media-doc__desktop(
      :disabled="disabled",
      @upload="upload"
    )
    AppFormMediaDocMobile.app-form-media-doc__mobile(
      :disabled="disabled",
      @upload="upload"
    )

    .app-form-media-doc-file
      .app-form-media-doc-file__name {{ mediaName || mediaNameDefault }}

      .app-form-media-doc-file__media
        PdfLogoSvg.app-form-media-doc-file__media--img(
          v-if="type === 'pdf'",
          width="190",
          height="260"
        )
        DocLogoSvg.app-form-media-doc-file__media--img(
          v-else,
          width="190",
          height="260"
        )

      .app-form-media-doc-file__preview(v-show="!!mediaUrl", @click="openFile")
        .app-form-media-doc-file__preview-title Просмотреть

      .app-form-media-doc-file__delete(v-show="!!mediaUrl", @click="deleteFile")
        TrashIconSvg.app-form-media-doc-file__delete-icon
        .app-form-media-doc-file__delete-title Удалить
</template>

<script src="./AppFormMediaDoc.js" />
<style lang="scss" src="./AppFormMediaDoc.scss" />
