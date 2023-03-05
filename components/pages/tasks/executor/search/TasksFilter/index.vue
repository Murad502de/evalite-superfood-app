<template lang="pug">
.task-search-filter__index
  .task-search-filter__mobile
    mTasksFilter(
      :isFilterShowed="mFilterVisibility"
      :loader="loaderFilter"
      :regions="regions"
      :region="region"
      :professions="professions"
      :radii="radii"
      :radius="radius"
      :salary="salary"
      :medicalBook="medicalBook"
      :driverLicense="driverLicense"
      @showFilter="showMobFilter"
      @hideFilter="hideMobFilter"
      @selectRegion="selectRegion"
      @selectProfession="selectProfession"
      @selectRadius="selectRadius"
      @setSalary="setSalary"
      @setMedicalBook="setMedicalBook"
      @setDriverLicense="setDriverLicense"
      @apply="applyFilter"
      @reset="resetFilter"
    )

  .task-search-filter__desktop
    dTasksFilter(
      :loader="loaderFilter"
      :regions="regions"
      :region="region"
      :professions="professions"
      :radii="radii"
      :radius="radius"
      :salary="salary"
      :medicalBook="medicalBook"
      :driverLicense="driverLicense"
      @selectRegion="selectRegion"
      @selectProfessionDesktop="selectProfessionDesktop"
      @selectRadius="selectRadius"
      @setSalary="setSalary"
      @setMedicalBook="setMedicalBook"
      @setDriverLicense="setDriverLicense"
      @setStartDate="setStartDate"
      @apply="applyFilter"
      @reset="resetFilter"
    )
</template>

<script>
import dTasksFilter from './desktop';
import mTasksFilter from './mobile';

export default {
  components: {
    dTasksFilter,
    mTasksFilter,
  },

  props: {
    regions: {
      type: [],
      default: () => ([]),
    },
    professions: {
      type: [],
      default: () => ([]),
    },
    loaderFilter: {
      type: Boolean,
      default: false,
    },
    mFilterVisibility: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    region: null,
    radius: null,
    salary: null,
    medicalBook: false,
    driverLicense: false,
    startDate: null,
    selectedProfessions: [],

    /* DICTIONARY */
    radii: [
      {
        uuid: '1km',
        name: '1км',
        value: '1',
      },
      {
        uuid: '10km',
        name: '10км',
        value: '10',
      },
      {
        uuid: '15km',
        name: '15км',
        value: '15',
      },
    ],
  }),
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    showMobFilter() {
      this.$emit('showMobFilter', true);
    },
    hideMobFilter() {
      this.$emit('hideMobFilter', false);
    },
    selectRegion(payload = null) {
      if (payload) this.region = payload;
    },
    selectProfession(payload = null) {
      if (!payload) return;

      if (this.selectedProfessions.findIndex(profession => profession.uuid === payload.uuid) !== -1) {
        this.selectedProfessions = this.selectedProfessions.filter(profession => profession.uuid !== payload.uuid);
      } else {
        this.selectedProfessions.push(payload);
      }
    },
    selectProfessionDesktop(payload = null) {
      if (!payload) return;

      this.selectedProfessions = payload;
    },
    selectRadius(payload = null) {
      if (payload) this.radius = payload;
    },
    setSalary(payload = null) {
      this.salary = payload;
    },
    setMedicalBook(payload = null) {
      console.debug('setMedicalBook', payload, this.medicalBook); // DELETE

      this.medicalBook = payload;
    },
    setDriverLicense(payload = null) {
      console.debug('setDriverLicense', payload); // DELETE

      this.driverLicense = payload;
    },
    setStartDate(payload = null) {
      this.startDate = payload;
    },
    async applyFilter() {
      const FILTER = {
        region: this.region ? this.region.name : null,
        radius: this.radius ? this.radius.value : null,
        salary: this.salary,
        medicalBook: this.medicalBook,
        driverLicense: this.driverLicense,
        startDate: this.startDate,
        selectedProfessions: this.selectedProfessions.length
          ? this.selectedProfessions.map(profession => profession.name)
          : null,
      };

      this.$emit('apply', FILTER);
    },
    resetFilter() {
      this.region = null;
      this.radius = null;
      this.salary = null;
      this.medicalBook = false;
      this.driverLicense = false;
      this.startDate = null;
      this.selectedProfessions = [];

      this.$emit('reset');
    },

    /* HELPERS */
  },

  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.task-search-filter {
  &__index {}

  &__mobile {
    display: none;
  }

  &__desktop {
    display: block;
    max-width: 1272px;
  }

  @media screen and (max-width: 768px) {
    &__mobile {
      display: block;
    }

    &__desktop {
      display: none;
    }
  }
}
</style>
