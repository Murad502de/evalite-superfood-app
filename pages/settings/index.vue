<template lang="pug">
.evalite-settings
  .evalite-settings__container
    AppCard
      .evalite-settings--top-bar
        AppButton.evalite-settings--save(
          :loading="loading",
          :disabled="fetching",
          @click="save"
        ) сохранить изменения
      v-form.evalite-settings--form(ref="form", v-model="valid", lazy-validation)
        v-text-field(
          v-model="amocrmSubdomain",
          :rules="amocrmSubdomainRules",
          :disabled="loading || fetching",
          label="amocrm субдомен",
          required,
          outlined
        )

        v-text-field(
          v-model="amocrmRedirectUri",
          :rules="amocrmRedirectUriRules",
          :disabled="loading || fetching",
          label="amocrm адрес редиректа",
          required,
          outlined
        )

        v-text-field(
          v-model="amocrmClientSecret",
          :rules="amocrmClientSecretRules",
          :disabled="loading || fetching",
          label="amocrm секретный ключ интеграции",
          required,
          outlined
        )

        v-text-field(
          v-model="amocrmUtmSourceId",
          :rules="amocrmUtmSourceIdRules",
          :disabled="loading || fetching",
          label="amocrm id поля utm_source",
          required,
          outlined
        )

        v-text-field(
          v-model="personalLinkHost",
          :rules="personalLinkHostRules",
          :disabled="loading || fetching",
          label="хост персональной ссылки реферала",
          required,
          outlined
        )

        v-text-field(
          v-model="minPayout",
          :rules="minPayoutRules",
          :disabled="loading || fetching",
          label="минимальная сумма вывода",
          required,
          outlined
        )

        v-text-field(
          v-model="percentage",
          :rules="percentageRules",
          :disabled="loading || fetching",
          label="процентаж прямых продаж",
          required,
          outlined
        )

        .evalite-settings--percentage-levels
          .evalite-settings--percentage-levels__title Процентаж связанных продаж
          .evalite-settings--percentage-levels__levels
            .evalite-settings--percentage-levels__level(
              v-for="(percentageLevel, index) in percentageLevels",
              :key="percentageLevel.uuid"
            )
              v-text-field.evalite-settings--percentage-levels__level-field(
                v-model="percentageLevel.percentage",
                :rules="percentageRules",
                :disabled="loading || fetching",
                :label="`процентаж уровня ${index + 1}`",
                required,
                outlined
              )
              v-icon.evalite-settings--percentage-levels__level-delete(
                :disabled="loading || fetching",
                @click="deletePercentageLevel(percentageLevel.uuid)"
              ) mdi-delete
          AppButton.evalite-settings--percentage-levels__add(
            :disabled="loading || fetching",
            @click="addPercentageLevel"
          ) Добавить
</template>

<script src="./settings.js" />
<style lang="scss" src="./settings.scss" />
