import { mapGetters, mapActions, } from 'vuex';
import * as textContent from './shared/textContent';
import PartnerProfile from '@/components/PartnerProfile/PartnerProfile.vue';

export default {
  components: {
    PartnerProfile,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters('userStore', ['userData']),
    title() {
      return textContent.title;
    },
  },
  watch: {},
  methods: {
    updateAvatar(value) {
      console.debug('update:avatar', value); //DELETE
    },
    updateSecondName(value) {
      console.debug('update:second_name', value); //DELETE
    },
    updateFirstName(value) {
      console.debug('update:first_name', value); //DELETE
    },
    updateThirdName(value) {
      console.debug('update:third_name', value); //DELETE
    },
    updateGender(value) {
      console.debug('update:gender', value); //DELETE
    },
    updateBirthday(value) {
      console.debug('update:birthday', value); //DELETE
    },
    updateEmail(value) {
      console.debug('update:email', value); //DELETE
    },
    updatePhone(value) {
      console.debug('update:phone', value); //DELETE
    },
  },
  created() { },
  mounted() { },
};
