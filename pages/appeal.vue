<template lang="pug">
.appeal
  Header(:content="title", :size="title_size", :isnew="false", :isback="false")

  v-row.table-filter-row(no-gutters)
    v-col(cols="2")
      v-select(
        :items="sortRegions",
        v-model="region",
        outlined,
        hide-details="true",
        label="Ответственный",
        item-text="name",
        @change="filter('region', region)"
      )

    v-col(cols="2")
      v-select(
        :items="sortSpecializations",
        v-model="specialization",
        outlined,
        hide-details="true",
        label="Тип",
        item-text="name",
        @change="filter('specialization', specialization)"
      )

    v-col(cols="2")
      v-select(
        :items="sortActive",
        v-model="active",
        outlined,
        hide-details="true",
        label="Статус",
        item-text="title",
        @change="filter('active', active)"
      )

    v-col(cols="6")
      Search(:searchText="searchText", @updateSearchText="updateSearchText")

  v-divider

  v-row
    v-col(cols="12")
      .table-list-style
        v-data-table.elevation-0(
          v-model="selected",
          :headers="headers",
          :items="desserts",
          item-key="uuid",
          :page.sync="page",
          :items-per-page="itemsPerPageTable",
          @page-count="pageCount = $event",
          hide-default-footer
        )
          template(v-slot:item.num="{ item }")
            .d-flex.colorful_row
              .colorful_decor
              div {{ item.num }}

          template(v-slot:item.theme="{ item }")
            .color-black(@click="openRequest(item.uuid)")
              span.request-i
              span {{ item.theme }}

          template(v-slot:item.manager.firstname="{ item }")
            UserAvatar(
              :first_name="item.manager.firstname",
              :last_name="item.manager.lastname",
              :color="avatarColor",
              v-if="item.manager.firstname"
            )
            TableAssign(v-else, @assign="assign")

          template(v-slot:item.messages="{ item }")
            v-icon(width="20px", color="#7A91A9") mdi-forum-outline
            span.messages-value {{ item.messages }}

          template(v-slot:item.update="{ item }")
            v-icon(width="20px", color="#7A91A9") mdi-sync
            span.messages-value {{ item.update }}

          template(v-slot:item.to_date="{ item }")
            v-icon(width="20px", color="#7A91A9") mdi-flag-checkered
            span.messages-value {{ item.to_date }}

          template(v-slot:item.actions="{ item }")
            v-menu(bottom, rounded="10", offset-y, nudge-bottom="10", left)
              template(v-slot:activator="{ on }")
                v-btn(icon, v-on="on")
                  v-icon mdi-dots-vertical
              v-card
                v-list-item-content.justify-start
                  .mx-auto.text-left
                    a(href="#", @click.prevent="") Удалить

        FooterTable(
          :itemsPerPage="itemsPerPage",
          :pageCount="pageCount",
          :page="page",
          @setItemsPerPage="setItemsPerPage",
          @setCurrentPage="setCurrentPage"
        )

  v-row
    v-col(cols="12")
      v-dialog(
        v-model="dialog",
        fullscreen,
        hide-overlay,
        transition="dialog-bottom-transition",
        scrollable
      )
        v-card
          v-btn.close-chat(icon, @click="dialog = false")
            v-icon mdi-close
          AppealPage
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import AppealPage from "@/components/appeal/AppealPage";
import TableAssign from "@/components/UI/buttons/TableAssign";

