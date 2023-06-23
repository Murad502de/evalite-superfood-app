<template lang="pug">
.home
  .home__container
    .home__header
      .home__user
        AppAvatar.home__user-avatar(:url="avatarUrl", disabled, size="64")
        .home__user-info
          .home__user-name {{ userFullName }}
          .home__user-link
            .home__user-info-title Реферальная ссылка:&nbsp;
            .home__user-info-value {{ userReferralLink }}

          .home__user-invite-code
            .home__user-info-title Код приглашения:&nbsp;
            .home__user-info-value {{ userInviteCode }}

    .home__widgets
      TheWidgetIncomeReferral.home__widget(
        :amount="amount",
        :amountThreshold="amountThreshold",
        :loading="widgetIncomeReferralLoading",
        :loadingPayout="widgetIncomeReferralLoadingPayout",
        @payout="payoutReferralIncome"
      )

    .home__main
      v-tabs.home--tabs(v-model="tab")
        v-tab.home--tab Личные продажи
        v-tab.home--tab Бонусы
        v-tab.home--tab Выплаты
        //- v-tab.home--tab Архив выплат

      v-window.home--window(v-model="tab")
        v-window-item.home--window-item
          FilterTable.home--sales-filter(@apply="applySalesDirectsFilter")
            .home--sales-filter-directs
              AppTextField.home--sales-filter__field(
                v-model="salesDirectsFilterName",
                :rules="salesDirectsFilterNameRules",
                :loading="salesDirectsFilterLoading",
                :disabled="salesDirectsFilterDisabled",
                label="Название",
                outlined
              )

              AppSelect.home--sales-filter__field(
                v-model="salesDirectsFilterGender",
                :rules="salesDirectsFilterGenderRules",
                :loading="salesDirectsFilterLoading",
                :disabled="salesDirectsFilterDisabled",
                :items="['муж', 'жен']",
                label="Статус",
                outlined
              )

          AppTable(
            :page="salesDirectsPage",
            :lastPage="salesDirectsLastPage",
            :itemsPerPage="salesDirectsItemsPerPage",
            :itemsLength="salesDirectsItemsLength",
            @update:page="updateSalesDirectsPage",
            @update:itemsPerPage="updateSalesDirectsItemsPerPage"
          )
            v-data-table.elevation-1.app-table--table(
              hide-default-footer,
              mobile-breakpoint="576",
              :headers="salesDirectsHeaders",
              :items="salesDirects",
              :loading="salesDirectsLoading",
              :loading-text="'Данные загружаются'"
            )
              template(v-slot:item.status="{ item }")
                AppStatus(:status="item.status")

        v-window-item.home--window-item
          FilterTable.home--sales-filter(@apply="applySalesBonussesFilter")
            .home--sales-filter-bonusses
              AppTextField.home--sales-filter__field(
                v-model="salesDirectsFilterName",
                :rules="salesDirectsFilterNameRules",
                :loading="salesDirectsFilterLoading",
                :disabled="salesDirectsFilterDisabled",
                label="Название",
                outlined
              )

              AppTextField.home--sales-filter__field(
                v-model="salesDirectsFilterName",
                :rules="salesDirectsFilterNameRules",
                :loading="salesDirectsFilterLoading",
                :disabled="salesDirectsFilterDisabled",
                label="Уровень",
                outlined
              )

              AppSelect.home--sales-filter__field(
                v-model="salesDirectsFilterGender",
                :rules="salesDirectsFilterGenderRules",
                :loading="salesDirectsFilterLoading",
                :disabled="salesDirectsFilterDisabled",
                :items="['муж', 'жен']",
                label="Статус",
                outlined
              )

          AppTable(
            :page="salesBonussesPage",
            :lastPage="salesBonussesLastPage",
            :itemsPerPage="salesBonussesItemsPerPage",
            :itemsLength="salesBonussesItemsLength",
            @update:page="updateSalesBonussesPage",
            @update:itemsPerPage="updateSalesBonussesItemsPerPage"
          )
            v-data-table.elevation-1.app-table--table(
              hide-default-footer,
              mobile-breakpoint="576",
              :headers="salesBonussesHeaders",
              :items="salesBonusses",
              :loading="salesBonussesLoading",
              :loading-text="'Данные загружаются'"
            )
              template(v-slot:item.status="{ item }")
                AppStatus(:status="item.status")

        v-window-item.home--window-item
          FilterTable.home--sales-filter(@apply="applySalesPayoutsFilter")
            .home--sales-filter-payouts
              AppTextField.home--sales-filter__field(
                v-model="salesDirectsFilterName",
                :rules="salesDirectsFilterNameRules",
                :loading="salesDirectsFilterLoading",
                :disabled="salesDirectsFilterDisabled",
                label="Дата",
                outlined
              )

              AppSelect.home--sales-filter__field(
                v-model="salesDirectsFilterGender",
                :rules="salesDirectsFilterGenderRules",
                :loading="salesDirectsFilterLoading",
                :disabled="salesDirectsFilterDisabled",
                :items="['муж', 'жен']",
                label="Статус",
                outlined
              )

          AppTable(
            :page="payoutsPage",
            :lastPage="payoutsLastPage",
            :itemsPerPage="payoutsItemsPerPage",
            :itemsLength="payoutsItemsLength",
            @update:page="updatePayoutsPage",
            @update:itemsPerPage="updatePayoutsItemsPerPage"
          )
            v-data-table.elevation-1.app-table--table(
              hide-default-footer,
              mobile-breakpoint="576",
              :headers="payoutsHeaders",
              :items="payouts",
              :loading="payoutsLoading",
              :loading-text="'Данные загружаются'"
            )
              template(v-slot:item.status="{ item }")
                AppStatus(:status="item.status")
</template>

<script src="./Home.js" />
<style lang="scss" src="./Home.scss" />
