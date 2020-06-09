// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

/**
 * Renders an information card using Bootstrap classes
 * Properties: title
 */
export class Card extends Component<{ title?: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

/**
 * Renders a row using Bootstrap classes
 */
export class Row extends Component<{ children?: React.Node }> {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes
 * Properties: width, right
 */
export class Column extends Component<{ width?: number, right?: boolean, children?: React.Node }> {
  render() {
    return (
      <div
        className={'col' + (this.props.width ? '-' + this.props.width : '') + (this.props.right ? ' text-right' : '')}
      >
        {this.props.children}
      </div>
    );
  }
}

/**
 * Renders a success button using Bootstrap styles
 * Properties: onClick
 */
class ButtonSuccess extends Component<{ onClick?: () => mixed, children?: React.Node }> {
  render() {
    return (
      <button type="button" className="btn btn-success" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a danger button using Bootstrap styles
 * Properties: onClick
 */
class ButtonDanger extends Component<{ onClick?: () => mixed, children?: React.Node }> {
  render() {
    return (
      <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a light button using Bootstrap styles
 * Properties: onClick
 */
class ButtonLight extends Component<{ onClick?: () => mixed, children?: React.Node }> {
  render() {
    return (
      <button type="button" className="btn btn-light" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a button using Bootstrap styles
 * Properties: onClick
 */
export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
}

/**
 * Renders a NavBar link using Bootstrap styles
 * Properties: to
 */
class NavBarLink extends Component<{ to: string, children?: React.Node }> {
  render() {
    return (
      <NavLink className="nav-link" activeClassName="active" to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}

/**
 * Renders a NavBar using Bootstrap classes
 * Properties: brand
 */
export class NavBar extends Component<{ brand?: React.Node, children?: React.Node }> {
  static Link = NavBarLink;

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
        {
          <NavLink className="navbar-brand" activeClassName="active" exact to="/">
            {this.props.brand}
          </NavLink>
        }
        <ul className="navbar-nav">{this.props.children}</ul>
      </nav>
    );
  }
}

/**
 * Renders a form label using Bootstrap styles
 */
class FormLabel extends Component<{ children?: React.Node }> {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

/**
 * Renders a form input using Bootstrap styles
 * Properties: type, value, onChange, required, pattern
 */
class FormInput extends Component<{
  type?: string,
  value?: React.Node,
  onChange?: (SyntheticEvent<HTMLInputElement>) => mixed,
  required?: boolean
}> {
  render() {
    return (
      <input
        className="form-control"
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
        required={this.props.required}
      />
    );
  }
}

/**
 * Renders form components using Bootstrap styles
 */
export class Form {
  static Label = FormLabel;
  static Input = FormInput;
}