export default {
  components: { AppealPage, TableAssign },
  meta: {
    title: 'Обращения'
  },

  async fetch({ store }) {
    if (store.getters["specializations/specializations"].length === 0) {
      await store.dispatch("specializations/fetch");
    }
    if (store.getters["dictionary/regions"].length === 0) {
      await store.dispatch("dictionary/fetchRegions");
    }
  },
  data() {
    return {
      title: "Обратная связь",
      title_size: "big",
      title_create: false,
      title_page_create: "create",
      sortSpecializations: [],
      sortRegions: [],
      sortActive: [
        { title: "Неделя", value: 1 },
        { title: "Месяц", value: 4 },
        { title: "Полгода ", value: 26 },
        { title: "Год", value: 52 },
      ],
      defSort: [{ name: "Все", uuid: "0000" }],
      specialization: "",
      region: "",
      active: "",
      searchText: "",
      selectObject: null,
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      avatarColor: "#EFCD4F",
      headers: [
        { text: "", align: "start", value: "num" },
        { text: "Тема", value: "theme" },
        { text: "", value: "messages" },
        { text: "Менеджер", value: "manager.firstname" },
        { text: "Обновлена", value: "update" },
        { text: "Выполнить до", value: "to_date" },
        { text: "", value: "actions", sortable: false, align: "right" },
      ],
      desserts: [
        {
          num: "№6439",
          uuid: "123",
          theme:
            "Таким образом реализация намеченных плановых заданий не пускают на объет игр...",
          messages: 12,
          manager: {},
          update: "22.09.21 22:00",
          to_date: "22.09.21 22:00",
        },
        {
          num: "№6439",
          uuid: "124",
          theme:
            "Таким образом реализация намеченных плановых заданий не пускают на объет игр...",
          messages: 12,
          manager: {
            firstname: "Алексей",
            lastname: "Петровский",
          },
          update: "22.09.21 22:00",
          to_date: "22.09.21 22:00",
        },
        {
          num: "№6439",
          uuid: "125",
          theme:
            "Таким образом реализация намеченных плановых заданий не пускают на объет игр...",
          messages: 259,
          manager: {
            firstname: "Сергей",
            lastname: "Смирнов",
          },
          update: "22.09.21 22:00",
          to_date: "22.09.21 22:00",
        },
        {
          num: "№6439",
          uuid: "126",
          theme:
            "Таким образом реализация намеченных плановых заданий не пускают на объет игр...",
          messages: 24,
          manager: {
            firstname: "Алексей",
            lastname: "Петровский",
          },
          update: "22.09.21 22:00",
          to_date: "22.09.21 22:00",
        },
      ],
      dialog: false,
    };
  },
  created() {
    this.sortSpecializations = this.defSort.concat(this.specializations);
    this.sortRegions = this.defSort.concat(this.regions);

    this.initBreadcrumbs(this.$route.fullPath);
  },
  methods: {
    ...mapActions("specializations", ["fetch"]),
    ...mapActions("dictionary", ["fetchRegions"]),
    ...mapActions("breadcrumbs", ["initBreadcrumbs",]),

    openRequest(uuid) {
      this.dialog = true;
    },
    updateSearchText(value) {
      this.searchText = value;
      this.fetchObjects({ name: value });
    },
    filter() {
      const newRequet = this.postBody;
      if (this.tab == 0) {
        this.fetchObjects(newRequet);
      } else if (this.tab == 1) {
        this.fetchObjectsMap(newRequet);
      }
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },
    setCurrentPage(value) {
      this.page = value;
    },
    assign() {
      console.log("Назначить");
    },
  },
  computed: {
    specializations() {
      return this.$store.getters["specializations/specializations"];
    },
    regions() {
      return this.$store.getters["dictionary/regions"];
    },
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10);
      } else {
        return 1;
      }
    },
    postBody() {
      let type;
      let specialization = this.specialization,
        region = this.region;
      if (specialization == "Все") {
        specialization = "";
      }
      if (region == "Все") {
        region = "";
      }
      if (this.tab == 1) {
        type = "map";
      }
      let postBody = {
        specialization: specialization,
        region: region,
        active: this.active,
        sort: "city",
        order: "asc",
        type: type,
      };
      console.log(postBody);
      return postBody;
    },
  },
  async mounted() {
    //await this.fetchObjects();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/colors";

.appeal {
  .messages-value {
    display: inline-block;
    margin-left: 8px;
    font-size: 14px;
    color: $grey;
  }

  .v-divider {
    margin: 24px 0;
  }

  .request-i {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #0082de;
    margin-right: 8px;
    border-radius: 10px;
  }

  .wrap-search {
    justify-content: flex-end;
    display: flex;

    .v-input {
      margin-right: 0;
    }
  }

  .table-list-style {
    .text-start {
      &:first-child {
        padding: 0;

        .colorful_row {
          align-items: center;
          height: 100%;

          .colorful_decor {
            height: 100%;
            background: #6ec7a4;
            width: 10px;
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
            left: -1px;
            margin-right: 13px;
          }
        }
      }
    }
  }
}

.close-chat {
  position: absolute;
  right: 8px;
  top: 8px;
}
</style>
