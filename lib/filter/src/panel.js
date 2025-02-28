"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = require("../../v-x-e-table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'VxeTableFilter',
  props: {
    filterStore: Object,
    optimizeOpts: Object
  },
  render: function render(h) {
    var filterStore = this.filterStore,
        optimizeOpts = this.optimizeOpts;
    return h('div', {
      class: ['vxe-table--filter-wrapper', 'filter--prevent-default', {
        't--animat': optimizeOpts.animat,
        'filter--active': filterStore.visible
      }],
      style: filterStore.style
    }, filterStore.visible ? [h('ul', {
      class: 'vxe-table--filter-body'
    }, this.renderOptions(h)), this.renderFooter(h)] : []);
  },
  methods: {
    renderOptions: function renderOptions(h) {
      var _ref,
          _this = this;

      var $table = this.$parent,
          filterStore = this.filterStore;
      var vSize = $table.vSize;
      var args = filterStore.args,
          column = filterStore.column,
          multiple = filterStore.multiple;
      var slots = column.slots,
          own = column.own;
      var filterRender = own.filterRender;
      var compConf = filterRender ? _vXETable.Renderer.get(filterRender.name) : null;

      if (slots && slots.filter) {
        return slots.filter.call($table, Object.assign({
          $table: $table,
          context: this
        }, args), h);
      } else if (compConf && compConf.renderFilter) {
        return compConf.renderFilter.call($table, h, filterRender, args, this);
      }

      var filterRens = [h('li', {
        class: ['vxe-table--filter-option', {
          'is--active': !filterStore.options.some(function (item) {
            return item.checked;
          })
        }]
      }, [multiple ? h('label', {
        class: ['vxe-checkbox', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--indeterminate', filterStore.isIndeterminate), _ref)]
      }, [h('input', {
        attrs: {
          type: 'checkbox'
        },
        domProps: {
          checked: filterStore.isAllSelected
        },
        on: {
          change: function change(evnt) {
            return _this.filterCheckAllEvent(evnt, evnt.target.checked);
          }
        }
      }), h('span', {
        class: 'vxe-checkbox--icon'
      }), h('span', {
        class: 'vxe-checkbox--label'
      }, _conf.default.i18n('vxe.table.allFilter'))]) : h('span', {
        class: 'vxe-table--filter-label',
        on: {
          click: $table.resetFilterEvent
        }
      }, _conf.default.i18n('vxe.table.allFilter'))])];
      filterStore.options.forEach(function (item, index) {
        filterRens.push(h('li', {
          class: ['vxe-table--filter-option', {
            'is--active': item.checked
          }],
          key: index
        }, [multiple ? h('label', {
          class: ['vxe-checkbox', _defineProperty({}, "size--".concat(vSize), vSize)]
        }, [h('input', {
          attrs: {
            type: 'checkbox'
          },
          domProps: {
            checked: item.checked
          },
          on: {
            change: function change(evnt) {
              return _this.changeMultipleOption(evnt, evnt.target.checked, item);
            }
          }
        }), h('span', {
          class: 'vxe-checkbox--icon'
        }), h('span', {
          class: 'vxe-checkbox--label'
        }, item.label)]) : h('span', {
          class: 'vxe-table--filter-label',
          on: {
            click: function click(evnt) {
              return _this.changeRadioOption(evnt, !item.checked, item);
            }
          }
        }, item.label)]));
      });
      return filterRens;
    },
    renderFooter: function renderFooter(h) {
      var filterStore = this.filterStore;
      var multiple = filterStore.multiple;
      return multiple ? h('div', {
        class: 'vxe-table--filter-footer'
      }, [h('button', {
        class: {
          'is--disabled': !filterStore.isAllSelected && !filterStore.isIndeterminate
        },
        attrs: {
          disabled: !filterStore.isAllSelected && !filterStore.isIndeterminate
        },
        on: {
          click: this.confirmFilter
        }
      }, _conf.default.i18n('vxe.table.confirmFilter')), h('button', {
        on: {
          click: this.resetFilter
        }
      }, _conf.default.i18n('vxe.table.resetFilter'))]) : null;
    },
    // 全部筛选事件
    filterCheckAllEvent: function filterCheckAllEvent(evnt, value) {
      var filterStore = this.filterStore;
      filterStore.options.forEach(function (item) {
        item.checked = value;
      });
      filterStore.isAllSelected = value;
      filterStore.isIndeterminate = false;
    },
    checkOptions: function checkOptions() {
      var filterStore = this.filterStore;
      filterStore.isAllSelected = filterStore.options.every(function (item) {
        return item.checked;
      });
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(function (item) {
        return item.checked;
      });
    },

    /*************************
     * Publish methods
     *************************/
    // （单选）筛选发生改变
    changeRadioOption: function changeRadioOption(evnt, checked, item) {
      this.filterStore.options.forEach(function (item) {
        item.checked = false;
      });
      item.checked = checked;
      this.checkOptions();
      this.$parent.confirmFilterEvent();
    },
    // （多选）筛选发生改变
    changeMultipleOption: function changeMultipleOption(evnt, checked, item) {
      item.checked = checked;
      this.checkOptions();
    },
    // 筛选发生改变
    changeOption: function changeOption(evnt, checked, item) {
      if (this.filterStore.multiple) {
        this.changeMultipleOption(evnt, checked, item);
      } else {
        this.changeRadioOption(evnt, checked, item);
      }
    },
    // 确认筛选
    confirmFilter: function confirmFilter() {
      this.$parent.confirmFilterEvent();
    },
    // 重置筛选
    resetFilter: function resetFilter() {
      this.$parent.resetFilterEvent();
    }
    /*************************
     * Publish methods
     *************************/

  }
};
exports.default = _default;