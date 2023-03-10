import React from 'react';

const StatusContainerMobile = ({taskAmount, handleFilterClick, deleteComplete}) => {
  return (
    <div>
        <div className="action-container">
           <p className="meek-p items-left">{taskAmount!=1? taskAmount+ " items left" : "1 item left"}</p> 
           <p className="meek-p hover-effect" onClick={() => deleteComplete()}>Clear Completed</p>
        </div>
        <div className="status-container-mobile">
           <p className="meek-container hover-effect" onClick={()=>handleFilterClick(2)} >All</p>
           <p className="meek-container hover-effect" onClick={()=>handleFilterClick(1)} >Active</p>
           <p className="meek-container hover-effect" onClick={()=>handleFilterClick(0)} >Completed</p>
        </div>     
    </div>
  );
}

export default StatusContainerMobile;
