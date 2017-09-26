/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 26.
 */

import React from 'react';

import locale from 'flatpickr/dist/l10n/ko';
import 'flatpickr/dist/flatpickr.min.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import DatetimePicker from '../DatetimePicker';

DatetimePicker.setLocale(locale.ko, 'ko');

class DemoContainer extends React.Component {
  constructor(props) {
    super(props);


    this.onDatetime = this.onDatetime.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeSuccess = this.onChangeSuccess.bind(this);
    this.onClear = this.onClear.bind(this);

    this.datetimeRef = undefined;

    this.state = {
      value: {
        datetime: [],
        value: '',
      },
      value2: {
        datetime: [],
        value: '',
      },
      value3: {
        datetime: [],
        value: '',
      },
      custom: {
        datetime: [],
        value: '',
        valueChange: false,
      },
      range: {
        datetime: [],
        value: '',
      },
      multiple: {
        datetime: [],
        value: '',
      },
    };
  }

  onDatetime(datetime, value, name) {
    this.setState({ [name]: { datetime, value } });
  }

  onOpen() {
    this.datetimeRef.onOpen();
  }

  onChange(e) {
    this.setState({
      custom: {
        value: e.target.value,
        valueChange: true,
      },
    });
  }

  onChangeSuccess() {
    this.datetimeRef.setDatetime(this.state.custom.value);
  }

  onClear() {
    this.datetimeRef.onClear();
  }

  render() {
    return (
      <div className="container">
        <nav id="navbar-demo" className="navbar navbar-light bg-light">
          <a className="navbar-brand" href>React-DatetimePicker</a>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a className="nav-link" href="#date">date</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#datetime">datetime</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#time">time</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#multiple">multiple</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#range">range</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#custom">custom</a>
            </li>
          </ul>
        </nav>

        <p />
        <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">

          <p className="h3" id="date">Date</p>
          <div>
            <p>{this.state.value.value}</p>
            <DatetimePicker
              onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value')}
              defaultDate="20111220"
              allowInput
            />
            <pre>
              {`
                <DatetimePicker
                  onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value')}
                  defaultDate="20111220"
                  allowInput
                />
              `}
            </pre>
          </div>

          <p />

          <p className="h3" id="datetime">Datetime</p>
          <div>
            <p>{this.state.value2.value}</p>
            <DatetimePicker
              onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value2')}
              type="datetime"
              defaultDate="2011-11-30 20:10"
            />
            <pre>
              {`
                <DatetimePicker
                  onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value2')}
                  type="datetime"
                  defaultDate="2011-11-30 20:10"
                />
              `}
            </pre>
          </div>

          <p />

          <p className="h3" id="time">time</p>
          <div>
            <p>{this.state.value3.value}</p>
            <DatetimePicker
              onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value3')}
              type="time"
              readOnly
              clickOpens={false}
            />
            <pre>
              {`
                <DatetimePicker
                  onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value3')}
                  type="time"
                  readOnly
                  clickOpens={false}
                />
              `}
            </pre>
          </div>

          <p />

          <p className="h3" id="multiple">Datetime Multiple</p>
          <div>
            <p>{this.state.multiple.value}</p>
            <DatetimePicker
              onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'multiple')}
              mode="multiple"
              defaultDate="2011-11-30"
            />
            <pre>
              {`
                <DatetimePicker
                  onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'multiple')}
                  mode="multiple"
                  defaultDate="2011-11-30"
                />
              `}
            </pre>
          </div>

          <p />

          <p className="h3" id="range">Datetime Range</p>
          <div>
            <p>{this.state.range.value}</p>
            {
              this.state.range.datetime.map(item => <p key={item.toString()}>{item.toString()}</p>)
            }
            <DatetimePicker
              mode="range"
              onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'range')}
              type="datetime"
              defaultDate={['2011-11-30 10:20', '201112301020']}
            />
            <pre>
              {`
                <DatetimePicker
                  mode="range"
                  onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'range')}
                  type="datetime"
                  defaultDate={['2011-11-30 10:20', '201112301020']}
                />
              `}
            </pre>
          </div>

          <p />

          <p className="h3" id="custom">Custom UI</p>
          <div>
            <p>{this.state.custom.value}</p>
            <DatetimePicker
              ref={(node) => { this.datetimeRef = node; }}
              onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'custom')}
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.custom.value}
                  onChange={this.onChange}
                />
                <span className="input-group-btn">
                  {
                    this.state.custom.valueChange ?
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
            <pre>
              {`
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.custom.value}
                    onChange={this.onChange}
                  />
                  <span className="input-group-btn">
                    {
                      this.state.custom.valueChange ?
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
              `}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default DemoContainer;
