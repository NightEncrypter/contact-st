import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
const Alerts = () => {
	const alertContext = useContext(AlertContext);

	return (
		alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
			<div key={alert.id} className={`alert ${alert.type}`} >
			
				<i className={alert.type==="success"?"far fa-check-circle":"far fa-times-circle"}></i> &nbsp;{alert.msg}
				
			</div>
		))
	);
};
export default Alerts;
