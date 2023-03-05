<template>
  <div>
    <Header
      :content="title"
      :size="title_size"
      :isnew="false"
      :isback="false"
    />

    <v-row no-gutters class="table-filter-row large row-auto">
      <v-col cols="12" class="d-flex">
        <FTypeDatePeriod name="period" @updateFiled="updateFiled" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="table-list-style-nospacing">
          <v-data-table
            v-model="selectedItems"
            ref="dataTable"
            :headers="headers"
            :items="notifications"
            class="elevation-0"
            item-key="uuid"
            :page.sync="page"
            :items-per-page="itemsPerPageTable"
            @page-count="pageCount = $event"
            hide-default-footer
          >
            <template v-slot:item.name="{ item }">
              <div class="color-black" @click="openRequest(item.uuid)">
                <span class="request-i" :class="{ read: item.read }"></span>
                {{ item.description }}
                <div class="date-note">
                  {{ formatDate(item.created_at) }}
                </div>
              </div>
            </template>

            <template v-slot:item.type="{ item }">
              <div class="type-note">ДЛИННЫЙ ТИП УВЕДОМЛЕНИЯ</div>
            </template>

            <template v-slot:item.actions="{ item }">
              <a :href="task_link + item.task.uuid" class="link-note"
                >перейти к заявке</a
              >
            </template>
          </v-data-table>
        </div>
        <FooterTable
          :itemsPerPage="itemsPerPage"
          :pageCount="pageCount"
          :page="page"
          @setItemsPerPage="setItemsPerPage"
          @setCurrentPage="setCurrentPage"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  meta: {
    title: 'Уведомления'
  },
  data() {
    return {
      title: "Уведомления",
      title_size: "big",
      title_create: false,
      title_page_create: "create",
      defSort: [{ name: "Все", uuid: "0000" }],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      selected: [],
      headers: [
        { text: "тема", align: "start", value: "name" },
        { text: "тип", value: "type" },
        { text: "Действия", value: "actions", sortable: false },
      ],
      formValues: [],
      selectedItems: [],
      activeSelectBtn: 0,
      activeSelectAll: 0,
    };
  },
  methods: {
    ...mapActions("notifications", ["fetchNotifications"]),
    ...mapActions("notifications", ["fetchReadNotifications"]),
    ...mapActions("notifications", ["putReadNotifications"]),
    ...mapActions("breadcrumbs", ["initBreadcrumbs",]),

    openRequest(id) {
      this.$router.push("/clients/" + id);
    },
    filter() {
      const newRequet = this.postBody;
      this.fetchNotifications(newRequet);
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },
    setCurrentPage(value) {
      this.page = value;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.substring(0, 10).split("-");
      return `${day}.${month}.${year}`;
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value);

      this.filter();
    },
    selectAll(val) {
      this.activeSelectBtn = +!this.activeSelectBtn;
      if (this.activeSelectAll == 0) {
        this.$refs.dataTable.toggleSelectAll(val);
        this.activeSelectAll += 1;
      } else {
        this.$refs.dataTable.toggleSelectAll();
        this.activeSelectAll = 0;
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    task_link() {
      if (this.user.type == "contractor") {
        return "/tasks/contractor/";
      } else {
        return "/tasks/";
      }
    },
    notifications() {
      return this.$store.getters["notifications/notifications"];
    },
    read_notifications() {
      return this.$store.getters["notifications/read_notifications"];
    },
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10);
      } else {
        return 1;
      }
    },
    postBody() {
      let postBody = {
        start_date: this.formValues.period[0],
        end_date: this.formValues.period[1],
      };
      console.log(postBody);
      return postBody;
    },
    activeSelectBtnOption() {
      switch (this.activeSelectBtn) {
        case 0:
          return {
            text: "выделить все",
            icon: "mdi-checkbox-blank-circle-outline",
          };
        case 1:
          return { text: "снять выделение", icon: "mdi-check-circle-outline" };
        default:
          return {};
      }
    },
  },

  created() {
    this.initBreadcrumbs(this.$route.fullPath);
  },
  async mounted() {
    await this.fetchNotifications();
    await this.fetchReadNotifications({ read: false });
    await this.putReadNotifications(this.read_notifications);
  },
};
</script>

<style lang="scss">
@import "../assets/scss/colors";

.type-note {
  display: inline-flex;
  background: #f2f4f6;
  color: grey;
  padding: 7px 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
}

.link-note {
  text-transform: uppercase;
  font-size: 12px;
}

.date-note {
  color: $grey;
  font-weight: 600;
  margin-top: 6px;
}

.request-i {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: $blue;
  margin-right: 8px;
  border-radius: 10px;
}

.request-i.read {
  background: $grey;
}

.table-filter-row {
  .wrap-action {
    padding: 14px 16px;
    background: #e9f6ff;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;

    .selected-items {
      font-weight: 700;
      margin-right: 16px;
    }

    .v-text-field--outlined > .v-input__control > .v-input__slot {
      border-radius: 4px;
    }

    .v-input {
      margin-right: 16px;
      max-width: 238px;
    }
  }

  .bt-table-action {
    display: flex;
    align-items: center;
    margin-right: 24px;

    .v-btn {
      box-shadow: none;
      width: 40px;
      height: 40px;
      margin-right: 6px;
    }

    .text {
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      color: $grey;
    }
  }
}
</style>
