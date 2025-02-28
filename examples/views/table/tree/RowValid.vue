<template>
  <div>
    <p class="tip">通过调用 <table-api-link prop="validate"/> 函数校验数据，<table-api-link prop="edit-rules"/> 校验规则配置</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="validEvent">校验</vxe-button>
        <vxe-button @click="fullValidEvent">完整校验</vxe-button>
        <vxe-button @click="selectValidEvent">选中校验</vxe-button>
        <vxe-button @click="getSelectEvent">获取选中</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      ref="xTree"
      :edit-rules="validRules"
      :tree-config="treeConfig"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :checkbox-config="{labelField: 'id'}"
      :data="tableData">
      <vxe-table-column type="checkbox" title="ID" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      treeConfig: {
        children: 'children'
      },
      validRules: {
        name: [
          { required: true, message: 'app.body.valid.rName' },
          { min: 3, max: 50, message: '文件名长度在 3 到 50 个字符' }
        ]
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="validEvent">校验</vxe-button>
            <vxe-button @click="fullValidEvent">完整校验</vxe-button>
            <vxe-button @click="selectValidEvent">选中校验</vxe-button>
            <vxe-button @click="getSelectEvent">获取选中</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          ref="xTree"
          :edit-rules="validRules"
          :tree-config="treeConfig"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :checkbox-config="{labelField: 'id'}"
          :data="tableData">
          <vxe-table-column type="checkbox" title="ID" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              treeConfig: {
                children: 'children'
              },
              validRules: {
                name: [
                  { required: true, message: 'app.body.valid.rName' },
                  { min: 3, max: 50, message: '文件名长度在 3 到 50 个字符' }
                ]
              }
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          },
          methods: {
            validEvent () {
              this.$refs.xTree.validate(valid => {
                if (valid) {
                  this.$XModal.message({ status: 'success', message: '校验成功！' })
                } else {
                  this.$XModal.message({ status: 'error', message: '校验不通过！' })
                }
              })
            },
            fullValidEvent () {
              this.$refs.xTree.fullValidate((valid, errMap) => {
                if (valid) {
                  this.$XModal.message({ status: 'success', message: '校验成功！' })
                } else {
                  let msgList = []
                  Object.values(errMap).forEach(errList => {
                    errList.forEach(params => {
                      let { row, column, rules } = params
                      let matchObj = this.$utils.findTree(this.tableData, item => item === row, this.treeConfig)
                      let seq = matchObj.path.filter(item => item !== this.treeConfig.children).map(item => Number(item) + 1).join('.')
                      rules.forEach(rule => {
                        msgList.push(\`第 \${seq} 行 \${column.title} 校验错误：\${rule.message}\`)
                      })
                    })
                  })
                  this.$XModal.message({
                    status: 'error',
                    message: () => {
                      return [
                        <div class="red" style="max-height: 400px;overflow: auto;">
                          {
                            msgList.map(msg => {
                              return <div>{ msg }</div>
                            })
                          }
                        </div>
                      ]
                    }
                  })
                }
              })
            },
            selectValidEvent () {
              let selectRecords = this.$refs.xTree.getSelectRecords()
              if (selectRecords.length > 0) {
                this.$refs.xTree.validate(selectRecords, valid => {
                  if (valid) {
                    this.$XModal.message({ status: 'success', message: '校验成功！' })
                  } else {
                    this.$XModal.message({ status: 'error', message: '校验不通过！' })
                  }
                })
              } else {
                this.$XModal.message({ status: 'warning', message: '未选中数据！' })
              }
            },
            getSelectEvent () {
              let selectRecords = this.$refs.xTree.getSelectRecords()
              this.$XModal.alert(selectRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTree.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = this.$utils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    validEvent () {
      this.$refs.xTree.validate(valid => {
        if (valid) {
          this.$XModal.message({ status: 'success', message: '校验成功！' })
        } else {
          this.$XModal.message({ status: 'error', message: '校验不通过！' })
        }
      })
    },
    fullValidEvent () {
      this.$refs.xTree.fullValidate((valid, errMap) => {
        if (valid) {
          this.$XModal.message({ status: 'success', message: '校验成功！' })
        } else {
          let msgList = []
          Object.values(errMap).forEach(errList => {
            errList.forEach(params => {
              let { row, column, rules } = params
              let matchObj = this.$utils.findTree(this.tableData, item => item === row, this.treeConfig)
              let seq = matchObj.path.filter(item => item !== this.treeConfig.children).map(item => Number(item) + 1).join('.')
              rules.forEach(rule => {
                msgList.push(`第 ${seq} 行 ${column.title} 校验错误：${rule.message}`)
              })
            })
          })
          this.$XModal.message({
            status: 'error',
            message: () => {
              return [
                <div class="red" style="max-height: 400px;overflow: auto;">
                  {
                    msgList.map(msg => {
                      return <div>{ msg }</div>
                    })
                  }
                </div>
              ]
            }
          })
        }
      })
    },
    selectValidEvent () {
      let selectRecords = this.$refs.xTree.getSelectRecords()
      if (selectRecords.length > 0) {
        this.$refs.xTree.validate(selectRecords, valid => {
          if (valid) {
            this.$XModal.message({ status: 'success', message: '校验成功！' })
          } else {
            this.$XModal.message({ status: 'error', message: '校验不通过！' })
          }
        })
      } else {
        this.$XModal.message({ status: 'warning', message: '未选中数据！' })
      }
    },
    getSelectEvent () {
      let selectRecords = this.$refs.xTree.getSelectRecords()
      this.$XModal.alert(selectRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTree.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>
