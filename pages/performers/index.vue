<template>
  <div>
    <div>
      <Header
        :content="title"
        :size="title_size"
        isnew="true"
        isnewstyle="text_btn"
        :isback="false"
      />
      <v-tabs v-model="tab" class="form-tabs">
        <v-tab v-for="(item, index) in tabs_list" :key="index">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-row no-gutters class="table-filter-row justify-space-between">
        <v-col cols="12" sm="2">
          <v-select :items="itemSort" outlined value="По рейтингу"></v-select>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex justify-end">
          <Search
            :searchText="searchText"
            @updateSearchText="onSearchInput({ $event })"
          />
        </v-col>
      </v-row>

      <div class="table-list-style">
        <v-data-table
          v-model="selected"
          show-select
          :headers="headers"
          :items="contractors"
          class="elevation-0"
          item-key="id"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          @update:sort-by="handlers().updateSortBy({ $event })"
          @update:sort-desc="handlers().updateSortDesc({ $event })"
        >
          <template v-slot:item.lastname="{ item }">
            <a href="#" @click.prevent="handlers().openPerformer(item.uuid)">
              <UserAvatar
                :first_name="item.firstname"
                :last_name="item.lastname"
                :color="avatarColor"
                :radius="avatarBorderRadius"
                :date="temp_date"
              />
            </a>
          </template>

          <template v-slot:item.value="{ item }">
            <Rating :rating="item.raiting" />
          </template>

          <template v-slot:item.location_address="{ item }">
            <div class="performer-address">
              {{ item.address }}
            </div>
          </template>

          <template v-slot:item.avg_price="{ item }">
            {{ `${item.avg_price || "0"} р. смена` }}
          </template>

          <template v-slot:item.created_at="{ item }">
            {{ helpers().parseDate({ date: item.created_at, type: "date" }) }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </div>
      <v-row no-gutters>
        <v-col cols="12" sm="2">
          <v-row class="align-center">
            <v-col cols="8" class="pa-0">
              <v-subheader>Строк на странице:</v-subheader>
            </v-col>
            <v-col cols="4" class="pa-0">
              <div class="pagination-page-num">
                <v-text-field
                  :value="itemsPerPage"
                  type="text"
                  @input="itemsPerPage = $event"
                  single-line
                  outlined
                  hide-details="true"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="10">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import UserAvatar from "@/components/UserAvatar";
import Search from "@/components/Search";

export default {
  meta: {
    title: "Исполнители",
  },
  components: { Search, UserAvatar },

  computed: {
    ...mapGetters("contractors", ["contractors"]),
  },

  data() {
    return {
      title: "Исполнители",
      title_size: "big",
      tabs_list: ["Активные", "Архив"],
      tab: null,
      itemSort: ["По рейтингу", "По дате"],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      avatarColor: "#36B368",
      headers: [
        { text: "ФИО", align: "start", value: "lastname" },
        { text: "Рейтинг", value: "value" },
        { text: "Адрес", value: "location_address" },
        { text: "Средняя ставка", value: "avg_price", sortable: false },
        { text: "Зарегистрирован", value: "created_at" },
        { text: "", value: "actions", sortable: false, align: "right" },
      ],
      rating: 4.5,
      temp_date: "26.06.1984",
      avatarBorderRadius: "rounded",
      searchText: "",

      tableSortParams: {
        // BUG sort und order müssen getauscht werden
        sort: null,
        order: null,
      },
    };
  },

  methods: {
    ...mapActions("contractors", ["getContractors", "resetContractor"]),
    ...mapActions("breadcrumbs", ["initBreadcrumbs",]),

    init() {
      this.getContractors();

      console.debug("route"); // DELETE
      console.debug(this.$route); // DELETE
    },

    helpers() {
      return {
        /**
         *
         * @param { object } params
         * {
         *    date : '2021-12-23T12:59:03.000000Z'
         * }
         */
        parseDate: (payload = {}) => {
          let splitedPayloadDate = payload.date.split("T");

          let date = splitedPayloadDate[0].split("-");
          let time = splitedPayloadDate[1].split(".")[0].split(":");

          if (payload.type === "date") {
            return `${date[2]}.${date[1]}.${date[0]}`;
          }

          if (payload.type === "time") {
            return `${time[0]}:${time[1]}`;
          }

          return `${date[2]}.${date[1]}.${date[0]} ${time[0]}:${time[1]}`;
        },
      };
    },

    handlers() {
      return {
        openPerformer: (id) => {
          this.resetContractor().then(() => {
            this.$router.push("/performers/" + id);
          });
        },

        updateSortBy: (payload = {}) => {
          console.log("updateSortBy", payload); // DELETE

          this.tableSortParams.sort = !!payload.$event.length
            ? payload.$event[0]
            : null;

          this.sortTable();
        },

        updateSortDesc: (payload = {}) => {
          console.log("updateSortDesc", payload); // DELETE

          this.tableSortParams.order = payload.$event.length
            ? payload.$event[0]
              ? "desc"
              : "asc"
            : null;

          this.sortTable();
        },
      };
    },

    updateSearchText(value) {
      this.searchText = value;
    },

    onSearchInput: _.debounce(
      function (payload = {}) {
        console.log("onSearchInput", payload); // DELETE

        this.getContractors({
          search: (this.searchText = payload.$event),
          params: this.tableSortParams,
        });
      },

      400
    ),

    sortTable: _.debounce(
      function (payload = {}) {
        console.debug("[helper]::sortTable", payload, this.tableSortParams); // DELETE

        this.getContractors({
          params: this.tableSortParams,
          search: this.searchText,
        });
      },

      200
    ),
  },

  created() {
    this.initBreadcrumbs(this.$route.fullPath);
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/colors";

.ruqi {
  .v-rating .v-icon {
    padding: 2px;
  }
}
</style>
