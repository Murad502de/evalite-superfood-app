<template lang="pug">
.stub
  .stub__header
    AppSkeleton.stub__avatar(:height="stubHeightAvatar")
    AppSkeleton.stub__name(:height="stubHeight")
    AppSkeleton.stub__invite-code(:height="stubHeight")
    .stub__edit(:height="stubHeight") Изменить профиль

    AppSkeleton.stub__status(v-if="!hideStatus", :height="stubHeight")

  v-divider.stub__divider

  .stub__main
    .stub__infos
      .stub__info(v-for="(info, index) in infos", :key="index")
        .stub__info-title {{ info.title }}
        AppSkeleton.stub__info-value(:height="stubHeight")
</template>

<script src="./Stub.js" />
<style lang="scss" src="./Stub.scss" />
