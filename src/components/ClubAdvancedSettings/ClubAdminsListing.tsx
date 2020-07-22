import {Button, Container, Row, Col, Table, Form} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import "../NavBar/NavBar"

library.add(faTrashAlt)

type clubDefinition = {
    title: string
    active: boolean
}

const ClubAdminListing = (club: clubDefinition) => {

    return (
        <tr className={"d-flex"}>
            <td colSpan={3} className={"col-11"}><Link to="/settings/info">{club.title}</Link></td>
            <td className={"col-1 text-center"}><Link to="/manageclubs/advancedsettings"><FontAwesomeIcon icon={faTrashAlt}/></Link></td>
        </tr>             
    )

}

export default ClubAdminListing;