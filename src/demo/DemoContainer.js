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
import Multiple from './Multiple';
import DatetimePicker, { setLocale, parseDate } from '../DatetimePicker';

setLocale(locale.ko);

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
        datetime: [parseDate('2011-11-30 20:10', 'Y-m-d H:i')],
        value: '',
      },
      value3: {
        datetime: [],
        value: '',
      },
      range: {
        datetime: [parseDate('2011-11-30 10:20:00', 'Y-m-d H:i:S'), parseDate('2011-12-30 10:20:00', 'Y-m-d H:i:S')],
        value: '',
      },
      multiple: {
        datetime: [parseDate('2011-11-30')],
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
              <a className="navbar-brand" href="./">
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
          <a target="_blank" rel="noopener noreferrer" href="https://codesandbox.io/s/v64l7r7mr5">
            <img alt="Edit React DatetimePicker Demo" src="https://codesandbox.io/static/img/play-codesandbox.svg" />
          </a>

          <p />
          <div>
            <h3>Date</h3>
            <div>
              <p>{this.state.value.value}</p>
              <DatetimePicker
                onChange={(datetime, value) => this.onDatetime(datetime, value, 'value')}
                defaultValue={[parseDate('2013-12-26')]}
                allowInput
              />
            </div>

            <p />

            <h3>Datetime</h3>
            <div>
              <p>{this.state.value2.value}</p>
              <DatetimePicker
                onChange={(datetime, value) => this.onDatetime(datetime, value, 'value2')}
                type="datetime"
                defaultDate={this.state.value2.datetime}
                className="input-group-sm"
              />
            </div>

            <p />

            <h3>Multiple Datetime</h3>
            <div>
              <Multiple />
            </div>

            <p />


            <h3>time</h3>
            <div>
              <p>{this.state.value3.value}</p>
              <DatetimePicker
                onChange={(datetime, value) => this.onDatetime(datetime, value, 'value3')}
                type="time"
                defaultValue={[parseDate('10:20:00', 'H:i:S')]}
                isDefaultValue
                defaultDate={this.state.value3.datetime}
                readOnly
                clickOpens={false}
              />
            </div>

            <p />

            <h3>Datetime Multiple</h3>
            <div>
              <p>{this.state.multiple.value}</p>
              <DatetimePicker
                onChange={(datetime, value) => this.onDatetime(datetime, value, 'multiple')}
                mode="multiple"
                defaultDate={this.state.multiple.datetime}
              />
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
                onChange={(datetime, value) => this.onDatetime(datetime, value, 'range')}
                type="datetime"
                defaultDate={this.state.range.datetime}
              />
            </div>

            <p />

            <h3>Custom UI : Input Group</h3>
            <InputGroup />

            <h3>Custom UI : Button</h3>
            <Button />
          </div>
        </div>
      </div>
    );
  }
}

export default DemoContainer;
