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
  onDatetime: PropTypes.func,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  stringFormat: PropTypes.string,
  wrapper: PropTypes.string,
  className: PropTypes.string,

  // flatpickr config
  dateFormat: PropTypes.string,
  defaultDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  clickOpens: PropTypes.bool,
  allowInput: PropTypes.bool,
};

const defaultProps = {
  children: undefined,
  onDatetime: undefined,
  readOnly: false,
  type: 'date', // date, datetime, time
  stringFormat: 'YYYYMMDD',
  wrapper: 'div',
  className: undefined,

  // flatpickr config
  mode: 'single', // "single", "multiple", or "range"
  wrap: false, // 달력을 커스텀하게 만들 수 있다.
  inline: false, // 달력 표시
  parseDate: false, // 선택된 날짜 데이터를 Date object 와 string 으로 반환여부

  disableMobile: false,
  enable: [], // 해당 날짜만 선택할 수 있다.
  disable: [], // 해당 날짜를 선택할 수 없게 한다.

  dateFormat: 'Y-m-d',
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

  locale: undefined,
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

class DatetimePicker extends Component {
  static setLocale(Locale, locale) {
    Flatpickr.localize(Locale);
    if (locale) moment.locale(locale);
  }
  constructor(props) {
    super(props);

    this.flatpickr = undefined;
    this.datetimeRef = undefined;
    this.type = {};

    switch (this.props.type) {
      case 'datetime':
        this.type = {
          noCalendar: false,
          enableTime: true,
          dateFormat: 'Y-m-d H:i',
          stringFormat: 'YYYYMMDDHHmm',
        };
        break;
      case 'time':
        this.type = {
          noCalendar: true,
          enableTime: true,
          enableSeconds: true,
          dateFormat: 'H:i:S',
          stringFormat: 'HHmmss',
        };
        break;
      default: {
        const { dateFormat, stringFormat } = props;
        this.type = { dateFormat, stringFormat };
        break;
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onChangeSuccess = this.onChangeSuccess.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClear = this.onClear.bind(this);
    this.setDatetime = this.setDatetime.bind(this);
    this.onChangeCallback = this.onChangeCallback.bind(this);

    this.state = {
      datetime: [],
      value: '',
      valueChange: false,
    };
  }

  componentDidMount() {
    const {
      children, onDatetime, readOnly, type, stringFormat, wrapper, className, ...props
    } = this.props;

    this.flatpickr = new Flatpickr(this.datetimeRef, {
      ...props,
      ...this.type,
      wrap: false,
      inline: false,
      clickOpens: false,
      allowInput: false,
      parseDate: (date) => {
        const d = moment(date, this.type.stringFormat);
        return d.isValid() ? d.toDate() : null;
      },
      onChange: this.onChangeCallback,
    });

    if (this.props.defaultDate) this.flatpickr.setDate(this.props.defaultDate, true);
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
    this.flatpickr = undefined;
    this.datetimeRef = undefined;
  }

  onChangeCallback(datetime, value) {
    this.setState({ datetime, value });
    if (typeof this.props.onDatetime === 'function') this.props.onDatetime(datetime, value);

    // this.flatpickr.setDate('2011-12-20', false);
    // this.flatpickr.toggle();
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
      valueChange: true,
    });
  }

  onChangeSuccess() {
    this.setDatetime(this.state.value);
    this.setState({
      valueChange: false,
    });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onChangeSuccess();
    }
  }

  onOpen() {
    this.flatpickr.toggle();
  }

  onClear() {
    this.flatpickr.clear();
  }

  setDatetime(value, triggerChange = true) {
    this.flatpickr.setDate(value, triggerChange, this.type.dateFormat);
  }

  render() {
    return (
      this.props.children ?
        React.createElement(
          this.props.wrapper,
          {
            className: this.props.className,
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
            value={this.state.value}
            onChange={this.props.allowInput ? this.onChange : null}
            onKeyPress={this.onKeyPress}
            onClick={this.props.clickOpens && !this.props.allowInput ? this.onOpen : null}
          />
          <span className="input-group-btn">
            {
              this.state.valueChange ?
                <button className="btn btn-secondary" type="button" onClick={this.onChangeSuccess}>
                  <i className="fa fa-check" aria-hidden="true" />
                </button> : null
            }
            <button className="btn btn-secondary" type="button" onClick={this.onClear}>
              <i className="fa fa-close" aria-hidden="true" />
            </button>
            <button className="btn btn-secondary" type="button" onClick={this.onOpen}>
              <i className="fa fa-calendar" aria-hidden="true" />
            </button>
          </span>
        </div>
    );
  }
}

DatetimePicker.propTypes = propTypes;
DatetimePicker.defaultProps = defaultProps;

export default DatetimePicker;
