import React, { useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Modal,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";
import { login, googleLogin, githubLogin, sawoLogin } from "../../network/ApiAxios";
import GoogleLogin from 'react-google-login';
import SawoLogin from 'sawo-react'

const Login = props => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [sawoOpen, setSawoOpen] = useState(false);

    const toggleSawoModal = () => {
        setSawoOpen(!sawoOpen);
    }

    async function verify() {
        const response = await githubLogin({ code: params[1] });
        const { data } = response;
        if (data.success) {
            setError("");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            props.history.push("/");
        } else {
            setPassword("");
            setError(data.msg);
        }
    }

    const url = window.location.href;
    let params = url.split('?');
    if (params && params.length === 2) {
        params = params[1].split('=');
        if (params && params.length === 2 && params[0] === 'code') verify();
    }

    const tryLogin = async () => {
        const response = await login(email, password);
        const { data } = response;
        if (data.success) {
            setError("");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            props.history.push("/");
        } else {
            setPassword("");
            setError(data.msg);
        }
    }

    const GoogleSuccess = async (user) => {
        const response = await googleLogin(user);
        const { data } = response;
        if (data.success) {
            setError("");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            props.history.push("/");
        } else {
            setPassword("");
            setError(data.msg);
        }
    }

    const GoogleFailure = (error) => {
        console.log(error);
    }

    const sawoLoginCallback = async (payload) => {
        console.log(payload);
        const response = await sawoLogin(payload);
        const { data } = response;
        if (data.success) {
            setError("");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            props.history.push("/");
        } else {
            setPassword("");
            setError(data.msg);
        }
    }
    
    const sawoConfig = {
        onSuccess: sawoLoginCallback ,
        identifierType: 'email',
        apiKey: process.env.REACT_APP_SAWO_API_KEY,
        containerHeight: '300px',
    }

    return (
        <>
            <Col lg="6" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3">
                            <small>Sign in with</small>
                        </div>
                        <div className="btn-wrapper text-center">
                            <Button
                                className="btn-neutral btn-icon"
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
                        <SawoLogin config={sawoConfig}/>
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
                            <small>Or sign in with credentials</small>
                        </div>
                        <Form role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Email" type="email" autoComplete="email" value={email}
                                        onChange={e => setEmail(e.target.value)} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Password" type="password" autoComplete="password" value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                </InputGroup>
                            </FormGroup>
                            {error ?
                                <div className="text-muted font-italic">
                                    <small>
                                        error:{" "}
                                        <span className="text-red font-weight-700">{error}</span>
                                    </small>
                                </div> : null}
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="button" onClick={tryLogin}>
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col xs="6">
                        <a
                            className="text-light"
                            onClick={() => props.history.push('/auth/reset-password')}
                        >
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                    <Col className="text-right" xs="6">
                        <a
                            className="text-light"
                            onClick={() => props.history.push('/auth/register')}
                        >
                            <small>Create new account</small>
                        </a>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default Login;
