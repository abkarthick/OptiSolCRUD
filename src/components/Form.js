import React, { Component } from 'react';
import { Form, Row, Col, Container, Button, Table } from 'react-bootstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


export default class Bio extends Component {

    constructor(props) {
        super(props);
        // this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.viewUsers = this.viewUsers.bind(this);
        this.state = {
            updatable: false,
            user: this.props.user,
            modalShow: false,
            toggleSubmit: false,
            showBtnToggle: false
        };
    }

    componentDidMount() {
        this.setState({
            user: this.props.user
        });
    }

    handleClear() {
        this.setState = ({
            updatable: true,
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumberExt: '',
            phoneNumber1: '',
            phoneNumber2: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            qualification: '',
            comments: '',
            toggleSubmit: false,
            showBtnToggle: false
        });
    }

    handleUpdate(val) {
        const singleUser = this.props.user.filter(user => user._id === val)[0];
        this.setState({
            updatable: true,
            _id: singleUser._id,
            firstName: singleUser.firstName,
            lastName: singleUser.lastName,
            email: singleUser.email,
            phoneNumberExt: (singleUser.phoneNumber).toString().split(" ")[0],
            phoneNumber1: (singleUser.phoneNumber).toString().split(" ")[1],
            phoneNumber2: (singleUser.phoneNumber).toString().split(" ")[2],
            address1: singleUser.address1,
            address2: singleUser.address2,
            city: singleUser.city,
            state: singleUser.state,
            zipCode: singleUser.zipCode,
            country: singleUser.country,
            qualification: singleUser.qualification,
            comments: singleUser.comments,
            toggleSubmit: true,
            showBtnToggle: false
        });
    }

    handleFormUpdate() {
        if (this.state._id && this.state._id != null) {
            this.props.updateUsers(
                this.state._id,
                this.state.firstName,
                this.state.lastName,
                this.state.email,
                this.state.phoneNumberExt.toString() + ' ' + this.state.phoneNumber1.toString() + ' ' + this.state.phoneNumber2.toString(),
                this.state.address1,
                this.state.address2,
                this.state.city,
                this.state.state,
                this.state.zipCode,
                this.state.country,
                this.state.qualification,
                this.state.comments
            );
        }
    }

    handleDelete(val) {
        this.props.deleteUsers(val);
    }

