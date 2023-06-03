<template lang="pug">
.home
  .home__container
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
        v-tab.home--tab Продажи
        v-tab.home--tab Бонусы
        v-tab.home--tab Активные выплаты

      v-window.home--window(v-model="tab")
        v-window-item.home--window-item
          //- AppTable(
          //-   :headers="headers",
          //-   :items="items",
          //-   :loading="loading",
          //-   :loading-text="'Данные загружаются'",
          //-   :page="page",
          //-   :lastPage="lastPage",
          //-   :itemsPerPage="itemsPerPage",
          //-   :itemsLength="itemsLength",
          //-   @click:row="openVerificationsDetailDialog",
          //-   @update:page="updatePage",
          //-   @update:itemsPerPage="updateItemsPerPage"
          //- )

        v-window-item.home--window-item
          //- AppTable(
          //-   :headers="headers",
          //-   :items="items",
          //-   :loading="loading",
          //-   :loading-text="'Данные загружаются'",
          //-   :page="page",
          //-   :lastPage="lastPage",
          //-   :itemsPerPage="itemsPerPage",
          //-   :itemsLength="itemsLength",
          //-   @click:row="openVerificationsDetailDialog",
          //-   @update:page="updatePage",
          //-   @update:itemsPerPage="updateItemsPerPage"
          //- )

        v-window-item.home--window-item
          //- AppTable(
          //-   :headers="headers",
          //-   :items="items",
          //-   :loading="loading",
          //-   :loading-text="'Данные загружаются'",
          //-   :page="page",
          //-   :lastPage="lastPage",
          //-   :itemsPerPage="itemsPerPage",
          //-   :itemsLength="itemsLength",
          //-   @click:row="openVerificationsDetailDialog",
          //-   @update:page="updatePage",
          //-   @update:itemsPerPage="updateItemsPerPage"
          //- )
</template>

<script src="./Home.js" />
<style lang="scss" src="./Home.scss" />
