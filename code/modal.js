var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

var spreadClassNames = function spreadClassNames(userClassName, baseCssClasses) {
    return (baseCssClasses || '') + ' ' + (userClassName || '');
};

var ModalHeader = function ModalHeader(props) {
    var _props$className = props.className;
    var className = _props$className === undefined ? '' : _props$className;
    var children = props.children;

    var rest = _objectWithoutProperties(props, ['className', 'children']);

    return React.createElement(
        'div',
        _extends({ className: "modal-header " + className }, rest),
        props.children
    );
};

var ModalFooter = function ModalFooter(props) {
    var _props$className2 = props.className;
    var className = _props$className2 === undefined ? '' : _props$className2;
    var children = props.children;

    var rest = _objectWithoutProperties(props, ['className', 'children']);

    return React.createElement(
        'div',
        _extends({ className: "modal-footer " + className }, rest),
        props.children
    );
};

var ModalBody = function ModalBody(props) {
    var _props$className3 = props.className;
    var className = _props$className3 === undefined ? '' : _props$className3;
    var children = props.children;

    var rest = _objectWithoutProperties(props, ['className', 'children']);

    return React.createElement(
        'div',
        _extends({ className: "modal-body " + className }, rest),
        props.children
    );
};

var currentModals = [];

var ESC_KEY = 27;

window.addEventListener('keydown', function (evt) {
    var key = evt.keyCode || evt.which;

    if (key == ESC_KEY) {
        if (currentModals.length) {
            currentModals[currentModals.length - 1].props.onHide();
        }
    }
});

function removeBackdrop() {
    var backdrop = document.getElementsByClassName('simple-react-modal-backdrop')[0];
    if (!backdrop) return;
    backdrop.classList.remove('simple-react-modal-backdrop');

    var isAnimating = /\bfade\b/.test(backdrop.className);

    if (!isAnimating) {
        backdrop.parentNode.removeChild(backdrop);
    } else {
        backdrop.classList.remove('in');
        setTimeout(function () {
            return backdrop.parentNode.removeChild(backdrop);
        }, 200);
    }
}

var Modal = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal() {
        var _ref;

        this.x = 'Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal Modal '

        var _temp, _this, _ret;

        _classCallCheck(this, Modal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.state = { exists: false, hasInCssClass: false }, _this.__showingUid = 0, _this.__bumpUid = function () {
            return _this.__showingUid++;
        }, _this.modalClick = function (evt) {
            var activeModal = currentModals[currentModals.length - 1];
            if (activeModal === _this && evt.target === evt.currentTarget) {
                _this.props.onHide();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Modal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.show) {
                this._showModal();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _this2 = this;

            if (!prevProps.show && this.props.show) {
                this._showModal();
            } else if (prevProps.show && !this.props.show) {
                (function () {
                    _this2.__bumpUid();
                    var correctUid = _this2.__showingUid;
                    var isAnimating = /\bfade\b/.test(_this2.modalRef.className);

                    if (isAnimating) {
                        _this2.setState({ hasInCssClass: false });
                        setTimeout(function () {
                            if (_this2.dead) return;
                            if (correctUid !== _this2.__showingUid) return;
                            _this2.setState({ exists: false });
                        }, 200);
                    } else {
                        _this2.setState({ hasInCssClass: false, exists: false });
                    }

                    if (currentModals.length <= 1) {
                        //less than since it may have been closed before modal was activated
                        document.body.classList.remove('modal-open');
                        removeBackdrop();
                    }
                    if (currentModals[currentModals.length - 1] == _this2) {
                        currentModals.pop();
                    }
                })();
            }
        }
    }, {
        key: '_showModal',
        value: function _showModal() {
            var _this3 = this;

            this.__bumpUid();
            var correctUid = this.__showingUid;
            var div = !currentModals.length ? document.createElement('div') : null,
                isAnimating = /\bfade\b/.test(this.modalRef.className);

            if (div) {
                var _div$classList;

                (_div$classList = div.classList).add.apply(_div$classList, ['modal-backdrop', 'simple-react-modal-backdrop', isAnimating ? 'fade' : 'in']);
            }

            if (isAnimating) {
                if (div) {
                    document.body.appendChild(div);
                }
                this.setState({ exists: true });
                setTimeout(function () {
                    if (div) {
                        div.classList.add('in');
                    }
                    _this3.setState({ hasInCssClass: true });
                    document.body.classList.add('modal-open');
                }, 1);
                //provide some small delay before this modal is eligible to be closed.  We don't want a double click to open / show the modal.

                setTimeout(function () {
                    //highly unlikely, but just in case
                    if (_this3.dead) return;
                    if (correctUid !== _this3.__showingUid) return;
                    currentModals.push(_this3);
                }, 200);
            } else {
                if (div) {
                    document.body.appendChild(div);
                }
                this.setState({ exists: true, hasInCssClass: true });
                currentModals.push(this);
                document.body.classList.add('modal-open');
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props;
            var children = _props.children;
            var manual = _props.manual;
            var show = _props.show;
            var onHide = _props.onHide;
            var className = _props.className;
            var style = _props.style;

            var rest = _objectWithoutProperties(_props, ['children', 'manual', 'show', 'onHide', 'className', 'style']);

            return React.createElement(
                'div',
                _extends({ ref: function ref(el) {
                        return _this4.modalRef = el;
                    }, onClick: this.modalClick, className: spreadClassNames(className, 'modal ' + (this.state.hasInCssClass ? 'in' : '')), style: _extends({}, style, { display: this.state.exists ? 'block' : '' }) }, rest, { role: 'dialog' }),
                manual ? children : React.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        children
                    )
                )
            );
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var index = currentModals.indexOf(this);
            if (index >= 0) {
                currentModals.splice(index, 1);
                if (!currentModals.length) {
                    removeBackdrop();
                }
            }
            this.dead = true;
        }
    }]);

    return Modal;
}(React.Component);

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

export default Modal;