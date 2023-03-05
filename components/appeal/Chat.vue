<template lang="pug">
  .chat-comp
    v-container
      v-row
        v-col
          div( v-for="(item, index) in chat" :key="index" :class="['d-flex my-2 content-mes', item.from == 'user' ? 'user': 'interlocutor']")
            v-avatar(:color="item.from == 'user' ? '#D6D0FE': '#EFCD4F'" size="32")
              span.white--text {{ item.from[0] }}
            div.d-flex.message
              .message-text {{ item.msg }}
              .time {{ item.time }}
            .actions(v-if="item.from != 'user'" transition="slide-x-transition")
              v-btn(icon v-on="")
                v-icon mdi-dots-horizontal
              v-btn(icon v-on="")
                v-icon mdi-reply

    v-footer
      v-container.ma-0.pa-0
        v-row(no-gutters)
          v-col
            .d-flex.flex-row.align-center
              v-text-field(v-model="msg" placeholder="Введите сообщение" @keypress.enter="send"
                single-line
                outlined
                filled
                hide-details="true")
              .mes-buttons
                v-btn(icon  @click="")
                  v-icon mdi-paperclip
                v-btn(icon  @click="")
                  v-icon mdi-image-outline

</template>

<script>

import AppealHeader from "@/components/appeal/AppealHeader";

export default {
  components: {AppealHeader},
  props: ['object',],
  data() {
    return {
      chat: [{
        from: "AA",
        msg: 'Добрый день! Возникла проблема с созданием объекта\n' +
          'Таким образом реализация намеченных плановых заданий играет важную роль в формировании форм развития.',
        time: '3 часа назад'
      },
        {
          from: "user",
          msg: 'Таким образом реализация намеченных плановых заданий играет важную роль в формировании форм развития.',
          time: '10 минут назад'
        }],
      msg: null,
    }
  },
  methods: {
    send() {
      this.chat.push(
        {
          from: "user",
          msg: this.msg,
          time: 'Только что'
        })
      this.msg = null
      this.addReply()
    },
    addReply() {
      this.chat.push({
        from: "АА",
        msg: "Ответ",
        time: 'Только что'
      })
    }
  }
}
</script>


<style lang="scss">

@import '../../assets/scss/colors';

.chat-comp {
  border: 1px solid #E4E9EE;
  border-radius: 30px;
  padding: 32px;
  max-height: calc(100vh - 400px);
  display: flex;
  flex-direction: column;

  .container{
    height: calc(100% - 130px);
    overflow: auto;
  }

  .content-mes {

    .message-text {
      background: #EDF0F3;
      border-radius: 12px;
      padding: 24px 32px;
      display: inline-flex;
      position: relative;
    }

    &.user {
      flex-direction: row-reverse;


      .message-text {
        &:after {
          content: '';
          display: block;
          position: absolute;;
          right: -16px;
          top: 24px;
          border: 8px solid transparent;
          border-left: 8px solid #EDF0F3;
        }
      }
    }

    &.interlocutor {

      .message-text {
        background: #FFEDEF;

        &:after {
          content: '';
          display: block;
          position: absolute;;
          left: -16px;
          top: 24px;
          border: 8px solid transparent;
          border-right: 8px solid #FFEDEF;
        }
      }
    }

    .v-avatar {
      margin: 13px 0 0 24px !important;
    }

    &.interlocutor {
      .v-avatar {
        margin: 13px 24px 0 0 !important;
      }
    }

    .message {
      flex-direction: column;
    }

    &.interlocutor {
      .message {
        flex-direction: column;
      }
    }

    .time {
      font-size: 14px;
      font-weight: 400;
      color: $grey;
      margin-top: 8px;
    }

    &.interlocutor {
      .time {
        text-align: right;
      }
    }

    .actions {
      max-height: calc(100% - 29px);
      display: flex;
      align-items: center;
      margin-left: 16px;
      padding-bottom: 29px;
      opacity: 0;
      transition: opacity 0.2s ease-in;

      .v-btn {
        margin: 0;

        &:before {
          border-radius: 64px;
        }
      }
    }
  }

  .content-mes:hover {
    .actions {
      opacity: 1;
    }
  }


  .v-footer {
    background: transparent;
    padding: 0;

    .v-input__slot {
      box-shadow: 0px 6px 73px rgba(0, 0, 0, 0.07);
      min-height: 125px !important;
      align-items: flex-start;
      padding: 16px !important;
    }

    .mes-buttons {
      position: absolute;
      display: flex;
      bottom: 4px;
      left: 16px;

      .v-btn {
        margin: 0
      }
    }

  }

}

</style>
