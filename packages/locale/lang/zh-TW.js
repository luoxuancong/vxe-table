export default {
  vxe: {
    error: {
      groupFixed: '如果使用分组表頭，固定列必须在左右兩側',
      scrollXNotResizable: '橫向虛擬滾動不支援 "resizable"',
      cellEditRender: '渲染器 "cell-render" 和 "edit-render" 不能同時使用',
      treeFixedExpand: '樹狀結構的固定列與展開行功能有冲衝突',
      scrollOriginal: '虛擬滾動啓用後只能匯出來源資料，請將設定 "original=true"',
      scrollXNotGroup: '橫向虛擬滾動不支持分組表頭',
      scrollYReqProp: '縱向虛擬滾動需要設定 "{{0}}"',
      unableInsert: '無法插入到指定位置',
      useErr: '安裝 "{{0}}" 模塊時發生錯誤，順序不正確',
      barUnableLink: '工具欄無法關聯表格',
      toolbarId: '工具欄需要設置唯一 "id"',
      toolbarDelBtn: '工具列按鈕 "{{0}}" 已废弃，请使用 "{{1}}"',
      reqModule: '缺少 "{{0}}" 模塊',
      emptyProp: '參數 "{{0}}" 不允許為空',
      notFunc: '"{{0}}" 方法不存在',
      noTree: '樹狀結構不支援 {{0}}',
      delFunc: '方法 "{{0}}" 已停用，請使用 "{{1}}"',
      delProp: '參數 "{{0}}" 已停用，請使用 "{{1}}"',
      notType: '不支持的類型 "{{0}}"',
      notExp: '該瀏覽器不支持導入/匯出功能',
      impFields: '導入失敗，請檢查欄位名和數據格式是否正確'
    },
    table: {
      emptyText: '暫無資料',
      confirmFilter: '篩選',
      resetFilter: '重置',
      allFilter: '全部',
      impSuccess: '導入成功',
      expSuccess: '匯出成功'
    },
    column: {
      indexTitle: '#'
    },
    grid: {
      selectOneRecord: '請至少選擇一條記錄！',
      deleteSelectRecord: '您確定要刪除所選記錄嗎？',
      removeSelectRecord: '您確定要移除所選記錄嗎？',
      dataUnchanged: '資料未更改！ ',
      saveSuccess: '保存成功'
    },
    pager: {
      goto: '前往',
      pagesize: '項/頁',
      total: '共 {{total}} 項記錄',
      pageClassifier: '頁'
    },
    alert: {
      title: '訊息提示'
    },
    button: {
      confirm: '確認',
      cancel: '取消'
    },
    types: {
      csv: 'CSV (逗号分隔)(*.csv)',
      html: '网页(*.html)',
      xml: 'XML 数据(*.xml)',
      txt: '文本文件(制表符分隔)(*.txt)',
      xlsx: 'Excel 工作簿(*.xlsx)'
    },
    toolbar: {
      impTitle: '導入參數設置',
      impFile: '檔名',
      impSelect: '選擇檔案',
      impType: '檔案類型',
      impOpts: '導入選項',
      impConfirm: '點擊導入',
      impModeCovering: '覆蓋',
      impModeAppend: '追加',
      expTitle: '匯出參數設置',
      expName: '檔名',
      expNamePlaceholder: '請輸入檔名',
      expSheetName: '工作表名稱',
      expSheetNamePlaceholder: '請輸入工作表名稱',
      expType: '檔案類型',
      expMode: '要匯出的數據',
      expAll: '全部數據',
      expSelected: '選中數據',
      expColumn: '要匯出的欄位',
      expOpts: '匯出選項',
      expOptHeader: '錶頭',
      expOptFooter: '錶尾',
      expOptOriginal: '源(支持導入)',
      expPrint: '列印',
      expConfirm: '點擊匯出'
    }
  }
}
