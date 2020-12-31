import React, { useContext } from 'react';
import { COLORS } from '../colors';
import './Responsive.css'
import '../App.css';
import { useHistory } from 'react-router-dom';
import { FirebaseContext, IFirebaseContext } from '../FirebaseContext';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 


export default function Portfolios() {
    let history = useHistory();
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);


    if (!firebaseContext.firebase.auth().currentUser) {
        history.push("/");
    }



    return (
        <h1 className="MediumText"
            style={{
                color: COLORS.darkText,
            }}>
            Portfolios
        </h1>
    );
    //     <Container
    //         fluid
    //         className="Landing"
    //         style={{
    //             padding: 0,
    //             backgroundColor: COLORS.accent,
    //         }}>
    //         <Row className="responsiveRow">
    //             <Container>
    //                 <Row>
    //                     <h1 className="MediumText"
    //                         style={{
    //                             color: COLORS.darkText,
    //                         }}>
    //                         Portfolios
    //                     </h1>

    //                     <Button className="Button"
    //                         style={{
    //                             color: COLORS.darkText,
    //                             backgroundColor: COLORS.highlight,
    //                             borderColor: COLORS.highlight,

    //                         }}

    //                         as={Link} to="/create-portfolio"
    //                     >
    //                         Create Portfolio
    //                     </Button>
    //                 </Row>
    //             </Container>
    //         </Row>
    //     </Container>
    // );
}