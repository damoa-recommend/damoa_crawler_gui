import React from 'react';
import Analisys from '../features/analisys/Analisys';
import { RouteComponentProps } from 'react-router-dom'

const AnalisysPage:React.FC<RouteComponentProps> = ({match, history}) => {
  return <Analisys match={match} history={history}/>;
}

export default AnalisysPage