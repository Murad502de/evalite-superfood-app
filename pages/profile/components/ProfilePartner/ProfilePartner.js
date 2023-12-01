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
    ...mapActions('userStore', ['setUserData']),
    updateAvatar(value) {
      console.debug('ProfilePartner/updateAvatar', value); //DELETE
    },
    updateSecondName(value) {
      console.debug('ProfilePartner/updateSecondName', value); //DELETE
      this.setUserData({ secondName: value, });
    },
    updateFirstName(value) {
      console.debug('ProfilePartner/updateFirstName', value); //DELETE
      this.setUserData({ firstName: value, });
    },
    updateThirdName(value) {
      console.debug('ProfilePartner/updateThirdName', value); //DELETE
      this.setUserData({ thirdName: value, });
    },
    updateGender(value) {
      console.debug('ProfilePartner/updateGender', value); //DELETE
      this.setUserData({ gender: value, });
    },
    updateBirthday(value) {
      console.debug('ProfilePartner/updateBirthday', value); //DELETE
    },
    updateEmail(value) {
      console.debug('ProfilePartner/updateEmail', value); //DELETE
    },
    updatePhone(value) {
      console.debug('ProfilePartner/updatePhone', value); //DELETE
    },
    updatePassword(value) {
      console.debug('ProfilePartner/updatePassword', value); //DELETE
    },
  },
  created() { },
  mounted() { },
};
