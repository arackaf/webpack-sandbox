var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';

var ButtonDropdown = function (_Component) {
    _inherits(ButtonDropdown, _Component);

    function ButtonDropdown() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ButtonDropdown);

        this.x = 'button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown button dropdown ';

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ButtonDropdown.__proto__ || Object.getPrototypeOf(ButtonDropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = { open: false }, _this.documentClick = function (evt) {
            var toggleBtnDomNode = void 0;
            if (_this.toggleBtn) {
                if (_this.toggleBtn instanceof Component) {
                    toggleBtnDomNode = findDOMNode(_this.toggleBtn);
                } else {
                    toggleBtnDomNode = _this.toggleBtn;
                }
            }

            if (toggleBtnDomNode && toggleBtnDomNode.contains(evt.target)) return;

            var isOpen = typeof _this.props.open !== 'undefined' ? _this.props.open : _this.state.open;
            var keepOpenIfItemClickedNoLongerInDocument = _this.props.keepOpenIfItemClickedNoLongerInDocument;


            if (isOpen) {
                if (_this.props.ignoreContentClick) {
                    var contentMenuNode = void 0;
                    if (_this.contentMenu) {
                        if (_this.contentMenu instanceof Component) {
                            contentMenuNode = findDOMNode(_this.contentMenu);
                        } else {
                            contentMenuNode = _this.contentMenu;
                        }
                    }

                    if (contentMenuNode && contentMenuNode.contains(evt.target)) return;
                    //adding for a specific use case that may not even be reproducable depending on circumstance.  Keeping undocumented for now.
                    if (keepOpenIfItemClickedNoLongerInDocument && !document.contains(evt.target)) return;
                }

                if (_this.props.onToggle) {
                    _this.props.onToggle(evt);
                } else {
                    _this.toggle();
                }
            }
        }, _this.toggle = function () {
            return _this.setState({ open: !_this.state.open });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ButtonDropdown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('click', this.documentClick);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this.documentClick);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var children = _props.children;
            var _props$className = _props.className;
            var className = _props$className === undefined ? '' : _props$className;
            var _props$containerEleme = _props.containerElementType;
            var containerElementType = _props$containerEleme === undefined ? 'div' : _props$containerEleme;
            var _props$disabled = _props.disabled;
            var disabled = _props$disabled === undefined ? false : _props$disabled;
            var ignoreContentClick = _props.ignoreContentClick;
            var deferDropdownRendering = _props.deferDropdownRendering;
            var onToggle = _props.onToggle;
            var open = _props.open;
            var clean = _props.clean;
            var keepOpenIfItemClickedNoLongerInDocument = _props.keepOpenIfItemClickedNoLongerInDocument;

            var rest = _objectWithoutProperties(_props, ['children', 'className', 'containerElementType', 'disabled', 'ignoreContentClick', 'deferDropdownRendering', 'onToggle', 'open', 'clean', 'keepOpenIfItemClickedNoLongerInDocument']);

            if (!Array.isArray(children)) {
                throw 'Error - at least two children should be passed: a toggle, and dropdown menu, at a minimum';
            }

            var toggleUnadjusted = void 0,
                contentUnadjusted = void 0,
                toggleClasses = '',
                contentClasses = '';

            if (children.length === 2) {
                toggleUnadjusted = children[0];
                contentUnadjusted = children[1];

                toggleClasses = ' dropdown-toggle ';
                contentClasses = ' dropdown-menu  ';
            } else {
                toggleUnadjusted = children.find(function (child) {
                    return child && child.props && /\bdropdown-toggle\b/.test(child.props.className);
                });
                contentUnadjusted = children.find(function (child) {
                    return child && child.props && /\bdropdown-menu\b/.test(child.props.className);
                });
            }

            var rootCssToAdd = clean ? '' : ' btn-group ';
            var toggle = void 0;
            if (toggleUnadjusted) {
                (function () {
                    //when the toggle button is clicked, click THIS method, in addition to any onClick method supplied by the user. Do not call regular toggle method in controlled mode
                    var rootToggleClick = _this2.props.onToggle || (typeof _this2.props.open === 'undefined' ? _this2.toggle : function () {});
                    var toggleClick = toggleUnadjusted.props.onClick ? function (evt) {
                        if (disabled) return;
                        toggleUnadjusted.props.onClick();
                        rootToggleClick(evt);
                    } : !disabled ? rootToggleClick : function () {};
                    toggle = React.cloneElement(toggleUnadjusted, {
                        className: toggleClasses + (toggleUnadjusted.props.className || ''),
                        onClick: toggleClick,
                        ref: function ref(el) {
                            return _this2.toggleBtn = el;
                        }
                    });
                })();
            }

            var content = void 0;
            if (contentUnadjusted) {
                content = React.cloneElement(contentUnadjusted, {
                    className: contentClasses + (contentUnadjusted.props.className || ''),
                    ref: function ref(el) {
                        return _this2.contentMenu = el;
                    }
                });
            }

            var isOpen = typeof this.props.open !== 'undefined' ? this.props.open : this.state.open,
                classToAdd = [className, rootCssToAdd, isOpen ? 'open' : null].filter(function (s) {
                return s;
            }).join(' ');

            //simple case
            if (children.length === 2) {
                return createElement(containerElementType, _extends({ className: classToAdd }, rest), React.cloneElement(toggle, { disabled: disabled }), !this.props.deferDropdownRendering || isOpen ? content : null);
            } else {
                var childrenToUse = [].concat(_toConsumableArray(children));
                if (toggleUnadjusted) {
                    childrenToUse.splice(childrenToUse.indexOf(toggleUnadjusted), 1, toggle);
                }
                if (contentUnadjusted) {
                    childrenToUse.splice(childrenToUse.indexOf(contentUnadjusted), 1, !this.props.deferDropdownRendering || isOpen ? content : null);
                }

                return createElement.apply(undefined, [containerElementType, _extends({ className: classToAdd }, rest)].concat(_toConsumableArray(childrenToUse)));
            }
        }
    }]);

    return ButtonDropdown;
}(Component);

export default ButtonDropdown;