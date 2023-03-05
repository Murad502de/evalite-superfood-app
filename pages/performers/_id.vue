<template>
  <div class="contractor-extended">
    <div class="wrapper">
      <div class="content">
        <UserMainInfo :user_type="user_type" />
        <UserAdditionalInfo :cntr_uuid="cntr_uuid" :user_type="user_type" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { CONTRACTOR } from "@/constants/";

export default {
  name: "contractor-extended",

  components: {},

  computed: {
    ...mapGetters("contractors", ["contractor"]),

    cntr_uuid() {
      return this.$route.params.id;
    },
  },

  data() {
    return {
      user_type: CONTRACTOR,
    };
  },

  methods: {
    ...mapActions("contractors", [
      "getContractor",
      "getContractorTasks",
      "getContractorInquiries",
    ]),
    ...mapActions("contractorDocs", ["getDocuments"]),
    ...mapActions("breadcrumbs", ["initBreadcrumbs",]),

    async init() {
      await this.getContractor(this.$route.params.id);

      this.$route.meta.title =
        this.contractor.firstname + " " + this.contractor.lastname;
      this.initBreadcrumbs(this.$route.fullPath);

      this.getContractorTasks({ uuid: this.$route.params.id });
      this.getContractorInquiries({ uuid: this.$route.params.id });
      this.getDocuments(this.$route.params.id);
    },

    handlers() {
      return {};
    },
  },

  mounted() {
    this.init();
  },
};
</script>


<style lang="scss" scoped>
/* OBJECTS STYLES START */
.contractor-extended {
  .wrapper {
    .content {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
    }
  }
}
/* OBJECTS STYLES END */

/* MIXINS STYLES START */
/* OBJECTS STYLES END */
</style>
