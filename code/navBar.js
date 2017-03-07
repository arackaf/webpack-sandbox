var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import ButtonDropdown from './buttonDropdown.js';

var COLLAPSE_TIMEOUT = 355;

var spreadClassNames = function spreadClassNames() {
    for (var _len = arguments.length, userClasses = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        userClasses[_key - 1] = arguments[_key];
    }

    var baseCssClasses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return baseCssClasses + ' ' + userClasses.join(' ');
};

var NavBarForm = function NavBarForm(props) {
    var className = props.className;
    var style = props.style;

    var rest = _objectWithoutProperties(props, ['className', 'style']);

    return React.createElement(
        'form',
        _extends({ onSubmit: function onSubmit(evt) {
                return evt.preventDefault();
            }, className: spreadClassNames(className, 'navbar-form'), style: style }, rest),
        props.children
    );
};

var NavBarBrand = function NavBarBrand(props) {
    return React.cloneElement(props.children, { className: 'navbar-brand', key: 'nav-bar-brand' });
};

var NavBarToggle = function NavBarToggle(props) {
    return React.createElement(
        'button',
        _extends({}, props, { type: 'button', className: 'navbar-toggle collapsed' }),
        React.createElement(
            'span',
            { className: 'sr-only' },
            'Toggle navigation'
        ),
        React.createElement('span', { className: 'icon-bar' }),
        React.createElement('span', { className: 'icon-bar' }),
        React.createElement('span', { className: 'icon-bar' })
    );
};

var NavBarHeader = function (_React$Component) {
    _inherits(NavBarHeader, _React$Component);

    function NavBarHeader() {
        _classCallCheck(this, NavBarHeader);

        return _possibleConstructorReturn(this, (NavBarHeader.__proto__ || Object.getPrototypeOf(NavBarHeader)).apply(this, arguments));
    }

    _createClass(NavBarHeader, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var children = _props.children;
            var onClick = _props.onClick;

            return React.createElement(
                'div',
                { className: 'navbar-header', ref: function ref(el) {
                        return _this2.el = el;
                    } },
                React.Children.map(children, function (child) {
                    return child.type === NavBarToggle ? React.cloneElement(child, { onClick: onClick, key: 'nav-bar-toggle' }) : child;
                })
            );
        }
    }]);

    return NavBarHeader;
}(React.Component);

var NavBarItem = function NavBarItem(props) {
    var disabled = props.disabled;
    var className = props.className;
    var active = props.active;
    var href = props.href;
    var children = props.children;

    var rest = _objectWithoutProperties(props, ['disabled', 'className', 'active', 'href', 'children']);

    return React.createElement(
        'li',
        _extends({ disabled: !!disabled, className: spreadClassNames(className, !!disabled ? 'disabled' : '', active ? 'active' : '') }, rest),
        React.createElement(
            'a',
            { href: href },
            children
        )
    );
};

var NavBarItemDivider = function NavBarItemDivider(props) {
    return React.createElement('li', { role: 'separator', className: 'divider' });
};

var NavBarDropdown = function NavBarDropdown(props) {
    var toggleClassName = props.toggleClassName;
    var style = props.style;
    var disabled = props.disabled;
    var text = props.text;
    var children = props.children;
    var _props$ignoreContentC = props.ignoreContentClick;
    var ignoreContentClick = _props$ignoreContentC === undefined ? false : _props$ignoreContentC;

    var rest = _objectWithoutProperties(props, ['toggleClassName', 'style', 'disabled', 'text', 'children', 'ignoreContentClick']);

    return React.createElement(
        ButtonDropdown,
        { containerElementType: 'li', clean: true, ignoreContentClick: ignoreContentClick, className: 'dropdown ' + (!!disabled ? 'disabled' : ''), disabled: !!disabled },
        React.createElement(
            'a',
            _extends({ className: spreadClassNames(toggleClassName, 'dropdown-toggle'), style: style || {} }, rest),
            text,
            ' ',
            React.createElement('span', { className: 'caret' })
        ),
        React.createElement(
            'ul',
            { className: 'dropdown-menu' },
            children
        )
    );
};

