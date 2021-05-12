/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-11 19:25:30
 * @modify date 2021-05-11 21:20:13
 * @desc [description]
 */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import uuid from 'react-uuid';
import TextInput from './TextInput';

function Home() {
    const [patientsList, setPatientsList] = useState([]);

    const [patientDetails, setPatientDetails] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const updateData = () => {
        let list = patientsList.map((patient) => {
            if (patientDetails.id === patient.id) {
                return {
                    ...patientDetails,
                    updatedDate: moment().format('MM-DD-YYYY'),
                };
            }
            return patient;
        });
        updateStorage(list);
    };

    const addData = () => {
        patientDetails.id = uuid();

        let value = moment().format('MM-DD-YYYY');
        if (patientDetails.value) {
            value = moment(patientDetails.value, 'YYYY-MM-DD').format(
                'MM-DD-YYYY'
            );
        }
        patientDetails.createdDate = value;
        patientDetails.updateData = value;
        let list = [...patientsList];
        list.push(patientDetails);
        updateStorage(list);
    };

    const deleteData = (patientData) => {
        let list = patientsList.filter(
            (patient) => patientData.id !== patient.id
        );
        updateStorage(list);
    };

    const updateStorage = (list) => {
        setPatientsList(list);
        let key = moment().format('MM-YYYY');
        localStorage.setItem(key, JSON.stringify(list));
        setPatientDetails({});
    };

    useEffect(() => {
        try {
            let key = moment().format('MM-YYYY');
            let list = localStorage.getItem(key);
            if (list && list.length) setPatientsList(JSON.parse(list));
        } catch (error) {}
    }, []);

    let date = moment().format('YYYY-MM-DD');

    if (patientDetails.createdDate) {
        date = moment(patientDetails.createdDate, 'MM-DD-YYYY').format(
            'YYYY-MM-DD'
        );
    }

    return (
        <div className="App">
            <div className="App-header">
                <div className="list">
                    <h2 className="heading">List</h2>
                    <div className="list-container">
                        {patientsList.length > 0 ? (
                            <>
                                <div className="row header">
                                    <div className="name">Name</div>
                                    <div className="date">
                                        <div>Date </div>
                                        <div className="sub-text">
                                            (MM-DD-YYYY)
                                        </div>
                                    </div>
                                    <div className="scan">Scan</div>
                                    <div className="amount">Amount</div>
                                    <div className="refered">Refered By</div>
                                    <div className="action">Actions</div>
                                </div>
                                {patientsList.map((patient) => {
                                    return (
                                        <div className="row details">
                                            <div className="name">
                                                {patient.name}
                                            </div>
                                            <div className="date">
                                                {patient.createdDate}
                                            </div>
                                            <div className="scan">
                                                {patient.scan}
                                            </div>
                                            <div className="amount">
                                                {patient.amount}
                                            </div>
                                            <div className="refered">
                                                {patient.referedBy}
                                            </div>
                                            <div className="action">
                                                <button
                                                    onClick={() => {
                                                        setPatientDetails(
                                                            patient
                                                        );
                                                        setIsEdit(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onDoubleClick={() => {
                                                        deleteData(patient);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <div className="zero-state">No Data</div>
                        )}
                    </div>
                </div>
                <div className="form">
                    <h2 className="heading">Add Patient</h2>
                    <div className="form-container">
                        <TextInput
                            label="Name"
                            value={patientDetails.name}
                            name="name"
                            onChange={(e) => {
                                let { name, value } = e.target;
                                setPatientDetails({
                                    ...patientDetails,
                                    [name]: value,
                                });
                            }}
                        />
                        <TextInput
                            label="Date"
                            value={date}
                            name="date"
                            onChange={(e) => {
                                let { name, value } = e.target;
                                let _value = moment().format('MM-DD-YYYY');
                                if (value) {
                                    _value = moment(value, 'YYYY-MM-DD').format(
                                        'MM-DD-YYYY'
                                    );
                                }
                                setPatientDetails({
                                    ...patientDetails,
                                    createdDate: _value,
                                });
                            }}
                            type="date"
                        />
                        <TextInput
                            label="Scan"
                            value={patientDetails.scan}
                            name="scan"
                            onChange={(e) => {
                                let { name, value } = e.target;
                                setPatientDetails({
                                    ...patientDetails,
                                    [name]: value,
                                });
                            }}
                        />
                        <TextInput
                            label="Amount"
                            value={patientDetails.amount}
                            name="amount"
                            onChange={(e) => {
                                let { name, value } = e.target;
                                setPatientDetails({
                                    ...patientDetails,
                                    [name]: value,
                                });
                            }}
                        />
                        <TextInput
                            label="Refered By"
                            value={patientDetails.referedBy}
                            name="referedBy"
                            onChange={(e) => {
                                let { name, value } = e.target;
                                setPatientDetails({
                                    ...patientDetails,
                                    [name]: value,
                                });
                            }}
                        />
                        <br />
                        {isEdit ? (
                            <button
                                onClick={() => {
                                    setIsEdit(false);
                                    updateData();
                                }}
                            >
                                Update
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    addData();
                                }}
                            >
                                Add
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setPatientDetails({});
                                setIsEdit(false);
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
