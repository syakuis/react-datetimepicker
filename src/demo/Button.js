import React, { Component } from 'react';

import DatetimePicker from '../DatetimePicker';

class Button extends Component {
  constructor(props) {
    super(props);

    this.onDatetime = this.onDatetime.bind(this);
    this.onOpen = this.onOpen.bind(this);

    this.datetimeRef = undefined;

    this.state = {
      datetime: [],
      value: '',
    };
  }

  onDatetime(datetime, value) {
    this.setState({ datetime, value });
  }

  onOpen() {
    this.datetimeRef.onOpen();
  }

  render() {
    return (
      <DatetimePicker
        ref={(node) => { this.datetimeRef = node; }}
        onChange={(datetime, value) => this.onDatetime(datetime, value)}
        defaultDate={this.state.datetime}
      >
        <button className="btn btn-success" type="button" onClick={this.onOpen}>
          {this.state.value || '선택'}
        </button>
      </DatetimePicker>
    );
  }
}

export default Button;
