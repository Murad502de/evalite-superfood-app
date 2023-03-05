<template>
  <div
    :class="[ 'add-performers-filter-select', `js-filter-select__${slug}` ]"
  >
    <div class="wrapper">
      <div
        :class="[ 'content', `js-filter-content__${slug}` ]"
        @click="handlers().onSelectClick( { select : slug } )"
      >
        <div
          :class="[ 'f-title', `js-filter-f-title__${slug}` ]"
        >
          {{ title }}:
        </div>

        <div
          :class="[ 'selected', `js-filter-selected__${slug}` ]"
        >
          {{ selectedValue ? selectedValue : 'Все' }}
        </div>

        <div
          :class="[ 'v-input__icon', 'v-input__icon--append', `js-filter-v-input__icon__${slug}` ]"
        >
          <i
            aria-hidden="true"
            :class="[ 'v-icon', 'open-select',  'notranslate', 'mdi', 'mdi-menu-down', 'theme--light', `js-filter-selected__${slug}` ]"
          >
          </i>
        </div>
      </div>

      <div
        :class="[ 'menu', `js-filter-menu__${slug}`, { show : isSelectClicked } ]"
      >
        <div class="list-box">
          <div
            class="option"
            @click="handlers().onOptionClick( { option : 'Все', slug, } )"
          >
            <div class="option_title">
              Все
            </div>
          </div>

          <div
            class="option"
            v-for="(item, index) in items" :key="index"
            @click="handlers().onOptionClick( { option : item.name || item.payment.value, slug, } )"
          >
            <div class="option_title">
              {{ item.name || item.payment.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    components  : {},

    props : {
      slug : {
        type    : String,
        default : "",
      },

      title : {
        type    : String,
        default : "",
      },

      items : {
        type      : Array,
        required  : true,
      },
    },

    data ()
    {
      return {
        isSelectClicked : false,
        selectedValue   : '',
      }
    },

    methods : {
      handlers ( params = {} )
      {
        return {
          onSelectClick : ( params = {} ) => {
            let filterScrollboxScrollLeft = Number( document.querySelector( `.js-filter-scrollbox` ).scrollLeft );

            console.debug( 'filterScrollboxScrollLeft ' );
            console.debug( filterScrollboxScrollLeft );

            let targetSelect = document.querySelector( `.js-filter-select__${params.select}` );

            let offsetLeft  = Number( targetSelect.offsetLeft ) - filterScrollboxScrollLeft;
            let offsetTop   = Number( targetSelect.offsetTop );
            let offsetWidth = Number( targetSelect.offsetWidth );

            let targetMenu  = document.querySelector( `.js-filter-menu__${params.select}` );

            targetMenu.style.left   = `${offsetLeft}px`;
            targetMenu.style.top    = `${offsetTop}px`;
            targetMenu.style.width  = `${offsetWidth}px`;

            this.isSelectClicked = true;
          },

          onOptionClick : ( params = {} ) => {
            this.selectedValue    = params.option;
            this.isSelectClicked  = false;

            console.debug( 'this.isSelectClicked ' + this.isSelectClicked );

            this.$emit(
              'set_filter',

              {
                filter  : params.slug,
                value   : params.option === 'Все' ? '' : params.option,
              }
            );
          },
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
						const nodeList  = document.querySelectorAll( `.js-filter-select__${this.slug}` );
						const element   = e.target;

						let isTargetSelect = this.helpers().has( nodeList, element ).length;

						if ( !isTargetSelect )
						{
							this.isSelectClicked = false;
						}
					}
				);
      }
    },

    mounted ()
    {
      this.bindActions();
    },
  }
</script>

<style lang="scss" scoped>
  .add-performers-filter-select {
    border          : 1px solid #D5DEE8;
    box-sizing      : border-box;
    border-radius   : 10px;
    padding         : 12px 16px;

    background: #fff;
    cursor: pointer;

    .wrapper {
      .content {
        display         : flex;
        flex-direction  : row;
        flex-wrap       : nowrap;
        align-content   : center;
        justify-content : center;
        align-items     : center;

        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 125%;

        .f-title {
          color: #7A91A9;
        }

        .selected {
          font-weight : 600;
          font-size   : 16px;
          line-height : 125%;
          color       : #0082DE;
          white-space : nowrap;
          margin-left : 6px;
        }

        .open-select {
          color : #0082DE;
        }
      }

      .menu {
        position      : absolute;
        display       : none;
        top           : 0;
        left          : 0;
        z-index       : 100;
        background    : #fff;
        min-height    : 50px;
        box-shadow    : 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
        border-radius : 4px;

        &.show {
          display : block;
        }

        .list-box {
          background  : #FFFFFF;
          color       : rgba(0, 0, 0, 0.87);
          padding     : 8px 0;
          max-height  : 300px;
          overflow-y  : scroll;

          .option {
            align-items: center;
            display: flex;
            flex: 1 1 100%;
            letter-spacing: normal;
            min-height: 48px;
            outline: none;
            padding: 0 16px;
            position: relative;
            text-decoration: none;

            .option_title {
              align-items: center;
              display: flex;
              flex: 1 1 100%;
              letter-spacing: normal;
              min-height: 48px;
              outline: none;
              padding: 0 16px;
              position: relative;
              text-decoration: none;
              align-items: center;
              align-self: center;
              display: flex;
              flex-wrap: wrap;
              flex: 1 1;
              overflow: hidden;
              padding: 12px 0;
              align-self: center;
              font-size: 1rem;
              line-height: 1.2;
            }
          }
        }
      }
    }
  }
</style>
