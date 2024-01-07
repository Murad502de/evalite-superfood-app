<template lang="pug">
AppCard.personal-card
  Stub.personal-card__stub(v-if="loading", hideStatus)
  .personal-card__card(v-else)
    .personal-card__header
      AppAvatar.personal-card__avatar(:url="avatar", disabled, size="64")
      .personal-card__name {{ name }}
      .personal-card__invite-code {{ inviteCode }}
      .personal-card__edit(
        :class="{ 'personal-card__edit_disabled': disabled }",
        @click="edit"
      ) Изменить профиль

      .personal-card__status(v-if="!hideStatus")
        component.personal-card__status-icon(:is="getVerificationStatusIcon()")
        .personal-card__status-title {{ getVerificationStatusTitle() }}

    v-divider.personal-card__divider

    .personal-card__main
      .personal-card__infos
        .personal-card__info(v-for="(info, index) in infos", :key="index")
          .personal-card__info-title {{ info.title }}
          .personal-card__info-value {{ info.value }}

    .personal-card__footer
      v-divider.personal-card__divider(v-if="!hideSubmitBtn")
      AppButton(
        v-if="!hideSubmitBtn",
        :loading="submitLoading",
        @click="submit"
      ) Отправить на проверку
</template>

<script src="./PersonalCard.js" />
<style lang="scss" src="./PersonalCard.scss" />
