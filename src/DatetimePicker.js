/**
 * flatpickr 를 이용한 날짜와 시간 선택기
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 22.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Flatpickr from 'flatpickr';

const propTypes = {
  children: PropTypes.node,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  stringFormat: PropTypes.string,
  wrapper: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),

  iconSuccess: PropTypes.string,
  iconClear: PropTypes.string,
  iconOpen: PropTypes.string,

  afterOpen: PropTypes.func,
  afterClear: PropTypes.func,

  // flatpickr config
  mode: PropTypes.string,
  dateFormat: PropTypes.string,
  defaultDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  clickOpens: PropTypes.bool,
  allowInput: PropTypes.bool,
  onChange: PropTypes.func,
};

const defaultProps = {
  children: undefined,
  readOnly: false,
  type: 'date', // date, datetime, time
  stringFormat: undefined,
  wrapper: 'div',
  className: undefined,
  style: undefined,

  iconSuccess: 'fa fa-check',
  iconClear: 'fa fa-close',
  iconOpen: 'fa fa-calendar',

  afterOpen: undefined,
  afterClear: undefined,

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

  onChange: null,
  onReady: null,
  onOpen: null,
  onClose: null,
};

const flatpickr = (target, config, type, onChange) => (
  new Flatpickr(target, {
    ...config,
    ...type,
    wrap: false,
    inline: false,
    clickOpens: false,
    allowInput: false,
    parseDate: (date) => {
      const d = moment(date, type.stringFormat);
      return d.isValid() ? d.toDate() : null;
    },
    onChange,
  })
);

const formatDateString = (mode, dates, dateFormat, stringFormat) => {
  if (!Array.isArray(dates) || !dates || (dates && dates.length === 0)) return '';
  switch (mode) {
    case 'single': {
      const dateObj = typeof dates[0] === 'string' ? moment(dates[0], stringFormat).toDate() : dates[0];
      return Flatpickr.formatDate(dateObj, dateFormat);
    }
    case 'multiple': {
      return [].map.call(dates, (date) => {
        const dateObj = typeof date === 'string' ? moment(date, stringFormat).toDate() : date;
        return Flatpickr.formatDate(dateObj, dateFormat);
      }).join(', ');
    }
    case 'range': {
      const startDateObj = typeof dates[0] === 'string' ? moment(dates[0], stringFormat).toDate() : dates[0];
      const endDateObj = typeof dates[1] === 'string' ? moment(dates[1], stringFormat).toDate() : dates[1];
      return `${Flatpickr.formatDate(startDateObj, dateFormat)} to ${Flatpickr.formatDate(endDateObj, dateFormat)}`;
    }
    default: return '';
  }
};

const uiType = (props) => {
  switch (props.type) {
    case 'datetime':
      return {
        noCalendar: false,
        enableTime: true,
        dateFormat: props.dateFormat || 'Y-m-d H:i',
        stringFormat: props.stringFormat || 'YYYYMMDDHHmm',
      };
    case 'time':
      return {
        noCalendar: true,
        enableTime: true,
        enableSeconds: true,
        dateFormat: props.dateFormat || 'H:i:S',
        stringFormat: props.stringFormat || 'HHmmss',
      };
    default: {
      const stringFormat = props.stringFormat || 'YYYYMMDD';
      const dateFormat = props.dateFormat || 'Y-m-d';
      return { dateFormat, stringFormat };
    }
  }
};

const dateCompare = (targetDates, selectDates, before = true) => {
  const result = [];
  targetDates.forEach((target) => {
    const targetDate = moment(target);
    selectDates.forEach((select) => {
      if ((before && targetDate.isBefore(select)) ||
          (!before && targetDate.isAfter(select)) ||
          targetDate.isSame(select)) result.push(select);
    });
  });

  return result;
};

class DatetimePicker extends Component {
  static setLocale(Locale, locale) {
    Flatpickr.localize(Locale);
    if (locale) moment.locale(locale);
  }

  constructor(props) {
    super(props);

    this.flatpickr = undefined;
    this.datetimeRef = undefined;
    this.type = uiType(props);
    this.dateStr = formatDateString(
      props.mode, props.defaultDate, this.type.dateFormat, this.type.stringFormat);

    this.onChange = this.onChange.bind(this);
    this.onChangeSuccess = this.onChangeSuccess.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClear = this.onClear.bind(this);
    this.setDatetime = this.setDatetime.bind(this);
    this.onChangeCallback = this.onChangeCallback.bind(this);

    this.state = {
      dateStr: this.dateStr,
      valueChange: false,
    };
  }

  componentDidMount() {
    const {
      children,
      readOnly,
      type,
      stringFormat,
      wrapper,
      className,
      style,
      iconSuccess,
      iconClear,
      iconOpen,
      afterOpen,
      afterClear,
      ...props
    } = this.props;

    this.flatpickr = flatpickr(this.datetimeRef, props, this.type, this.onChangeCallback);
    // if (this.props.defaultDate) this.setDatetime(this.props.defaultDate);
  }

  componentWillReceiveProps(nextProps) {
    this.dateStr = formatDateString(
      nextProps.mode, nextProps.defaultDate, this.type.dateFormat, this.type.stringFormat);
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
    this.flatpickr = undefined;
    this.datetimeRef = undefined;
    this.dateStr = undefined;
  }

  onChangeCallback(selectedDates, dateStr, instance) {
    if (this.props.mode === 'range' && (!selectedDates || (selectedDates && selectedDates.length < 2))) return;
    this.setState({ selectedDates, dateStr });
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
    this.setDatetime(this.state.dateStr);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onChangeSuccess();
    }
  }

  onOpen() {
    this.flatpickr.setDate(this.props.defaultDate, false, this.type.dateFormat);
    this.flatpickr.toggle();
    if (typeof this.props.afterOpen === 'function') {
      this.props.afterOpen(this.props.defaultDate, this.dateStr, this.flatpickr);
    }
  }

  onClear() {
    this.flatpickr.clear();
    if (typeof this.props.afterClear === 'function') {
      this.props.afterClear(this.props.defaultDate, this.dateStr, this.flatpickr);
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
            onChange={this.props.allowInput ? this.onChange : null}
            onKeyPress={this.onKeyPress}
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
export { formatDateString, dateCompare };
