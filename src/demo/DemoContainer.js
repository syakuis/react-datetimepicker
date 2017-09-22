import React from 'react';
import DatetimePicker from '../DatetimePicker';

class DemoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeDatetime = this.onChangeDatetime.bind(this);

    this.state = {
      value: undefined,
    };
  }

  onChangeDatetime(value, datetime) {
    this.setState({ value });
  }

  render() {
    const Basic = (props) => {
      return (
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search for..." aria-label="Search for..." />
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button">
              <i className="fa fa-close" aria-hidden="true" />
            </button>
            <button className="btn btn-secondary" type="button" onClick={props.onOpen}>
              <i className="fa fa-calendar" aria-hidden="true" />
            </button>
          </span>
        </div>
      );
    };

    return (
      <div className="container">
        <nav id="navbar-demo" className="navbar navbar-light bg-light">
          <a className="navbar-brand" href>React-DatetimePicker</a>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a className="nav-link" href="#basic">Basic</a>
            </li>
          </ul>
        </nav>

        <p />

        <div data-spy="scroll" data-target="#navbar-demo" data-offset="0">
          <p className="h3" id="basic">Basic</p>
          <div>
            <DatetimePicker onChangeDatetime={this.onChangeDatetime} render={Basic} />
          </div>
        </div>
      </div>
    );
  }
}

export default DemoContainer;