    viewUsers(val) {
        const singleUser = this.props.user.filter(user => user._id === val)[0];
        this.setState({
            _id: singleUser._id,
            firstName: singleUser.firstName,
            lastName: singleUser.lastName,
            email: singleUser.email,
            phoneNumber: singleUser.phoneNumber,
            address1: singleUser.address1,
            address2: singleUser.address2,
            city: singleUser.city,
            state: singleUser.state,
            zipCode: singleUser.zipCode,
            country: singleUser.country,
            qualification: singleUser.qualification,
            comments: singleUser.comments,
            toggleSubmit: false,
            showBtnToggle: true
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(values) {
        if (this.state._id && this.state._id != null) {
            values._id = this.state._id;
            this.props.updateUsers(values._id, values.firstName, values.lastName, values.email, values.phoneNumberExt.toString() + ' ' + values.phoneNumber1.toString() + ' ' + values.phoneNumber2.toString(), values.address1, values.address2, values.city, values.state, values.zipCode, values.country, values.qualification, values.comments);
            this.setState({ _id: null });
        } else {
            this.props.postUsers(values.firstName, values.lastName, values.email, values.phoneNumberExt.toString() + ' ' + values.phoneNumber1.toString() + ' ' + values.phoneNumber2.toString(), values.address1, values.address2, values.city, values.state, values.zipCode, values.country, values.qualification, values.comments);
        }
    }

    render() {
        return (
            <Container>
                <Row><Col><h1 className="title py-5"><strong>Bio Data</strong></h1></Col></Row>
                <Row>
                    <Col>
                        <div className="register">
                            <LocalForm model='user' onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="mb-3">

                                    <Form.Group as={Col}  >
                                        <Form.Label className="reg_txt form-label">Name <span>*</span></Form.Label>
                                        <Control.text model=".firstName" id="firstName" name="firstName" placeholder="First" className="form-control text input-name1"
                                            validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} value={this.state.firstName || null}
                                            onChange={e => this.setState({ firstName: e.target.value })} />
                                        <Errors className="text-danger" model=".firstName" show="touched"
                                            messages={{ required: 'Required ! ', minLength: 'Must be greater than 2 characters ! ', maxLength: 'Must be 15 characters or less ! ' }} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword" >
                                        <Form.Label className="reg_txt form-label">&nbsp;</Form.Label>
                                        <Control.text model=".lastName" id="lastName" name="lastName" placeholder="Last"
                                            className="form-control text input-name1" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} value={this.state.lastName || null}
                                            onChange={e => this.setState({ lastName: e.target.value })} />
                                        <Errors className="text-danger" model=".lastName" show="touched"
                                            messages={{ required: 'Required ! ', minLength: 'Must be greater than 2 characters ! ', maxLength: 'Must be 15 characters or less ! ' }} />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="reg_txt form-label">Email <span>*</span></Form.Label>
                                        {/* <Form.Control type="email" className='text input-name1' placeholder="Enter email" /> */}
                                        <Control.text model=".email" id="email" name="email" placeholder="Email" className="form-control text input-name1" validators={{ required, validEmail }} value={this.state.email || null}
                                            onChange={e => this.setState({ email: e.target.value })} />
                                        <Errors className="text-danger" model=".email" show="touched" messages={{ required: 'Required! ', validEmail: 'Invalid Email Address! ' }} />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label className="reg_txt form-label">Phone Number <span>*</span></Form.Label>

                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Control.text model=".phoneNumberExt" id="phoneNumberExt" name="phoneNumberExt" placeholder=""
                                            className="form-control text input-name1" validators={{ required, minLength: minLength(2), maxLength: maxLength(3), isNumber }} value={this.state.phoneNumberExt || '+91'}
                                            onChange={e => this.setState({ phoneNumberExt: e.target.value })} />
                                        <Errors className="text-danger" model=".phoneNumberExt" show="touched"
                                            messages={{
                                                required: 'Required! ',
                                                minLength: 'Must be greater than 2 numbers! ',
                                                maxLength: 'Must be 15 numbers or less! ',
                                                isNumber: 'Must be a number! '
                                            }}
                                        />
                                    </Form.Group>
                                    <div className="line">-</div>
                                    <Form.Group as={Col}>
                                        <Control.text model=".phoneNumber1"
                                            id="phoneNumber1"
                                            name="phoneNumber1"
                                            defaultValue={'12345'}
                                            placeholder=""
                                            className="form-control text input-name1"
                                            validators={{ required, minLength: minLength(4), maxLength: maxLength(4), isNumber }} value={this.state.phoneNumber1 || '1234'}
                                            onChange={e => this.setState({ phoneNumber1: e.target.value })} />
                                        <Errors
                                            className="text-danger"
                                            model=".phoneNumber1"
                                            show="touched"
                                            messages={{
                                                required: 'Required! ',
                                                minLength: 'Must be greater than 3 numbers! ',
                                                maxLength: 'Must be 4 numbers or less! ',
                                                isNumber: 'Must be a number! '
                                            }}
                                        />
                                    </Form.Group>
                                    <div className="line">-</div>
                                    <Form.Group as={Col}>
                                        <Control.text model=".phoneNumber2" id="phoneNumber2" name="phoneNumber2"
                                            defaultValue={'12345'}
                                            placeholder="" className="form-control text input-name1"
                                            validators={{
                                                required, minLength: minLength(6), maxLength: maxLength(8), isNumber
                                            }}
                                            value={this.state.phoneNumber2 || "1234567"}
                                            onChange={e => this.setState({ phoneNumber2: e.target.value })}
                                        />
                                        <Errors className="text-danger" model=".phoneNumber2" show="touched"
                                            messages={{
                                                required: 'Required! ',
                                                minLength: 'Must be greater than 2 numbers! ',
                                                maxLength: 'Must be 15 numbers or less! ',
                                                isNumber: 'Must be a number! '
                                            }}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label className="reg_txt form-label">Address <span>*</span></Form.Label>
                                        {/* <Form.Control type="text" className="text input-name1" placeholder="Line 1" /> */}
                                        <Control.text model=".address1" id="address1" name="address1" placeholder="Line 1"
                                            className="form-control text input-name1" validators={{ required }} value={this.state.address1 || null} />
                                        <Errors className="text-danger" model=".address1" show="touched" messages={{ required: 'Required! ' }}
                                            onChange={e => this.setState({ address1: e.target.value })} />
                                        <br />
                                        {/* <Form.Control type="text" className="text input-name1" placeholder="Line 2" /> */}
                                        <Control.text model=".address2" id="address2" name="address2" placeholder="Line 2" className="form-control text input-name1"
                                            validators={{ required }} value={this.state.address2} />
                                        <Errors className="text-danger" model=".address2" show="touched" messages={{ required: 'Required! ' }}
                                            onChange={e => this.setState({ address2: e.target.value })} />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        {/* <Form.Control type="text" className="text input-name1" placeholder="City" /> */}
                                        <Control.text model=".city" id="city" name="city" placeholder="City" className="form-control text input-name1" value={this.state.city || null}
                                            onChange={e => this.setState({ city: e.target.value })} />
                                        <Errors className="text-danger" model=".city" show="touched" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        {/* <Form.Control type="text" className="text input-name1" placeholder="State" /> */}
                                        <Control.text model=".state" id="state" name="state" placeholder="State" className="form-control text input-name1" value={this.state.state || null}
                                            onChange={e => this.setState({ state: e.target.value })} />
                                        <Errors className="text-danger" model=".state" show="touched" />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        {/* <Form.Control type="text" className="text input-name1" placeholder="Zipcode" /> */}
                                        <Control.text model=".zipCode" id="zipCode" name="zipCode" placeholder="Zipcode" className="form-control text input-name1"
                                            value={this.state.zipCode}
                                            onChange={e => this.setState({ zipCode: e.target.value })} />
                                        <Errors className="text-danger" model=".zipCode" show="touched" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPassword" >
                                        {/* <Form.Control type="text" className="text input-name1" placeholder="Country" /> */}
                                        <Control.text model=".country" id="country" name="country" placeholder="Country" className="form-control text input-name1" value={this.state.country || null} onChange={e => this.setState({ country: e.target.value })} />
                                        <Errors className="text-danger" model=".zipcountrycode" show="touched" />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="reg_txt form-label">Write Your qualification <span>*</span></Form.Label>
                                        {/* <Form.Control type="email" className='text input-name1' placeholder="Write Your qualification" /> */}
                                        <Control.text model=".qualification" id="qualification" name="qualification" placeholder="Write Your qualification" className="form-control text input-name1" validators={{ required }} value={this.state.qualification || null} onChange={e => this.setState({ qualification: e.target.value })} />
                                        <Errors className="text-danger" model=".qualification" show="touched" messages={{ required: 'Required! ' }} />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="reg_txt form-label">Comment <span>*</span></Form.Label>
                                        {/* <Form.Control as="textarea" rows={3} className='text input-name1' placeholder="Write Your qualification" /> */}
                                        <Control.textarea model=".comments" id="comments" name="comments" placeholder="Comments" className="form-control text input-name1" validators={{ required }} value={this.state.comments || null} onChange={e => this.setState({ comments: e.target.value })} />
                                        <Errors className="text-danger" model=".comments" show="touched" messages={{ required: 'Required! ' }} />

                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3">
                                        <Control.text type='hidden' model="._id" id="_id" name="_id" className="form-control text input-name1" value={this.state._id || null} onChange={e => this.setState({ _id: e.target.value })} />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3">
                                        <div className="form-group">
                                            {!this.state.showBtnToggle ? (this.state.toggleSubmit ?

                                                (<Button type="button" variant="primary" className="btn btn-primary submit w-100" onClick={() => this.handleFormUpdate(this.state._id)}>Update</Button>) :

                                                (<Button type="submit" variant="primary" className="btn btn-primary submit w-100">Submit</Button>)) : ''}

                                            <br /><br />
                                            <Button type="button" model="user" className="text input-name1 w-25" onClick={() => this.handleClear()}>New</Button>
                                        </div>
                                    </Form.Group>
                                </Row>

                            </LocalForm>
                        </div>
                    </Col>
                    <Col>
                        <Row>
                            <div className="col tabt">
                                <Table>
                                    <tbody>
                                        <tr className="ztxt"><th>Name</th><th>Email</th><th>Phone</th><th>Edit</th><th>Delete</th><th>View</th></tr>
                                        {this.state?.user.length ? this.state?.user.map((item, i) => (
                                            <tr key={i}>
                                                <td>{item.firstName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td><button className="ed" data-id={item._id} onClick={() => this.handleUpdate(item._id)}>Edit</button></td>
                                                <td><button className="ed" style={{ background: "#f00" }} data-id={item._id} onClick={() => (window.confirm("Are you sure to delete ?") == true) ? this.handleDelete(item._id) : null}>Delete</button></td>
                                                <td><button className="ed" style={{ background: "#000" }} data-id={item._id} onClick={() => this.viewUsers(item._id)}>View</button></td>
                                            </tr>
                                        )) : ''}
                                    </tbody>
                                </Table>

                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
