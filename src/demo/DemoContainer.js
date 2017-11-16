/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 26.
 */

import React from 'react';

import locale from 'flatpickr/dist/l10n/ko';
import 'flatpickr/dist/flatpickr.min.css';

import InputGroup from './InputGroup';
import Button from './Button';

const DatetimePicker = (process.env.SOURCE_TARGET === 'node') ? require('react-datetimepicker-syaku').default : require('../DatetimePicker').default;

DatetimePicker.setLocale(locale.ko, 'ko');

class DemoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onDatetime = this.onDatetime.bind(this);

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

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                React Datetime Picker
              </a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                  <a target="_blank" rel="noopener noreferrer" className="nav-link" href="https://github.com/syakuis/react-datetimepicker"><i className="fa fa-github" /> GitHub</a>
                </li>
                <li className="nav-item">
                  <a target="_blank" rel="noopener noreferrer" className="nav-link" href="https://www.npmjs.com/package/react-datetimepicker-syaku"><i className="fa fa-link" /> npm</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div>
          <p />
          <div>

            <h3>Date</h3>
            <div>
              <p>{this.state.value.value}</p>
              <DatetimePicker
                onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value')}
                defaultDate="20111220"
                allowInput
              />
              <p />
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

            <h3>Datetime</h3>
            <div>
              <p>{this.state.value2.value}</p>
              <DatetimePicker
                onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value2')}
                type="datetime"
                defaultDate="2011-11-30 20:10"
                className="input-group-sm"
              />
              <p />
              <pre>
                {`
                  <DatetimePicker
                    onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value2')}
                    type="datetime"
                    defaultDate="2011-11-30 20:10"
                    className="input-group-sm"
                  />
                `}
              </pre>
            </div>

            <p />

            <h3>time</h3>
            <div>
              <p>{this.state.value3.value}</p>
              <DatetimePicker
                onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value3')}
                type="time"
                readOnly
                clickOpens={false}
              />
              <p />
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

            <h3>Datetime Multiple</h3>
            <div>
              <p>{this.state.multiple.value}</p>
              <DatetimePicker
                onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'multiple')}
                mode="multiple"
                defaultDate="2011-11-30"
              />
              <p />
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

            <h3>Datetime Range</h3>
            <div>
              <p>{this.state.range.value}</p>
              {
                this.state.range.datetime
                  .map(item => <p key={item.toString()}>{item.toString()}</p>)
              }
              <DatetimePicker
                mode="range"
                onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'range')}
                type="datetime"
                defaultDate={['2011-11-30 10:20', '201112301020']}
              />
              <p />
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

            <h3>Custom UI : Input Group</h3>
            <InputGroup />
            <p />
            <pre>
              {`
              <DatetimePicker
                ref={(node) => { this.datetimeRef = node; }}
                onDatetime={(datetime, value) => this.onDatetime(datetime, value)}
              >
                <div>
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                  />
                  <span>
                    {
                      this.state.valueChange ?
                        <button type="button" onClick={this.onChangeSuccess}>
                          <i className="fa fa-check" aria-hidden="true" />
                        </button> : null
                    }
                    <button type="button" onClick={this.onClear}>
                      삭제
                    </button>
                    <button type="button" onClick={this.onOpen}>
                      선택
                    </button>
                  </span>
                </div>
              </DatetimePicker>
              `}
            </pre>

            <h3>Custom UI : Button</h3>
            <Button />
            <p />
            <pre>
              {`
                <DatetimePicker
                  ref={(node) => { this.datetimeRef = node; }}
                  onDatetime={(datetime, value) => this.onDatetime(datetime, value)}
                >
                  <button className="btn btn-secondary" type="button" onClick={this.onOpen}>
                    {this.state.value || '선택'}
                  </button>
                </DatetimePicker>
              `}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default DemoContainer;
