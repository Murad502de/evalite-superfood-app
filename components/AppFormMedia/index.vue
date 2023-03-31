<template lang="pug">
.app-form-media
  .app-form-media__container
    .app-form-media__desktop
    .app-form-media__mobile

    .app-form-media-file
      .app-form-media-file__name Образец

      .app-form-media-file__stub
        slot(name="stub-img")

      .app-form-media-file__delete Удалить
</template>

<script src="./AppFormMedia.js" />
<style lang="scss" src="./AppFormMedia.scss" />
