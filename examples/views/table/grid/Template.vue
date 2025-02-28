<template>
  <div>
    <p class="tip">
      使用自定义模板渲染，通过 <table-column-api-link prop="slots"/> 属性编写 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#JSX" target="_blank">JSX</a> 模板或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM" target="_blank">VNode</a><br>
      列：<br>
      <table-column-api-link prop="default"/>：自定义内容模板（提前格式化好数据 > <table-column-api-link prop="formatter"/> > <table-column-api-link prop="slots"/>）<br>
      <table-column-api-link prop="header"/>：自定义表头模板<br>
      <table-column-api-link prop="filter"/>：自定义筛选模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）<br>
      <table-column-api-link prop="edit"/>：自定义可编辑模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）<br>
      工具栏：<br>
      <grid-api-link prop="buttons"/>：自定义按钮模板
    </p>

    <vxe-grid
      border
      resizable
      height="400"
      :toolbar="tableToolbar"
      :columns="tableColumn"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
    </vxe-grid>

    <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
      <template>
        <div v-if="selectRow" v-html="selectRow.html3"></div>
      </template>
    </vxe-modal>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="vue">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      showDetails: false,
      selectRow: null,
      tableData: [],
      tableColumn: [
        { type: 'index', width: 50 },
        {
          field: 'name',
          title: 'Name',
          slots: {
            default: ({ row, column }) => {
              return [
                <span style="color: red;">{ row.name }</span>,
                <button onClick={ () => this.showDetailEvent(row, column) }>弹框</button>
              ]
            }
          }
        },
        {
          field: 'sex',
          title: 'Sex',
          showHeaderOverflow: true,
          filters: [{ data: '' }],
          filterMethod: this.filterSexMethod,
          editRender: { type: 'default' },
          slots: {
            default: ({ row, column }) => {
              return [
                <a class="link" href="https://xuliangzhan.github.io/vxe-table/">我是超链接：{ row.sex }</a>
              ]
            },
            header: ({ column }) => {
              return [
                <span>
                  <i>@</i>
                  <span style="color: red;" onClick={ this.headerClickEvent }>{ column.title }</span>
                </span>
              ]
            },
            filter: ({ column, context }) => {
              return column.filters.map(option => {
                return <input type="type" value={ option.data } onInput={ evnt => this.changeFilterEvent(evnt, option, context) }/>
              })
            },
            edit: ({ row }) => {
              return [
                <input type="text" value={ row.sex } onInput={ evnt => { row.sex = evnt.target.value } }/>
              ]
            }
          }
        },
        {
          field: 'address',
          title: 'Address',
          showOverflow: true,
          slots: {
            default: ({ row }, h) => {
              return [
                h('span', {
                  style: {
                    color: 'blue'
                  },
                  on: {
                    click: () => this.addressClickEvent(row)
                  }
                }, row.address)
              ]
            }
          }
        },
        {
          field: 'html1',
          title: 'Html片段',
          showOverflow: true,
          slots: {
            default: ({ row }, h) => {
              return [
                <span domPropsInnerHTML={ row.html1 }></span>
              ]
            }
          }
        },
        {
          field: 'img1',
          title: '图片路径',
          slots: {
            default: ({ row }, h) => {
              return [
                row.img1 ? <img src={ row.img1 } style="width: 100px;"/> : <span>无</span>
              ]
            }
          }
        }
      ],
      tableToolbar: {
        setting: true,
        slots: {
          buttons: () => {
            return [
              <button>按钮</button>,
              <input type="text"/>,
              <vxe-button>按钮1</vxe-button>,
              <vxe-button>按钮2</vxe-button>
            ]
          }
        }
      },
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          height="400"
          :toolbar="tableToolbar"
          :columns="tableColumn"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
        </vxe-grid>

        <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
          <template>
            <div v-if="selectRow" v-html="selectRow.html3"></div>
          </template>
        </vxe-modal>
        `,
        `
        export default {
          data () {
            return {
              showDetails: false,
              selectRow: null,
              tableData: [],
              tableColumn: [
                { type: 'index', width: 50 },
                {
                  field: 'name',
                  title: 'Name',
                  slots: {
                    default: ({ row, column }) => {
                      return [
                        <span style="color: red;">{ row.name }</span>,
                        <button onClick={ () => this.showDetailEvent(row, column) }>弹框</button>
                      ]
                    }
                  }
                },
                {
                  field: 'sex',
                  title: 'Sex',
                  showHeaderOverflow: true,
                  filters: [{ data: '' }],
                  filterMethod: this.filterSexMethod,
                  editRender: { type: 'default' },
                  slots: {
                    default: ({ row, column }) => {
                      return [
                        <a class="link" href="https://xuliangzhan.github.io/vxe-table/">我是超链接：{ row.sex }</a>
                      ]
                    },
                    header: ({ column }) => {
                      return [
                        <span>
                          <i>@</i>
                          <span style="color: red;" onClick={ this.headerClickEvent }>{ column.title }</span>
                        </span>
                      ]
                    },
                    filter: ({ column, context }) => {
                      return column.filters.map(option => {
                        return <input type="type" value={ option.data } onInput={ evnt => this.changeFilterEvent(evnt, option, context) }/>
                      })
                    },
                    edit: ({ row }) => {
                      return [
                        <input type="text" value={ row.sex } onInput={ evnt => { row.sex = evnt.target.value } }/>
                      ]
                    }
                  }
                },
                {
                  field: 'address',
                  title: 'Address',
                  showOverflow: true,
                  slots: {
                    default: ({ row }, h) => {
                      return [
                        h('span', {
                          style: {
                            color: 'blue'
                          },
                          on: {
                            click: () => this.addressClickEvent(row)
                          }
                        }, row.address)
                      ]
                    }
                  }
                },
                {
                  field: 'html1',
                  title: 'Html片段',
                  showOverflow: true,
                  slots: {
                    default: ({ row }, h) => {
                      return [
                        <span domPropsInnerHTML={ row.html1 }></span>
                      ]
                    }
                  }
                },
                {
                  field: 'img1',
                  title: '图片路径',
                  slots: {
                    default: ({ row }, h) => {
                      return [
                        row.img1 ? <img src={ row.img1 } style="width: 100px;"/> : <span>无</span>
                      ]
                    }
                  }
                }
              ],
              tableToolbar: {
                setting: true,
                slots: {
                  buttons: () => {
                    return [
                      <button>按钮</button>,
                      <input type="text"/>,
                      <vxe-button>按钮1</vxe-button>,
                      <vxe-button>按钮2</vxe-button>
                    ]
                  }
                }
              }
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
          },
          methods: {
            showDetailEvent (row) {
              this.selectRow = row
              this.showDetails = true
            },
            headerClickEvent (evnt) {
              this.$XModal.alert('头部点击事件')
            },
            addressClickEvent (row) {
              this.$XModal.alert(\`address点击事件：\${row.row}\`)
            },
            filterSexMethod ({ option, row }) {
              return row.sex === option.data
            },
            changeFilterEvent (evnt, option, context) {
              option.data = evnt.target.value
              context.changeMultipleOption(evnt, !!option.data, option)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 100)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    showDetailEvent (row) {
      this.selectRow = row
      this.showDetails = true
    },
    headerClickEvent (evnt) {
      this.$XModal.alert('头部点击事件')
    },
    addressClickEvent (row) {
      this.$XModal.alert(`address点击事件：${row.row}`)
    },
    filterSexMethod ({ option, row }) {
      return row.sex === option.data
    },
    changeFilterEvent (evnt, option, context) {
      option.data = evnt.target.value
      context.changeMultipleOption(evnt, !!option.data, option)
    }
  }
}
</script>
