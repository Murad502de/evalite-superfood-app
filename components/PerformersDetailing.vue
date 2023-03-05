<template>
  <div class="text-center performers-detailing">
    <v-dialog
      v-model="isDialogOpen"
      width="944"
      content-class="js-performers-detailing__dialog"
    >
      <v-card class="kunde-card">
        <div class="wrapper">
          <div class="kunde-card__header">
            <div class="wrapper">
              <div class="user">
                <div class="profil-bild">
                  <div class="photo">
                    <img src="/img/icon-performer.png" alt="mail">
                  </div>

                  <div class="bewertung">
                    <div class="wrapper">
                      <div class="icon">
                        <v-icon class="ic-item">mdi-star</v-icon>
                      </div>

                      <div class="wert">
                        {{ contractor.rating }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="nutzer-info">
                  <div class="verpackung">
                    <div class="name">
                      <div class="text">
                        {{ `${contractor.firstname} ${contractor.lastname}` }}
                      </div>
                    </div>

                    <div :class="[ 'status', { 'aktiv' : true, 'nicht-aktiv' : false, } ]">
                      <div v-if="true" class="status-text">активен</div>

                      <div v-if="false" class="status-text">не активен</div>
                    </div>
                  </div>
                  <div class="id">
                    <div class="ic-title">ID </div>

                    <div class="id-text">553262</div>
                  </div>
                </div>
              </div>

              <div class="send-message-btn">
                <div class="btn-text">отправить сообщение</div>
              </div>
            </div>
          </div>

          <div class="kunde-card__body">
            <v-tabs
              v-model="tab"
              class="kunde-card__tabs"
              light
            >
              <v-tab>Категория</v-tab>
              <v-tab>Категория</v-tab>
            </v-tabs>

            <div class="kunde-information-karten">
              <div class="kunde-information-karte allgemein">
                <div class="header">
                  <div class="wrapper">
                    <div class="k-title">
                      <div class="k-text">Общая информация</div>
                    </div>

                    <div class="action bearbeiten">
                      <div class="text">
                        Редакировать
                      </div>
                    </div>
                  </div>
                </div>

                <div class="body">
                  <div class="einstellungen">
                    <div class="parameter">
                      <div class="p-name">ФИО</div>

                      <div class="p-value">
                        {{ contractor.fullname }}
                      </div>
                    </div>

                    <div class="parameter">
                      <div class="p-name">Номер телефона</div>

                      <div class="p-value">
                        {{ contractor.phone }}
                      </div>
                    </div>

                    <div class="parameter">
                      <div class="p-name">Гражданство</div>

                      <div class="p-value">
                        {{ contractor.citizenship }}
                      </div>
                    </div>

                    <div class="parameter">
                      <div class="p-name">Telegram</div>
                        {{ contractor.telegram }}
                      <div class="p-value">

                      </div>
                    </div>

                    <div class="parameter">
                      <div class="p-name">Адрес</div>

                      <div class="p-value address">
                        {{ contractor.address }}
                      </div>
                    </div>

                    <div class="parameter">
                      <div class="p-name">Whatsapp</div>

                      <div class="p-value">
                        {{ contractor.whatsapp }}
                      </div>
                    </div>

                    <div class="parameter">
                      <div class="p-name"></div>

                      <div class="p-value"></div>
                    </div>

                    <div class="parameter">
                      <div class="p-name">Email</div>

                      <div class="p-value">
                        {{ contractor.email }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="kunde-information-karte zusaetzlich">
                <div class="header">
                  <div class="wrapper">
                    <div class="k-title">
                      <div class="k-text">Дополнительная информация</div>
                    </div>

                    <div class="action bearbeiten">
                      <div class="text">
                        Редакировать
                      </div>
                    </div>
                  </div>
                </div>

                <div class="body">
                  <div class="einstellungen">
                    <div class="p-col">
                      <div class="parameter">
                        <div class="p-name">Медицинская книжка</div>

                        <div class="p-value">
                          {{ contractor.medical_book }}
                        </div>
                      </div>

                      <div class="parameter">
                        <div class="p-name">Судимость</div>

                        <div class="p-value">
                          {{ contractor.criminal_record }}
                        </div>
                      </div>

                      <div class="parameter">
                        <div class="p-name">Судимость</div>

                        <div class="p-value">Без судимости</div>
                      </div>
                    </div>

                    <div class="p-col">
                      <div class="parameter">
                        <div class="p-name">Специализация</div>

                        <div class="p-value">
                          <div class="specialization-list">
                            <div class="specialization-item" v-for="specialization in contractor.specializations" :key="specialization-uuid">
                              <div class="s-text">
                                {{ specialization.name }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="parameter">
                        <div class="p-name">Судимость</div>

                        <div class="p-value">Без судимости</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

  export default {
    components  : {},

    props : {},

    computed : {
      ...mapGetters( 'performersDetailing', [ 'isDialogOpen', ] ),
      ...mapGetters( 'contractors', [ 'contractor', ] ),
    },

    data ()
    {
      return {
        tab: null,
      }
    },

    methods: {
      ...mapActions( 'performersDetailing', [ 'setStateDialog', ] ),
      ...mapActions( 'contractors', [ 'resetContractor', ] ),

      handlers ()
      {
        return {
          backToApp : () => {
            console.debug( "backToApp" );
            this.$emit( 'close' );
          }
        }
      },

      helpers ( params = {} )
      {
        return {
          has : ( nodeList, element ) => {
            let classList = element.className.split( ' ' );

            classList[ 0 ] = '.' + classList[ 0 ];

            let selector = classList.join( '.' );

            return selector !== '.' ? Array.from( nodeList ).filter( e => e.querySelector( selector ) ) : [];
          },
        }
      },

      bindActions ( params = {} )
      {
        document.addEventListener(
					'mousedown',

					( e ) => {
            if (
              !( e.target.classList.value === 'user-name' )
                &&
              !( e.target.classList.value.includes( "js-performers-detailing__dialog" ) )
            )
            {
              const nodeList  = document.querySelectorAll( `.js-performers-detailing__dialog` );
              const element   = e.target;

              let isTargetNodeList = this.helpers().has( nodeList, element ).length;

              if ( !isTargetNodeList )
              {
                console.debug( 'close dialog' ); // FIXME // TODO es muss später entfernt werden

                this.setStateDialog( false )
                this.resetContractor();
              }
            }
					}
				);
      },
    },

    mounted ()
    {
      this.bindActions();
    },
  }
</script>

<style lang="scss">

  /* OBJECTS STYLES START */
  .performerOverlay {
    width   : max-content;
    height  : max-content;
    .v-overlay__content {
      width     : 100%;
      height    : 100%;
      overflow  : hidden;;
    }
  }

  .kunde-card {
    .wrapper {
      .kunde-card__header {
        background-color  : #F6FBFF;
        padding           : 40px 100px 44px 24px;

        .wrapper {
          display         : flex;
          flex-direction  : row;
          flex-wrap       : nowrap;
          align-content   : center;
          justify-content : space-between;
          align-items     : center;

          .user {
            display         : flex;
            flex-direction  : row;
            flex-wrap       : nowrap;
            align-content   : center;
            justify-content : flex-start;
            align-items     : center;

            .profil-bild {
              display: flex;
              flex-direction: column;
              flex-wrap: nowrap;
              align-content: center;
              justify-content: center;
              align-items: center;

              .photo {
                text-align  : center;
              }

              .bewertung {
                background    : #FFFFFF;
                border        : 1px solid #E0E0E0;
                box-sizing    : border-box;
                box-shadow    : 0px 6px 73px rgba(0, 0, 0, 0.07);
                border-radius : 15px;
                margin-top    : -15px;

                .wrapper {
                  padding : 5px 12px;

                  .icon {
                    .ic-item {
                      color : gold;
                    }
                  }

                  .wert {
                    margin-left : 8px;
                  }
                }
              }
            }

            .nutzer-info {
              margin-left : 20px;

              .verpackung, .id {
                display         : flex;
                flex-direction  : row;
                flex-wrap       : nowrap;
                align-content   : center;
                justify-content : flex-start;
                align-items     : center;
              }

              .verpackung {
                margin-bottom : 8px;

                .name {
                  .text {
                    font-weight : bold;
                    font-size   : 24px;
                    line-height : 125%;
                    color       : #263043;
                  }
                }

                .status {
                  display         : flex;
                  flex-direction  : row;
                  justify-content : center;
                  align-items     : center;
                  padding         : 4px 8px;
                  margin-left     : 15px;
                  box-sizing      : border-box;
                  border-radius   : 5px;

                  .status-text {
                    font-weight     : 600;
                    font-size       : 14px;
                    line-height     : 125%;letter-spacing: 0.02em;
                    text-transform  : uppercase;
                  }

                  &.aktiv {
                    background  : #DDF7F1;
                    border      : 1px solid #6EC7A4;

                    .status-text {
                      color : #6EC7A4;
                    }
                  }

                  &.nicht-aktiv {
                    background  : #FFF0F0;
                    border      : 1px solid #D93025;

                    .status-text {
                      color : #D93025;
                    }
                  }
                }
              }

              .id {
                .id-text {
                  margin-left : 5px;
                }
              }
            }
          }
        }
      }

      .kunde-card__body {
        padding : 35px 100px 80px 24px;

        .kunde-card__tabs {
          & > div[ role = "tablist" ] {
            border-bottom : 1px solid #7A91A9;
          }

          margin-bottom : 44px;
        }

        .kunde-information-karten {
          .kunde-information-karte {
            border        : 1px solid #E4E9EE;
            box-sizing    : border-box;
            border-radius : 30px;

            .header {
              border-bottom : 1px solid #7A91A9;
              padding       : 21px 61px 0px 24px;

              .wrapper {
                display         : flex;
                flex-direction  : row;
                flex-wrap       : nowrap;
                align-content   : center;
                justify-content : space-between;
                align-items     : center;
                margin-bottom   : 17px;

                .k-title {
                  .k-text {
                    font-weight : bold;
                    font-size   : 18px;
                    line-height : 125%;
                  }
                }

                .bearbeiten {
                  .text {
                    font-weight : 600;
                    font-size   : 14px;
                    line-height : 125%;
                    color       : #0082DE;
                  }
                }
              }
            }

            .body {
              padding : 24px 61px 24px 24px;
            }

            &.allgemein {
              margin-bottom : 24px;
            }

            &.zusaetzlich {}
          }
        }
      }
    }
  }

  .einstellungen {
    display               : grid;
    grid-template-columns : 50% 50%;
  }

  .parameter {
    font-weight   : 600;
    font-size     : 16px;
    line-height   : 125%;
    margin-bottom : 24px;

    .p-name {
      color         : #7A91A9;
      margin-bottom : 8px;
    }

    .p-value {
      color : #263043;
    }
  }

  .specialization-list {
    display         : flex;
    flex-direction  : row;
    flex-wrap       : wrap;
    align-content   : center;
    justify-content : flex-start;
    align-items     : center;

    .specialization-item {
      padding       : 6px 16px;
      margin-right  : 8px;
      margin-bottom : 8px;
      background    : #F1F9FF;
      border-radius : 19px;

      &:last-child {
        margin-right : 0;
      }

      .s-text {
        font-weight     : 600;
        font-size       : 12px;
        line-height     : 125%;
        letter-spacing  : 0.02em;
        text-transform  : uppercase;
        color           : #0082DE;
      }
    }
  }

  .send-message-btn {
    padding       : 12px 8px;
    background    : #0082DE;
    border-radius : 8px;

    .btn-text {
      font-weight     : bold;
      font-size       : 14px;
      line-height     : 125%;
      text-transform  : uppercase;
      color           : #FFFFFF;
    }
  }

  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */

    .address {
      max-width : 333px;
    }

  /* MIXINS STYLES END */

</style>
