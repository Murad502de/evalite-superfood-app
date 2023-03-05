<template>
  <div v-if="user.type != 'contractor'">
    <Header
      :content="title"
      :size="title_size"
      :isnew="isCreate"
      :isback="false"
    />

    <v-row no-gutters class="table-filter-row">
      <v-col cols="12" sm="2">
        <v-select
          :items="sortObject"
          v-model="selectObject"
          label="Обьект"
          item-text="name"
          item-value="uuid"
          outlined
          value="0000"
          @change="filter('object', selectObject)"
        ></v-select>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <div class="table-list-style">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="requests"
        class="elevation-0"
        item-key="uuid"
        :page.sync="page"
        :items-per-page="itemsPerPageTable"
        @page-count="pageCount = $event"
        hide-default-footer
      >
        <template v-slot:item.name="{ item }">
          <div @click="openRequest(item.uuid)">
            <span class="request-i"></span>
            {{ item.name }}
          </div>
        </template>

        <template v-slot:item.pay="{ item }">
          <span class="request-pay"
            >{{ item.payment.value }} {{ item.payment.current }} /
            {{ item.payment.period }}</span
          >
        </template>

        <template v-slot:item.object="{ item }">
          {{ item.object.name }}
        </template>

        <template v-slot:item.manager="{ item }">
          <UserAvatar
            :first_name="item.manager.firstname"
            :last_name="item.manager.lastname"
            :color="avatarColor"
          />
        </template>

        <template v-slot:item.term="{ item }">
          <div class="request-time">
            <img src="/img/ico_timer.svg" alt="timer" />
            {{ item.hours_left }} ч {{ item.minutes_left }} м
          </div>
        </template>

        <template v-slot:item.occupation="{ item }">
          <Occupationbar
            :completed="item.completion.completed"
            :total="item.completion.total"
          />
        </template>

        <template
          v-slot:item.actions="{ item }"
          v-if="user.type != 'dispatcher'"
        >
          <v-menu bottom rounded="10" offset-y nudge-bottom="10" left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-start">
                <div class="mx-auto text-left">
                  <nuxt-link :to="'/tasks/' + item.uuid + '/edit'">
                    <span>Редактировать</span>
                  </nuxt-link>
                  <v-divider class="my-3"></v-divider>
                  <a href="#" @click.prevent="copyRequest(item.uuid)"
                    >Копировать</a
                  >
                  <v-divider class="my-3"></v-divider>
                  <a href="#" @click.prevent="removeRequest(item.uuid)"
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
  </div>
  <div v-else>
    <Header
      content="Мои заявки"
      :size="title_size"
      :isnew="false"
      :isback="false"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  meta: {
    title: "Заявки",
  },
  data() {
    return {
      title: "Заявки",
      title_size: "big",
      title_create: true,
      title_page_create: "create",
      defSort: [{ name: "Все", uuid: "0000" }],
      selectObject: null,
      sortObject: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      avatarColor: "#EFCD4F",
      headers: [
        { text: "Название", align: "start", value: "name" },
        { text: "Оплата", value: "pay" },
        { text: "Объект", value: "object" },
        { text: "Менеджер", value: "manager" },
        { text: "Срок", value: "term" },
        { text: "Заполнение", value: "occupation" },
        { text: "", value: "actions", sortable: false, align: "right" },
      ],
    };
  },
  methods: {
    ...mapActions("requests", ['fetch', 'copyRequest', 'removeRequest']),
    ...mapActions("objects", ['fetchObjects']),
    ...mapActions("rqTabs", ['setRqTabsTaskActive',]),

    openRequest(id) {
      this.$router.push("/tasks/" + id);
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },
    setCurrentPage(value) {
      this.page = value;
    },
    filter() {
      const newRequet = this.postBody;
      this.fetch(newRequet);
    },
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    isCreate() {
      if (this.user.type == "superManager" || this.user.type == "manager") {
        return true;
      } else {
        return false;
      }
    },
    requests() {
      return this.$store.getters["requests/requests"];
    },
    objects() {
      return this.$store.getters["objects/objects"];
    },
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10);
      } else {
        return 1;
      }
    },
    postBody() {
      let object = this.selectObject;
      console.log(object);
      if (object == "0000") {
        object = "";
      }
      let postBody = {
        object: object,
        sort: "name",
        order: "asc",
      };
      console.log(postBody);
      return postBody;
    },
  },

  created() {
    this.setRqTabsTaskActive({ route: this.$route });
  },
  async mounted() {
    await this.fetch();
    await this.fetchObjects();

    this.sortObject = this.defSort.concat(this.objects);
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/colors";

.request-i {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: $green;
  margin-right: 8px;
  border-radius: 10px;
}

.request-pay {
  background: $light_blue;
  color: $blue;
  padding: 7px 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
}

.request-time {
  display: flex;
  align-items: center;
  line-height: 1;

  img {
    margin-right: 12px;
  }
}
</style>
