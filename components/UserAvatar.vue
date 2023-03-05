<template>
  <div class="user-plate" :class="radius">
    <div class="user-avatar">
      <v-avatar
        :color="color"
        :size="iconSize"
      >
        <span class="white--text">{{ initials }}</span>
      </v-avatar>
      <span v-if="response" class="user-response">
        <img src="/img/ico_user_arrow.svg" alt="Откликнулся">
      </span>
    </div>
    <div class="user-date">
      <span class="user-name no-wrap" @click="handlers().onUserNameClick( { uuid } )">
        <span>
          {{ first_name }}
        </span>
        <span v-if="last_name != 'undefined'">
          {{ last_name }}
        </span>
      </span>

      <span v-if="date" class="user-date">
      {{ date }}
    </span>
    </div>
  </div>


</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  props: ['first_name', 'last_name', 'color', 'radius', 'date', 'response', 'ist_detail_erlaubt', 'uuid', 'size_custom'],

  data() {
    return {}
  },

  computed: {
    ...mapGetters('performersDetailing', ['isDialogOpen',]),
    ...mapGetters('contractors', ['contractor',]),

    firstChar() {
      if (this.first_name && this.first_name.length > 1) {
        return this.first_name.substr(0, 1)
      } else {
        return '';
      }
    },

    secondChar() {
      if (this.last_name && this.last_name.length > 1) {
        return this.last_name.substr(0, 1)
      } else {
        return '';
      }
    },

    initials() {
      return this.firstChar + this.secondChar;
    },

    iconSize() {
      return this.size_custom ? this.size_custom :  32;
    },
  },

  methods: {
    ...mapActions('performersDetailing', ['setStateDialog',]),
    ...mapActions('contractors', ['getContractor',]),

    handlers() {
      return {
        onUserNameClick: (params = {}) => {
          if (this.ist_detail_erlaubt) {
            console.debug('onUserNameClick');

            this.setStateDialog(true);

            console.debug('isDialogOpen after set: ' + this.isDialogOpen);

            this.getContractor(this.uuid);
          }
        },
      }
    },
  },

  mounted() {
  },
}

</script>

<style lang="scss">

.user-plate {
  display: flex;
  align-items: center;

  .user-avatar {
    position: relative;
    display: flex;
    margin-right: 10px;

    .v-avatar {
      border-radius: 8px;
      font-size: 13px;
    }

    .user-response {
      position: absolute;
      bottom: -10px;
      right: -7px;
    }
  }

  .user-date {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
    align-items: flex-start;
    font-weight: 600;

    .user-name {
      color: #000;

    }
  }
}

.wrap-composite-state .user-plate {
  .user-avatar {
    margin-right: 8px;
  }
}

.user-plate.rounded {
  .v-avatar {
    border-radius: 50px;
  }
}


</style>
