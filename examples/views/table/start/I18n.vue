<template>
  <div>
    <h2>Internationalization 国际化</h2>
    <p class="tip">目前支持的<a class="link" href="https://github.com/xuliangzhan/vxe-table/tree/master/packages/locale/lang" target="_blank">国际化列表</a>，若希望使用指定语言，则需要进行多语言设置。以中/英文为例</p>
    <pre>
      <code class="shell">
        npm install vue-i18n
      </code>
      <code class="javascript">{{ demoCodes[0] }}</code>
    </pre>
    <h2>集成国际化</h2>
    <p class="tip">若希望在项目中支持全局自动翻译，可以通过全局参数开启（将对列头、校验提示..进行自动翻译）</p>
    <pre>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="html">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      demoCodes: [
        `
        import Vue from 'vue'
        import VueI18n from 'vxe-i18n'
        import VXETable from 'vxe-table'
        import zhCNLocat from 'vxe-table/lib/locale/lang/zh_CN'
        import enLocat from 'vxe-table/lib/locale/lang/en'

        const messages = {
          zh_CN: {
            ...zhCNLocat
          },
          en: {
            ...enLocat
          }
        }

        const i18n = new VueI18n({
          locale: 'zh_CN',
          messages,
        })

        Vue.use(VXETable, {
          // 对组件内置的提示语进行国际化翻译
          i18n: (key, value) => i18n.t(key, value)
        })

        new Vue({ i18n }).$mount('#app')
        `,
        `
        Vue.use(VXETable, {
          // 对参数的内容自动进行国际化翻译（只对支持国际化的有效）
          translate: : key => i18n.t(key)
        })
        `,
        `
        <vxe-table
          border
          height="600"
          :data="tableData">
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
          <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
        </vxe-table>
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
