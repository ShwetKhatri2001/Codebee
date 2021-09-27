import React, { useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col
} from "reactstrap";
import Toast from 'react-bootstrap/Toast'
import { register, googleLogin } from "../../network/ApiAxios";
import GoogleLogin from 'react-google-login';

const Register = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("Email sent! Click on the link to verify yourself, then login (Check in spam folder as well).");
    const [userID, setUserID] = useState(null);
    const [sawoOpen, setSawoOpen] = useState(false);

    const toggleSawoModal = () => {
        setSawoOpen(!sawoOpen);
    }

    const registerUser = async () => {
        if (!(name && email && password && confirmPassword && checkbox)) {
            setError("Make sure to fill all the inputs and agree to the privacy policy");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const response = await register(name, email, password);
        const { data } = response;
        if (!data.success) {
            setError(data.msg);
            return;
        }
        setError("");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCheckbox(false);
        setShowToast(true);
    };


    const GoogleSuccess = async (user) => {
        const response = await googleLogin(user);
        const { data } = response;
        if (!data.success) {
            setError(data.msg);
            return;
        }
        setError("");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        props.history.push("/");
    }

    const GoogleFailure = (error) => {
        console.log(error);
    }

    return (
        <>
            <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                    position: 'fixed',
                    minHeight: '100px',
                    width: "35%",
                    right: 10,
                    bottom: 80,
                    zIndex: 50
                }}
            >
                <Toast style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10
                }} onClose={() => setShowToast(false)} show={showToast} delay={10000} autohide={true}>
                    <Toast.Header>
                        <img style={{ height: "30px", width: "100px" }} src={require("assets/img/brand/argon-react.png").default} alt="..." />
                    </Toast.Header>
                    <Toast.Body>
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </div>
            <Col lg="6" md="8">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-4">
                            <small>Sign up with</small>
                        </div>
                        <div className="text-center">
                            <Button
                                className="btn-neutral btn-icon mr-4"
                                color="default"
                                href="https://github.com/login/oauth/authorize/?client_id=510b187edd263818bb91&scope=user:email"
                            >
                                <span className="btn-inner--icon">
                                    <img
                                        alt="..."
                                        src={require("assets/img/icons/common/github.svg").default}
                                    />
                                </span>
                                <span className="btn-inner--text">Github</span>
                            </Button>
                            <GoogleLogin
                                clientId={'1074810629717-uh5m2u4mphnel9pgll5bog05oc9aglr6.apps.googleusercontent.com'}
                                render={renderProps => (
                                    <Button
                                        className="btn-neutral btn-icon"
                                        color="default"
                                        onClick={renderProps.onClick}
                                    >
                                        <span className="btn-inner--icon">
                                            <img
                                                alt="..."
                                                src={require("assets/img/icons/common/google.svg").default}
                                            />
                                        </span>
                                        <span className="btn-inner--text">Google</span>
                                    </Button>
                                )}
                                onSuccess={GoogleSuccess}
                                onFailure={GoogleFailure}
                                cookiePolicy={'single_host_origin'}
                            />
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                onClick={() => toggleSawoModal()}
                            >
                                <span className="btn-inner--icon">
                                    <img
                                        alt="..."
                                        src={require("assets/img/icons/common/sawo-icon.png").default}
                                    />
                                </span>
                                <span className="btn-inner--text">Sawo Labs</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <Modal
                    className="modal-dialog-centered"
                    isOpen={sawoOpen}
                    toggle={() => toggleSawoModal()}
                    >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Login with Sawo
                        </h5>
                        <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => toggleSawoModal()}
                        >
                        <span aria-hidden={true}>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div id="sawo-container">Under Development...</div>
                      </div>
                      <div className="modal-footer">
                        <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => toggleSawoModal()}
                        >
                        Close
                        </Button>
                      </div>
                    </Modal>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Or sign up with credentials</small>
                        </div>
                        <Form role="form">
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Name" type="text" value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Email" type="email" autoComplete="new-email" value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Password" type="password" autoComplete="new-password" value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Confirm Password" type="password" autoComplete="new-password" value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            {error ?
                                <div className="text-muted font-italic">
                                    <small>
                                        error:{" "}
                                        <span className="text-red font-weight-700">{error}</span>
                                    </small>
                                </div> : null}
                            <Row className="my-4">
                                <Col xs="12">
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                            className="custom-control-input"
                                            id="customCheckRegister"
                                            type="checkbox"
                                            checked={checkbox}
                                            onChange={() => setCheckbox(!checkbox)}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheckRegister"
                                        >
                                            <span className="text-muted">
                                                I agree with the{" "}
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    Privacy Policy
                                                </a>
                                            </span>
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <Button onClick={registerUser} className="mt-4" color="primary" type="button">
                                    Create account
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default Register;
