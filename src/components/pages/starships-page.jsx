import React from "react";
import { StarshipList} from '../sw-components';
import { withRouter} from 'react-router-dom';


const StarShipPage = ({history}) => {
    return (
        <StarshipList
        onItemSelected={(itemID) => history.push(`${itemID}`)} />
    );
};

export default withRouter(StarShipPage);
