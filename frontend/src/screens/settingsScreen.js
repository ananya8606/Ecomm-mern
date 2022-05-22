import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_SETTINGS_RESET } from "../actions/types";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../components/formContainer";
import { setLang } from "../Utils/setlang";
import Message from "../components/Message";
import { countrySettings, currencySettings } from "../Utils/settings";
import { changeSettings } from "../actions/settings";
import { setting } from "../Utils/translateLibrary/settings";

const SettingsScreen = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings);
    const { success } = settings;
    const [language, setLanguage] = useState(settings.language);
    const [currency, setCurrency] = useState(settings.currency);
    const [country, setCountry] = useState(settings.country);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                // after update, reset the success state
                dispatch({ type: UPDATE_SETTINGS_RESET });
            }, 1500);
        }
    }, [dispatch, success]);

    const submitHandler = (e) => {
        dispatch(changeSettings(language, country, currency));
    };

    return (
        <>
            {success && (
                <Message variant="success">
                    {"Successfully updated settings"}
                </Message>
            )}
            <div className='form-outer justify-content-center'>
            <div className='form-outermost'>
            <h1>{setting.title[language]}</h1>
            <Form onSubmit={submitHandler} autoComplete="on">
            <Form.Group controlId={"radio"}>
            <Form.Label>{setting.selLan[language]}: </Form.Label>
            <Row>
            {setLang.map((l) => {
             return (
            <Col key={`${l.lang}-radio`}>
            <Form.Check
            id={l.lang}
            type="radio"
            label={l.label}
            value={l.lang}
            checked={l.lang === language}
            onChange={(e) =>
            setLanguage(e.target.value)
            }
            />
            </Col>
            );
            })}
            </Row>
            </Form.Group>
            <Form.Group controlId={"radio"}>
            <Form.Label>{setting.selCurr[language]}: </Form.Label>
            <Row>
            {currencySettings.map((c) => {
            return (
            <Col key={`${c.label}-radio`}>
            <Form.Check
            id={c.label}
            type="radio"
            label={c.label}
            value={c.value}
            checked={c.value === currency}
            onChange={(e) =>
            setCurrency(e.target.value)
            }
            />
            </Col>
            );
            })}
            </Row>
            </Form.Group>
            <Form.Group controlId={"radio"}>
            <Form.Label>{setting.region[language]}: </Form.Label>
            <Row>
            {countrySettings.map((c) => {
            return (
            <Col key={`${c.label}-radio`}>
            <Form.Check
            id={c.label}
            type="radio"
            label={c.label}
            value={c.value}
            checked={c.value === country}
            onChange={(e) =>
                setCountry(e.target.value)
            }
            />
            </Col>
            );
            })}
            </Row>
            </Form.Group>
            <div>
            <Button type="submit" variant="primary">
            {setting.change[language]}
            </Button>
            </div>
            </Form>
            </div>
            </div>
        </>
    );
};

export default SettingsScreen;