var Nav = function Nav(_ref) {
    var _ref$className = _ref.className;
    var className = _ref$className === undefined ? '' : _ref$className;

    var props = _objectWithoutProperties(_ref, ['className']);

    return React.createElement(
        'ul',
        _extends({}, props, { className: "nav navbar-nav " + className }),
        props.children
    );
};

var NavBar = function (_React$Component2) {
    _inherits(NavBar, _React$Component2);

    function NavBar() {
        var _ref2;

        var _temp, _this3, _ret;

        this.x = 'NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar NavBar '

        _classCallCheck(this, NavBar);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref2 = NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = { collapsed: true, heightExpanded: false, collapseHeight: null }, _this3._clearAnimation = function () {
            if (_this3._pendingAnimationClear) {
                clearTimeout(_this3._pendingAnimationClear);
                _this3._pendingAnimationClear = null;
            }
        }, _this3.closeIfOpen = function () {
            if (_this3.state.expanding || _this3.state.expanded) {
                _this3.close();
            }
        }, _this3.close = function () {
            _this3.setState({ collapsing: true, collapseHeight: null, expanding: false, expanded: false });
            _this3._pendingAnimationClear = setTimeout(function () {
                _this3.setState({ collapsing: false, collapseHeight: null });
                _this3._cachedHeight = null;
            }, COLLAPSE_TIMEOUT);
        }, _this3.expand = function () {
            if (!_this3._cachedHeight) {
                var headerNode = _this3.headerEl.el,
                    collapseContentToToggle = headerNode.nextSibling;

                collapseContentToToggle.style.visibility = 'hidden';
                collapseContentToToggle.classList.add('in');
                var offsetHeight = collapseContentToToggle.offsetHeight;
                collapseContentToToggle.style.visibility = '';
                collapseContentToToggle.classList.remove('in');

                _this3._cachedHeight = offsetHeight;
            }

            _this3.setState({ collapsing: true, expanding: true });
            setTimeout(function () {
                return _this3.setState({ collapseHeight: _this3._cachedHeight });
            }, 2);

            _this3._pendingAnimationClear = setTimeout(function () {
                return _this3.setState({ collapsing: false, expanded: true, expanding: false });
            }, COLLAPSE_TIMEOUT);
        }, _temp), _possibleConstructorReturn(_this3, _ret);
    }

    _createClass(NavBar, [{
        key: 'toggleMobileCollapse',
        value: function toggleMobileCollapse() {
            this._clearAnimation();
            if (this.state.expanded || this.state.expanding) {
                this.close();
            } else {
                this.expand();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this._pendingAnimationClear);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var header = this.props.children.find(function (c) {
                return c.type === NavBarHeader;
            }),
                navSubItems = this.props.children.filter(function (el) {
                return el != header;
            });

            if (header) {
                header = React.cloneElement(header, { onClick: this.toggleMobileCollapse.bind(this), ref: function ref(el) {
                        return _this4.headerEl = el;
                    } });
            }

            var _props2 = this.props;
            var style = _props2.style;
            var _props2$className = _props2.className;
            var className = _props2$className === undefined ? '' : _props2$className;

            var rest = _objectWithoutProperties(_props2, ['style', 'className']);

            return React.createElement(
                'nav',
                _extends({ className: 'navbar navbar-default ' + className, style: style }, rest),
                React.createElement(
                    'div',
                    { className: 'container-fluid' },
                    header || null,
                    React.createElement(
                        'div',
                        { className: (this.state.collapsing ? ' collapsing ' : ' collapse ') + ' navbar-collapse ' + (this.state.expanded ? ' in ' : ''), style: { height: this.state.collapseHeight || null } },
                        navSubItems
                    )
                )
            );
        }
    }]);

    return NavBar;
}(React.Component);

NavBar.Nav = Nav;
NavBar.Item = NavBarItem;
NavBar.ItemDivider = NavBarItemDivider;
NavBar.Header = NavBarHeader;
NavBar.Brand = NavBarBrand;
NavBar.Toggle = NavBarToggle;
NavBar.Dropdown = NavBarDropdown;
NavBar.Form = NavBarForm;

export default NavBar;