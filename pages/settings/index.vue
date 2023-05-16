<template lang="pug">
.ruqi-settings
  .ruqi-settings__container
    AppCard
      .ruqi-settings--top-bar
        AppButton.ruqi-settings--save сохранить изменения
      v-form.ruqi-settings--form(ref="form", v-model="valid", lazy-validation)
        v-text-field(
          v-model="amocrmSubdomain",
          :rules="amocrmSubdomainRules",
          :disabled="loading",
          label="amocrm субдомен",
          required,
          outlined
        )

        v-text-field(
          v-model="amocrmRedirectUri",
          :rules="amocrmRedirectUriRules",
          :disabled="loading",
          label="amocrm адрес редиректа",
          required,
          outlined
        )

        v-text-field(
          v-model="amocrmClientSecret",
          :rules="amocrmClientSecretRules",
          :disabled="loading",
          label="amocrm секретный ключ интеграции",
          required,
          outlined
        )

        v-text-field(
          v-model="amocrmUtmSourceId",
          :rules="amocrmUtmSourceIdRules",
          :disabled="loading",
          label="amocrm id поля utm_source",
          required,
          outlined
        )

        v-text-field(
          v-model="personalLinkHost",
          :rules="personalLinkHostRules",
          :disabled="loading",
          label="хост персональной ссылки реферала",
          required,
          outlined
        )

        v-text-field(
          v-model="minPayout",
          :rules="minPayoutRules",
          :disabled="loading",
          label="минимальная сумма вывода",
          required,
          outlined
        )

        v-text-field(
          v-model="percentage",
          :rules="percentageRules",
          :disabled="loading",
          label="процентаж прямых продаж",
          required,
          outlined
        )

        .ruqi-settings--percentage-levels
          .ruqi-settings--percentage-levels__title Процентаж связанных продаж
          .ruqi-settings--percentage-levels__levels
            .ruqi-settings--percentage-levels__level(
              v-for="(percentageLevel, index) in percentageLevels",
              :key="percentageLevel.uuid"
            )
              v-text-field.ruqi-settings--percentage-levels__level-field(
                v-model="percentageLevel.percentage",
                :rules="percentageRules",
                :disabled="loading",
                :label="`процентаж уровня ${index + 1}`",
                required,
                outlined
              )
              v-icon.ruqi-settings--percentage-levels__level-delete(
                @click="deletePercentageLevel(percentageLevel.uuid)"
              ) mdi-delete
          AppButton.ruqi-settings--percentage-levels__add(
            @click="addPercentageLevel"
          ) Добавить
</template>

<script src="./settings.js" />
<style lang="scss" src="./settings.scss" />
