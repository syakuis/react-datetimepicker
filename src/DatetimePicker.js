/**
 * flatpickr 를 이용한 날짜와 시간 선택기
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 22.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { arrayEmpty, arrayEquals } from './utils';
import { flatpickr, setLocale, parseDate, formatDate, formatDateString, uiType, dateCompare, dayDisable } from './commons';

const propTypes = {
  children: PropTypes.node,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  wrapper: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),

  iconSuccess: PropTypes.string,
  iconClear: PropTypes.string,
  iconOpen: PropTypes.string,

  // only mode single
  startDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  endDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  isDefaultValue: PropTypes.bool,

  // flatpickr config
  mode: PropTypes.string,
  dateFormat: PropTypes.string,
  // only date type
  defaultDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  clickOpens: PropTypes.bool,
  allowInput: PropTypes.bool,
  disable: PropTypes.arrayOf(PropTypes.object),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

const defaultProps = {
  children: undefined,
  readOnly: false,
  type: 'date', // date, datetime, time
  wrapper: 'div',
  className: undefined,
  style: undefined,

  iconSuccess: 'fa fa-check',
  iconClear: 'fa fa-close',
  iconOpen: 'fa fa-calendar',

  startDate: undefined,
  endDate: undefined,
  defaultValue: undefined,
  isDefaultValue: false,

  // flatpickr config
  mode: 'single', // "single", "multiple", or "range"
  wrap: false, // 달력을 커스텀하게 만들 수 있다.
  inline: false, // 달력 표시
  parseDate: false, // 선택된 날짜 데이터를 Date object 와 string 으로 반환여부

  disableMobile: false,
  enable: [], // 해당 날짜만 선택할 수 있다.
  disable: [], // 해당 날짜를 선택할 수 없게 한다.

  dateFormat: undefined,
  defaultDate: undefined,
  noCalendar: false, // 날짜 선택기 숨김 enableTime = true 시간 선택기 활성화됨.
  weekNumbers: false, // 주 번호를 표시한다.
  shorthandCurrentMonth: false, // 축약된 월 이름으로 사용여부

  time_24hr: true, // AM:PM 선택기 사용하지 않고 24시로 표시여부
  defaultHour: 12,
  defaultMinute: 0,
  enableTime: false, // 시간 선택기 사용여부
  enableSeconds: false, // 시간 선택기에 초 선택 사용여부
  hourIncrement: 1, // 시간 입력 단계를 조정합니다 (스크롤 포함).
  minuteIncrement: 5, // 분 입력 단계를 조정합니다 (스크롤 포함).

  allowInput: false, // data-input 입력은 읽기전용이다.
  clickOpens: true, // data-input 클릭하면 달력이 활성화 된다.
  // 아래의 설정을 사용하면 선택기가 멈춘다.
  // formatDate: null, // 기본 설정의 날짜포맷 대신 dateFormat, altFormat, ariaDateFormat 사용한다.
  nextArrow: '>', // 달력 이동 버튼 아이콘
  prevArrow: '<', // 달력 이동 버튼 아이콘

  onChange: undefined,
  onReady: undefined,
  onOpen: undefined,
  onClose: undefined,

  minDate: parseDate('1800-01-01'),
  maxDate: undefined,
};

class DatetimePicker extends Component {
  constructor(props) {
    super(props);

    this.flatpickr = undefined;
    this.datetimeRef = undefined;
    this.type = uiType(props);

    this.onChange = this.onChange.bind(this);
    this.onChangeSuccess = this.onChangeSuccess.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClear = this.onClear.bind(this);
    this.setDatetime = this.setDatetime.bind(this);
    this.onChangeCallback = this.onChangeCallback.bind(this);

    const dateStr = formatDateString(
      props.mode, props.defaultDate || props.defaultValue, this.type.dateFormat);

    this.state = {
      dateStr,
      valueChange: false,
    };
  }

  componentDidMount() {
    const {
      children,
      readOnly,
      type,
      wrapper,
      className,
      style,
      iconSuccess,
      iconClear,
      iconOpen,
      startDate,
      endDate,
      defaultDate,
      defaultValue,
      isDefaultValue,
      ...props
    } = this.props;

    this.flatpickr = flatpickr(this.datetimeRef,
      { ...props, defaultDate: defaultDate || defaultValue }, this.type, this.onChangeCallback);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDate && !arrayEquals(this.props.defaultDate, nextProps.defaultDate)) {
      this.setState({ dateStr: formatDateString(
        nextProps.mode, nextProps.defaultDate, this.type.dateFormat) });
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
    this.flatpickr = undefined;
    this.datetimeRef = undefined;
  }

  onChangeCallback(selectedDates, dateStr, instance) {
    if (this.props.mode === 'range' && (!selectedDates || (selectedDates && selectedDates.length < 2))) return;
    this.setState({ dateStr });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(selectedDates, dateStr, instance);
    }

    // this.flatpickr.setDate('2011-12-20', false);
    // this.flatpickr.toggle();
  }

  onChange(e) {
    this.setState({
      dateStr: e.target.value,
      valueChange: true,
    });
  }

  onChangeSuccess() {
    this.setState(() => ({
      valueChange: false,
    }), () => { this.setDatetime(this.state.dateStr); });
  }

  onBlur() {
    if (this.state.valueChange) this.onChangeSuccess();
  }

  onKeyPress(e) {
    if (this.state.valueChange && e.key === 'Enter') {
      this.onChangeSuccess();
    }
  }

  onOpen() {
    if (this.props.defaultDate) {
      if (this.props.mode === 'single' && (this.props.startDate || this.props.endDate)) {
        const defaultDate =
          dateCompare(this.props.defaultDate, this.props.startDate, this.props.endDate)
          || this.props.defaultDate;
        this.flatpickr.setDate(defaultDate, true, this.type.dateFormat);

        if (arrayEmpty(this.props.disable)) {
          const disable = dayDisable(
            defaultDate, this.props.startDate, this.props.endDate);
          if (disable) {
            this.flatpickr.set('disable', disable);
            this.flatpickr.redraw();
          }
        }
      } else {
        this.flatpickr.setDate(this.props.defaultDate, true, this.type.dateFormat);
      }
    }

    this.flatpickr.toggle();
  }

  onClear() {
    this.flatpickr.clear();
    if (this.props.isDefaultValue && this.props.defaultValue) {
      this.setDatetime(this.props.defaultValue);
    }
  }

  setDatetime(value, triggerChange = true) {
    this.flatpickr.setDate(value, triggerChange, this.type.dateFormat);
  }

  render() {
    const { className, style } = this.props;

    return (
      this.props.children ?
        React.createElement(
          this.props.wrapper,
          {
            ...className,
            ...style,
            ref: (node) => { this.datetimeRef = node; },
          },
          this.props.children,
        ) :
        <div
          className={`input-group ${this.props.className ? this.props.className : ''}`}
          ref={(node) => { this.datetimeRef = node; }}
        >
          <input
            type="text"
            readOnly={this.props.readOnly}
            className="form-control"
            value={this.state.dateStr}
            onChange={this.props.allowInput || !this.props.readOnly ? this.onChange : null}
            onKeyPress={this.onKeyPress}
            onBlur={this.onBlur}
            onClick={this.props.clickOpens && !this.props.allowInput ? this.onOpen : null}
          />
          <span className="input-group-btn">
            {
              this.state.valueChange ?
                <button className="btn btn-default" type="button" onClick={this.onChangeSuccess}>
                  <i className={this.props.iconSuccess} aria-hidden="true" />
                </button> : null
            }
            <button className="btn btn-default" type="button" onClick={this.onClear}>
              <i className={this.props.iconClear} aria-hidden="true" />
            </button>
            <button className="btn btn-default" type="button" onClick={this.onOpen}>
              <i className={this.props.iconOpen} aria-hidden="true" />
            </button>
          </span>
        </div>
    );
  }
}

DatetimePicker.propTypes = propTypes;
DatetimePicker.defaultProps = defaultProps;

export default DatetimePicker;
export { parseDate, formatDate, formatDateString, setLocale };
