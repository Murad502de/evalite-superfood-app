<template>
  <div>
    <Header
      :content="title"
      :size="title_size"
      :isnew="false"
      :isback="false"
    />
    <v-tabs v-model="tab" class="form-tabs">
      <v-tab
        v-for="(item, index) in tabs_list"
        :key="index"
        @click="selectData(item.id)"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-row no-gutters class="mt-8 row-auto table-filter-row">
      <v-col cols="6">
        <v-btn
          text
          height="48"
          outlined
          class="btn-blue"
          href="/employees/create"
        >
          СОЗДАТЬ НОВОГО СОТРУДНИКА
        </v-btn>
      </v-col>
      <!--<v-col cols="6" class="d-flex justify-end">
        <v-select
          :items="sortFiled"
          v-model="sortFieldValue"
          outlined
          label="Сортировка"
          item-text="name"
          item-value="uuid"
          @change="filter()"
        ></v-select>
        <v-select
          :items="sortType"
          v-model="sortTypeValue"
          outlined
          label="Тип сортировки"
          item-text="name"
          item-value="uuid"
          @change="filter()"
        ></v-select>
      </v-col>-->
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="table-list-style">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="employees"
            class="elevation-0"
            item-key="uuid"
            :page.sync="page"
            :items-per-page="itemsPerPageTable"
            @page-count="pageCount = $event"
            hide-default-footer
            show-select
          >
            <template v-slot:item.firstname="{ item }">
              <div @click="openRequest(item.uuid)">
                <UserAvatar
                  :first_name="item.firstname"
                  :last_name="item.lastname"
                  :color="avatarColor"
                  :radius="avatarBorderRadius"
                />
              </div>
            </template>

            <template v-slot:item.phone="{ item }">
              <div class="color-black">
                {{ item.phone }}
              </div>
            </template>

            <template v-slot:item.efficiency="{ item }">
              <Efficiency :efficiency="item.efficiency" />
            </template>

            <template v-slot:item.actions="{ item }">
              <v-menu bottom rounded="10" offset-y nudge-bottom="10" left>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item-content class="justify-start">
                    <div class="mx-auto text-left">
                      <nuxt-link :to="'/employees/' + item.uuid + '/edit'">
                        <span>Редактировать</span>
                      </nuxt-link>
                      <v-divider class="my-3"></v-divider>
                      <a
                        href="#"
                        @click.prevent="
                          removeRequest({
                            requestId: [item.uuid],
                            params: postBody,
                          })
                        "
                        >Удалить</a
                      >
                    </div>
                  </v-list-item-content>
                </v-card>
              </v-menu>
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
    title: "Сотрудники",
  },
  data() {
    return {
      title: "Сотрудники",
      title_size: "big",
      title_create: false,
      title_page_create: "create",
      sortType: [
        { name: "По возрастанию", uuid: "asc" },
        { name: "По убыванию", uuid: "desc" },
      ],
      sortFiled: [
        { name: "Имя", uuid: "name" },
        { name: "Объекты", uuid: "objects" },
        { name: "Заявки", uuid: "tasks" },
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      avatarColor: "#36B368",
      headers: [
        { text: "Имя", align: "start", value: "firstname" },
        { text: "Телефон", value: "phone" },
        { text: "объекты", value: "objects" },
        { text: "заявки", value: "tasks" },
        { text: "эффективность", value: "efficiency" },
        { text: "", value: "actions", sortable: false, align: "right" },
      ],
      tabs_list: [
        { title: "Диспетчеры", id: "dispatcher" },
        { title: "Менеджеры", id: "manager" },
      ],
      tab: 0,
      sortTypeValue: "asc",
      sortFieldValue: "name",
      avatarBorderRadius: "rounded",
      typeEmployees: "dispatcher",
    };
  },
  created() {},
  methods: {
    ...mapActions("employees", ["fetchEmployees"]),
    ...mapActions("employees", ["removeRequest"]),
    ...mapActions("breadcrumbs", ["initBreadcrumbs",]),

    openRequest(id) {
      this.$router.push("/employees/" + id);
    },
    selectData(type) {
      this.typeEmployees = type;
      this.filter();
    },
    filter() {
      const newRequet = this.postBody;
      this.fetchEmployees(newRequet);
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },
    setCurrentPage(value) {
      this.page = value;
    },
  },
  computed: {
    employees() {
      return this.$store.getters["employees/employees"];
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
        type: this.typeEmployees,
      };
      console.log(postBody);
      return postBody;
    },
  },

  created() {
    this.initBreadcrumbs(this.$route.fullPath);
  },
  async mounted() {
    await this.fetchEmployees({ type: "dispatcher" });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/colors";

.v-divider {
  margin: 24px 0;
}
</style>
