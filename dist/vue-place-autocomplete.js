(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.VuePlaceAutocomplete = {})));
}(this, (function (exports) { 'use strict';

    var SampleComponent = {
      render: function render() {
        var _vm = this;

        var _h = _vm.$createElement;

        var _c = _vm._self._c || _h;

        return _c('div', [_c('span', {
          staticClass: "message",
          domProps: {
            "innerHTML": _vm._s(_vm.message)
          }
        })]);
      },
      staticRenderFns: [],
      name: "sample-component",
      props: {
        message: {
          type: String,
          required: true
        }
      }
    };

    exports.default = SampleComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLXBsYWNlLWF1dG9jb21wbGV0ZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbXBvbmVudHMvU2FtcGxlQ29tcG9uZW50LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdj48c3BhbiBjbGFzcz1cIm1lc3NhZ2VcIiB2LWh0bWw9XCJtZXNzYWdlXCI+PC9zcGFuPjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6IFwic2FtcGxlLWNvbXBvbmVudFwiLFxuXG4gICAgcHJvcHM6IHtcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsicmVuZGVyIiwibmFtZSIsInByb3BzIiwibWVzc2FnZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0EsMEJBQWU7SUFBQ0E7Ozs7Ozs7Ozs7Ozs7T0FBRDt5QkFBQTtJQUVYQyxRQUFNLGtCQUZLO0lBSVhDLFNBQU87SUFDSEMsYUFBUztJQUNMQyxZQUFNQyxNQUREO0lBRUxDLGdCQUFVO0lBRkw7SUFETjtJQUpJLENBQWY7Ozs7Ozs7Ozs7OzsifQ==
