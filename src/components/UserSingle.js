import React, { useState } from "react";
import _ from 'lodash';

const UserSingle = ({u}) => {
  let cn = '';

  if (_.result(_.find(u.attributes, { 'name': 'user.ParentalRatingId' }), 'value') < 50 ) {
    cn='table-danger';
  }
  return (
    <tr key={u.id} className={cn}>
      <td>{u.username}</td>
      <td>{u.displayName}</td>
      <td>{u.status}</td>
    </tr>
  );
};

export default UserSingle;