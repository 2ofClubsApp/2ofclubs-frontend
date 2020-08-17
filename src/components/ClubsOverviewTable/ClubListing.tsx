import {Button, Container, Row, Col, Table, Form} from "react-bootstrap";
import React from "react";
import "./ClubsOverview.css";
import {Link} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCoffee } from '@fortawesome/free-solid-svg-icons'
import "../NavBar/NavBar"
import { RootState } from "../../store";
import { connect } from "react-redux";

library.add(faCog, faCoffee)

type clubDefinition = {
    title: string
    overviewType: boolean
    active: boolean
    id: number
}



const ClubListing = (club: clubDefinition) => {

    if (club.overviewType) {
        return (
            <tr className={"d-flex"}>
            <td colSpan={3} className={"col-11"} key={club.id}><Link to={`/settings/info/${club.id}`}>{club.title}</Link></td>

            <td className={"col-1 text-center"}><Link to="/manageclubs/advancedsettings"><FontAwesomeIcon icon={faCog}/></Link></td>

            </tr>           
        )
    }
    else {
        if (club.active) {
            return (
                <tr className={"d-flex"}>
                    <td colSpan={3} className={"col-11"}><Link to="/settings/info">{club.title}</Link></td>
                    <td className={"col-1 text-center"}><Form.Check type={"switch"} id={club.title} label={""} defaultChecked={true} /></td>
                </tr>             
            )
        }
        else {
            return (
                <tr className={"d-flex"}>
                    <td colSpan={3} className={"col-11"}><Link to="/admin/application">{club.title}</Link></td>
                    <td className={"col-1 text-center"}><Form.Check type={"switch"} id={club.title} label={""}/></td>
                </tr>             
            )
        }
    }
}

const mapStateToProps = (state: RootState) => {
    const token = state.system.token;
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(ClubListing);