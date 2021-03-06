import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

import HeaderComponent from '../header/HeaderComponent';


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

import axios from 'axios';

class HelpSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            helpcontent: [],
            isHelpAdd: false,
            isHelpQABtn: true,
            HelpContentLength: false,
            ishelpform: false,
            showError: false,
            showAlert: false,
            showAnswer: false,
            FAQcontentshow: false,
            modal14: false,


            Question: '',
            Answer: '',
            answerId: '',
            questionId: ''

        }
    }

    addHelpQA = () => {
        console.log('HelpQA')
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API}Admin/fetchFAQ`).then(res => res.json())
            .then((res) => {
                if (res.isSuccess === false) {
                    console.log(res.message)
                    this.setState({ HelpContentLength: true, })
                }
                else {
                    console.log('result-->', res.result)
                    this.setState({ helpcontent: res.result, FAQcontentshow: true , HelpContentLength : false })
                }
            });
    }

    uploadFAQ = () => {
        const { Question, Answer } = this.state;
        console.log(Question)
        console.log(Answer)

        if (Question.length === 0 && Answer.length === 0) {
            this.setState({ showError: true })

            setTimeout(() => {
                this.setState({ showError: false })
            }, 6000);
        }
        else {
            fetch(`${process.env.REACT_APP_API}Admin/FAQ`, {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: 'POST',
                body: JSON.stringify({
                    Question: Question,
                    Answer: Answer,
                })
            }).then(res => res.json())
                .then((res) => {
                    if (res.isSuccess === false) {
                        this.setState({
                            isErrorMsg: true, ishelpform: false,
                        })

                        setTimeout(() => {
                            this.setState({
                                isErrorMsg: false, ishelpform: true,
                            })
                        }, 5000);
                    }
                    else {
                        this.setState({ showAlert: true, Question: '', Answer: '', ishelpform: false, })
                        setTimeout(() => {
                            this.setState({ showAlert: false,ishelpform : true})
                        }, 4000);
                    }
                });
        }
    }
    addMoreQuestions = () => {
        const { Question, Answer } = this.state;
        console.log(Question)
        console.log(Answer)

        if (Question.length === 0 && Answer.length === 0) {
            this.setState({ showError: true })

            setTimeout(() => {
                this.setState({ showError: false })
            }, 6000);
        }
        else {
            fetch(`${process.env.REACT_APP_API}Admin/FAQ`, {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: 'POST',
                body: JSON.stringify({
                    Question: Question,
                    Answer: Answer,
                })
            }).then(res => res.json())
                .then((res) => {
                    if (res.isSuccess === false) {
                        this.setState({
                            isErrorMsg: true, ishelpform: false,
                        })
                        setTimeout(() => {
                            this.setState({
                                isErrorMsg: false, ishelpform: true,
                            })
                        }, 5000);
                    }
                    else {
                        this.setState({ Question: '', Answer: '', })

                    }
                });
        }
    }
    fetchnewQuestions = () => {
        fetch(`${process.env.REACT_APP_API}Admin/fetchFAQ`).then(res => res.json())
            .then((res) => {
                if (res.isClass === false) {
                    console.log(res.message)
                    this.setState({ FAQcontentshow: false, })
                }
                else {
                    console.log('result-->', res.result)
                    this.setState({ FAQcontentshow: true, helpcontent: res.result })
                }
            });
    }
    modifyQuestion = () => {
        const { Question, Answer, questionId } = this.state;

        console.log(questionId)
        console.log(Question)
        console.log(Answer)
        fetch(`${process.env.REACT_APP_API}Admin/modifyFAQ`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                Question: Question,
                Answer: Answer,
                questionId: questionId
            })
        }).then(res => res.json())
            .then((res) => {
                console.log('Modified', res.result)
                if (res.isSuccess === true) {
                    confirmAlert({
                        title: 'Success',
                        message: 'Question has been Modified',
                        buttons: [

                            {
                                label: 'OK',
                                onClick: () => this.fetchnewQuestions()

                            }
                        ]
                    })
                    this.setState({ Question: '', Answer: '' })
                    this.toggle()
                }
            });
    }
    deletequestion(questionId) {
        console.log('QuestionId', questionId)
        fetch(`${process.env.REACT_APP_API}Admin/deleteFAQ`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                documentId: questionId,
            })
        }).then(res => res.json())
            .then((res) => {
                console.log('Delete', res.result)
                if (res.isSuccess === true) {
                    confirmAlert({
                        title: 'Success',
                        message: 'Question has been removed',
                        buttons: [

                            {
                                label: 'OK',
                                onClick: () => this.fetchnewQuestions()

                            }
                        ]
                    });
                }
            });
    }

    toggle(question, correctanswer, questionId) {
        console.log(question, correctanswer)
        this.setState({
            modal14: !this.state.modal14,
            Question: question,
            Answer: correctanswer,
            questionId: questionId
        })
    }
    render() {

        return (
            <>
                <HeaderComponent title={'Help Section'} clientname={''} headimg={'%admin%'} logout={'admin'} />
               
                {this.state.isHelpQABtn && <div className='gobackiconhead helpQA' style={{ marginBottom: '20px', marginTop: '20px', display: 'inline-Block', cursor: 'pointer' }} onClick={() => this.setState({ isHelpQABtn: false,FAQcontentshow: false, HelpContentLength : false , ishelpform: true, })}>
                    <MDBIcon style={{ paddingRight: '5px', fontSize: '20px' }} icon="plus" />
                    <span>Add Help Q/A</span>
                </div>}
                {this.state.HelpContentLength && <div>
                        <div className='contentbox' style={{ height: '50vh' }}>
                            <Row noGutters className='classcard-row'>
                                <Col md={{ span: 8, offset: 2 }} xs={12}>
                                    <div className='classcard'>
                                        <div className='text-center'>
                                            <h4 style={{ margin: '0' }}>It seems you haven't added questions or some error.</h4>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>}
                {this.state.FAQcontentshow === true && this.state.helpcontent.length > 0 &&
                    <div style={{ marginTop: '20px' }} >
                        <Row noGutters className='classcard-row' style={{ paddingBottom: '30px' }}>
                            {this.state.helpcontent.length > 0 && this.state.helpcontent.map((item, index) => {
                                return <Col key={item._id} style={{ padding: '5px', }} md={{ span: 10, }} xs={12}>
                                    <div className='Allclasscard' style={{ padding: '8px', cursor: 'default' }}>
                                        <div className='questionDiv'>
                                            <div style={{ cursor: 'pointer', width: '90%' }} onClick={() => this.setState({ showAnswer: !this.state.showAnswer, answerId: item._id })}>
                                                <p>Q : {item.Question}</p>
                                            </div>
                                            <div className='editdiv' style={{ padding: '5px', width: '10%', textAlign: 'right', justifyContent: 'flex-end' }}>
                                                <div onClick={() => this.toggle(item.Question, item.Answer, item._id)}>
                                                    <MDBIcon className='edit' style={{ paddingRight: '5px', cursor: 'pointer', fontSize: '16px', color: '#428bca' }} icon="undo" />
                                                </div>
                                                <div onClick={this.deletequestion.bind(this, item._id)}>
                                                    <MDBIcon style={{ paddingRight: '5px', fontSize: '16px', cursor: 'pointer', color: '#d9534f' }} icon="trash" />
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.showAnswer && this.state.answerId === item._id && <div className='answersDiv' >
                                            <p style={{ border: 'none', borderTop: '1px solid #ccc', paddingTop: '16px', fontSize: '14px' }}>A : {item.Answer}</p>
                                        </div>}
                                    </div>
                                </Col>
                            })}
                        </Row>
                    </div>}

                {this.state.ishelpform && <div className='content' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Row noGutters className='classcard-row'>
                        <Col md={{ span: 8, offset: 2 }} xs={12}>
                            <div className='classcard'>

                                <div className='text-right'>
                                    <div style={{ display: 'inline-block' }} className='text-left'>
                                        <div className='nextBtn' onClick={() => window.location.reload()}><MDBIcon style={{ paddingRight: '5px', fontSize: '18px' }} icon="times" /></div>
                                    </div>
                                </div>
                                <MDBInput label="Question" icon="first-order" validate error="wrong"
                                    success="right" onChange={(e) => { this.setState({ Question: e.target.value }) }} value={this.state.Question} required />

                                <MDBInput label="Answer" icon="adn" validate error="wrong"
                                    success="right" onChange={(e) => { this.setState({ Answer: e.target.value }) }} value={this.state.Answer} required />

                                {this.state.showError && <div className='showerror'>
                                    <p>Please fill all feilds...</p>
                                </div>}
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '20px' }}>

                                    <div className='addMore'>
                                        <div style={{}} onClick={this.addMoreQuestions}>Add More</div>
                                    </div>
                                    <div className='uploadBtn'>
                                        <div onClick={this.uploadFAQ}>Upload</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>}

                {this.state.isErrorMsg && <div className='contentbox' style={{ height: '60vh' }}>
                    <Row noGutters className='classcard-row'>
                        <Col md={{ span: 8, offset: 2 }} xs={12}>
                            <div className='classcard'>
                                <div className='text-center'>
                                    <h4 style={{ margin: '0' }}>Some Error, Try adding questions again.</h4>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>}
                {this.state.showAlert && <div className='contentbox' style={{ height: '60vh' }}>
                    <Row noGutters className='classcard-row'>
                        <Col md={{ span: 8, offset: 2 }} xs={12}>
                            <div className='classcard'>
                                <div className='text-center'>
                                    <h4 style={{ margin: '0' }}>FAQ added successfully.</h4>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>}


                <div className='modifyModal'>
                    <MDBModal isOpen={this.state.modal14} toggle={() => this.toggle()} centered>
                        <MDBModalHeader toggle={() => this.toggle()}>Modify Questions</MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput label="Question" icon="first-order" validate error="wrong"
                                success="right" onChange={(e) => { this.setState({ Question: e.target.value }) }} value={this.state.Question} required />

                            <MDBInput label="Answer" icon="adn" validate error="wrong"
                                success="right" onChange={(e) => { this.setState({ Answer: e.target.value }) }} value={this.state.Answer} required />

                            {this.state.showError && <div className='showerror'>
                                <p>Please fill all feilds...</p>
                            </div>}
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <div style={{ display: 'inline-block', textAlign: 'right' }}>
                                    <div className='nextBtn' onClick={this.modifyQuestion}>Modify<MDBIcon style={{ paddingLeft: '5px' }} icon="arrow-right" /></div>
                                </div>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                </div>

            </>
        );

    }
}

export default HelpSection;
