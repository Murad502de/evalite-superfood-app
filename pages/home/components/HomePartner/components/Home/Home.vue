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
          AppFilterTable.home--sales-filter(
            @apply="applyFilterSD",
            @reset="resetFilterSD"
          )
            .home--sales-filter-directs
              AppPickerDate.home--sales-filter__field(
                :range="true",
                :value="filterSDDate",
                @ok="setFilterSDDate"
              )

              AppTextField.home--sales-filter__field(
                v-model="filterSDName",
                :disabled="salesDirectsFilterDisabled",
                label="Название",
                outlined
              )

              AppSelect.home--sales-filter__field(
                v-model="filterSDStatus",
                :disabled="salesDirectsFilterDisabled",
                :items="salesStatuses",
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
              :loading="SDLoading",
              :loading-text="'Данные загружаются'",
              :server-items-length="salesDirectsItemsLength",
              @update:options="updateSDOptions"
            )
              template(v-slot:item.status="{ item }")
                AppStatus(:status="item.status")

        v-window-item.home--window-item
          AppFilterTable.home--sales-filter(
            @apply="applyFilterSB",
            @reset="resetFilterSB"
          )
            .home--sales-filter-bonusses
              AppPickerDate.home--sales-filter__field(
                :range="true",
                :value="filterSBDate",
                @ok="setFilterSBDate"
              )

              AppTextField.home--sales-filter__field(
                v-model="filterSBName",
                :disabled="salesDirectsFilterDisabled",
                label="Название",
                outlined
              )

              AppTextField.home--sales-filter__field(
                v-model="filterSBPartner",
                :disabled="salesDirectsFilterDisabled",
                label="Партнер",
                outlined
              )

              AppTextField.home--sales-filter__field(
                v-model="filterSBLevel",
                :disabled="salesDirectsFilterDisabled",
                label="Уровень",
                outlined
              )

              AppSelect.home--sales-filter__field(
                v-model="filterSBStatus",
                :disabled="salesDirectsFilterDisabled",
                :items="salesStatuses",
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
              :loading-text="'Данные загружаются'",
              :server-items-length="salesBonussesItemsLength"
              @update:options="updateSBOptions"
            )
              template(v-slot:item.status="{ item }")
                AppStatus(:status="item.status")

        v-window-item.home--window-item
          AppFilterTable.home--sales-filter(
            @apply="applyFilterP",
            @reset="resetFilterP"
          )
            .home--sales-filter-payouts
              AppPickerDate.home--sales-filter__field(
                :range="true",
                :value="filterPDate",
                @ok="setFilterPDate"
              )

              AppSelect.home--sales-filter__field(
                v-model="filterPStatus",
                :disabled="salesDirectsFilterDisabled",
                :items="payoutsStatuses",
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
              :loading-text="'Данные загружаются'",
              :server-items-length="payoutsItemsLength"
              @update:options="updatePOptions"
            )
              template(v-slot:item.status="{ item }")
                AppStatus(:status="item.status")
</template>

<script src="./Home.js" />
<style lang="scss" src="./Home.scss" />
