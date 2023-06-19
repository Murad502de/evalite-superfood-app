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

        //- v-window-item.home--window-item
        //-   AppTable(
        //-     :page="payoutsCompletedPage",
        //-     :lastPage="payoutsCompletedLastPage",
        //-     :itemsPerPage="payoutsCompletedItemsPerPage",
        //-     :itemsLength="payoutsCompletedItemsLength",
        //-     @update:page="updatePayoutsCompletedPage",
        //-     @update:itemsPerPage="updatePayoutsCompletedItemsPerPage"
        //-   )
        //-     v-data-table.elevation-1.app-table--table(
        //-       hide-default-footer,
        //-       mobile-breakpoint="576",
        //-       :headers="payoutsHeaders",
        //-       :items="payoutsCompleted",
        //-       :loading="payoutsCompletedLoading",
        //-       :loading-text="'Данные загружаются'"
        //-     )
        //-       template(v-slot:item.status="{ item }")
        //-         AppStatus(:status="item.status")
</template>

<script src="./Home.js" />
<style lang="scss" src="./Home.scss" />
