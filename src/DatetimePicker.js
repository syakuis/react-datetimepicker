/**
 * flatpickr 를 이용한 날짜와 시간 선택기
 *
 * flatpickr 기능중 지원하지 않는 것들.
 * inline, wrap
 * 위 기능은 내부적으로 사용되므로 제어할 수 없다.
 *
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 22.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'flatpickr';
import locale from 'flatpickr/dist/l10n/ko';
import 'flatpickr/dist/flatpickr.min.css';

const propTypes = {
  datetimeRef: PropTypes.func,
  timePicker: PropTypes.bool,
  onChangeDatetime: PropTypes.func,
  value: PropTypes.string,
  render: PropTypes.func,
};

const defaultProps = {
  render: undefined,
  datetimeRef: undefined,
  timePicker: false,
  onChangeDatetime: undefined,
  value: undefined,

  // flatpickr config
  mode: 'single', // "single", "multiple", or "range"
  wrap: false, // 달력을 커스텀하게 만들 수 있다.
  inline: false, // 달력 표시
  parseDate: false, // 선택된 날짜 데이터를 Date object 와 string 으로 반환여부

  disableMobile: false,
  enable: [], // 해당 날짜만 선택할 수 있다.
  disable: [], // 해당 날짜를 선택할 수 없게 한다.

  dateFormat: 'Y-m-d',
  defaultDate: null,
  noCalendar: false, // 날짜 선택기 숨김 enableTime = true 시간 선택기 활성화됨.
  weekNumbers: false, // 주 번호를 표시한다.
  shorthandCurrentMonth: false, // 축약된 월 이름으로 사용여부

  time_24hr: false, // AM:PM 선택기 사용하지 않고 24시로 표시여부
  defaultHour: 12,
  defaultMinute: 0,
  enableTime: false, // 시간 선택기 사용여부
  enableSeconds: false, // 시간 선택기에 초 선택 사용여부
  hourIncrement: 1, // 시간 입력 단계를 조정합니다 (스크롤 포함).
  minuteIncrement: 5, // 분 입력 단계를 조정합니다 (스크롤 포함).

  locale: locale.ko,
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
  constructor(props) {
    super(props);

    this.flatpickr = undefined;
    this.datetimeRef = undefined;

    this.onChange = this.onChange.bind(this);

    this.state = {
      datetime: undefined,
      value: undefined,
    };
  }

  componentDidMount() {
    this.flatpickr = new Flatpickr(this.datetimeRef, {
      ...this.getProps(),
      wrap: false,
      inline: false,
      clickOpens: false,
      onChange: this.onChange,
    });

    if (typeof this.props.datetimeRef === 'function') {
      this.props.datetimeRef(this.datetimeRef);
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
    this.flatpickr = undefined;
    this.datetimeRef = undefined;
    if (typeof this.props.datetimeRef === 'function') {
      this.props.datetimeRef(undefined);
    }
  }

  onChange(datetime, value) {
    this.setState({ datetime, value });
    if (typeof this.props.onChangeDatetime === 'function') this.props.onChangeDatetime(value, datetime);

    // this.flatpickr.setDate('2011-12-20', false);
    // this.flatpickr.toggle();
  }

  onOpen() {
    this.flatpickr.toggle();
  }

  onClean() {
    console.log('object');
    this.flatpickr.clean();
  }

  getProps() {
    const { render: Render, value, onChangeDatetime, ...props } = this.props;
    return props;
  }

  render() {
    const Render = this.props.render;
    if (Render) {
      return (
        <Render
          {...this.getProps()}
          ref={(node) => { this.datetimeRef = node; }}
          onOpen={this.onOpen}
        />
      );
    }
    return (
      <span ref={(node) => { this.datetimeRef = node; }}>
        {this.props.children}
      </span>
    );
  }
}

DatetimePicker.propTypes = propTypes;
DatetimePicker.defaultProps = defaultProps;

export default DatetimePicker;
