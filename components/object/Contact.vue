<template lang="pug">
  .object-responsibles
    .object-responsible-row.d-flex.justify-space-between(v-for="contact in updateContacts")
      .object-responsible-col.col-left(v-if="!isSingleNameField")
        UserAvatar(:first_name="contact.firstname" :last_name="contact.lastname" :color="avatarColor" :radius="avatarBorderRadius" size_custom="24")
        .responsible-role.after-avatar(v-if="contact.type") {{ translitRole(contact.type) }}

      .object-responsible-col.col-left(v-if="isSingleNameField")
        .responsible-name(v-if="contact.fullname") {{ contact.fullname }}
        .responsible-role(v-if="contact.position") {{ contact.position }}

      .object-responsible-col.col-right
        .responsible-phone(v-if="contact.phone") {{contact.phone}}
        .responsible-email(v-if="contact.email") {{contact.email}}


</template>

<script>
export default {
  props: ['contacts', 'isAvatar', 'isSingleNameField'],
  data() {
    return {
      updateContacts: [],
      avatarColor: '#D6D0FE',
      avatarBorderRadius: 'rounded',
    }
  },
  computed: {},
  watch: {
    contacts: function () {
      this.updateContacts = this.contacts;
    },
  },
  methods: {
    translitRole(role) {
      if (role == 'manager') {
        return 'менеджер';
      } else if (role == 'dispatcher') {
        return 'диспетчер';
      }
    },

  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.object-responsible-row {
  max-width: 400px;
  margin-bottom: 24px;

  .responsible-role {
    color: #7D838E;

    &.after-avatar{
      margin-left: 34px;
    }
  }

  .responsible-name{
    font-weight: 600;
  }

  .responsible-phone {
    font-weight: 600;
  }

  .responsible-email {
    font-weight: 600;
  }

  .object-responsible-col {
    .col-right {
      text-align: left;
    }
    &.col-right {
      text-align: right;
    }
  }

}

</style>
