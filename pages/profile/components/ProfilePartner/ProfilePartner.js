import { mapGetters, mapActions, } from 'vuex';
import { createUploadedFileUrl } from '@/utils/file.js';
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
      console.debug('ProfilePartner/updateAvatar/url', createUploadedFileUrl(value)); //DELETE
      this.setUserData({
        avatarFile: value,
        avatar: createUploadedFileUrl(value),
      });
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
      this.setUserData({ birthday: value, });
    },
    updateEmail(value) {
      console.debug('ProfilePartner/updateEmail', value); //DELETE
      this.setUserData({ email: value, });
    },
    updatePhone(value) {
      console.debug('ProfilePartner/updatePhone', value); //DELETE
      this.setUserData({ phone: value, });
    },
    updatePassword(value) {
      console.debug('ProfilePartner/updatePassword', value); //DELETE
      this.setUserData({ password: value, });
    },
  },
  created() { },
  mounted() { },
};
