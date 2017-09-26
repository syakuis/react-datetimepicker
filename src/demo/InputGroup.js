import React, { Component } from 'react';

import DatetimePicker from '../DatetimePicker';

class InputGroup extends Component {
  constructor(props) {
    super(props);

    this.onDatetime = this.onDatetime.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeSuccess = this.onChangeSuccess.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.datetimeRef = undefined;

    this.state = {
      datetime: [],
      value: '',
      valueChange: false,
    };
  }

  onDatetime(datetime, value) {
    this.setState({ datetime, value });
  }

  onOpen() {
    this.datetimeRef.onOpen();
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
      valueChange: true,
    });
  }

  onChangeSuccess() {
    this.datetimeRef.setDatetime(this.state.value);
  }

  onClear() {
    this.datetimeRef.onClear();
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onChangeSuccess();
    }
  }

  render() {
    return (
      <DatetimePicker
        ref={(node) => { this.datetimeRef = node; }}
        onDatetime={(datetime, value) => this.onDatetime(datetime, value)}
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={this.state.value}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
          />
          <span className="input-group-btn">
            {
              this.state.valueChange ?
                <button className="btn btn-secondary" type="button" onClick={this.onChangeSuccess}>
                  <i className="fa fa-check" aria-hidden="true" />
                </button> : null
            }
            <button className="btn btn-secondary" type="button" onClick={this.onClear}>
              삭제
            </button>
            <button className="btn btn-secondary" type="button" onClick={this.onOpen}>
              선택
            </button>
          </span>
        </div>
      </DatetimePicker>
    );
  }
}

export default InputGroup;
