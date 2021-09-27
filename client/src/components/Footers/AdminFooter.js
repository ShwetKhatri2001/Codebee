import React from "react";
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2021{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://github.com/ShwetKhatri2001/codebee"
                rel="noopener noreferrer"
                target="_blank"
              >
                Code Bee
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://github.com/ShwetKhatri2001/codebee"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Code Bee
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://github.com/ShwetKhatri2001/codebee"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  About Project
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://shwetkhatri2001.github.io/Shwet-Portfolio"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  About Us
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
